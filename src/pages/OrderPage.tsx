import { StatusLabel } from "@components/ui";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetchOrder } from "@hooks/.";
import { AppLayout } from "@layouts/AppLayout";
import { formatMoney } from "@utils/formatMoney";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";

export const OrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: orderData, isPending } = useFetchOrder(
    id || "",
    `fetchOrder-${id}`
  );
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/app/orders/${id}/edit`);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold flex">
            Orden {orderData?.order_number ? `#${orderData.order_number}` : ""}{" "}
            {isPending && (
              <div role="status" className="animate-pulse">
                <div className="mx-4 h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-[200px]" />
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </h1>
          <div>
            <button
              onClick={handleEdit}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Editar
            </button>
          </div>
        </div>
        {isPending && (
          <>
            <div role="status" className="animate-pulse">
              <div className="h-[200px] bg-gray-200 rounded-sm dark:bg-gray-700 w-full mb-5" />
              <span className="sr-only">Loading...</span>
            </div>
            <div role="status" className="animate-pulse">
              <div className="h-[200px] bg-gray-200 rounded-sm dark:bg-gray-700 w-full mb-5" />
              <span className="sr-only">Loading...</span>
            </div>
          </>
        )}
        {orderData && (
          <>
            <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-sky-800 mb-4">
                Información de la Orden
              </h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Número de orden:</span>{" "}
                  {orderData.order_number}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Total:</span> $
                  {formatMoney(orderData.total)}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Estado:</span>{" "}
                  <StatusLabel status={orderData.status} />
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Creada:</span>{" "}
                  {format(
                    new Date(orderData.created_at),
                    "dd/MM/yyyy HH:mm:ss"
                  )}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Actualizada:</span>{" "}
                  {format(
                    new Date(orderData.updated_at),
                    "dd/MM/yyyy HH:mm:ss"
                  )}
                </p>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-sky-800 mb-4">
                Información del Cliente
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium text-gray-700">Nombre:</span>{" "}
                  {orderData.client.full_name}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Correo:</span>{" "}
                  {orderData.client.email}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Teléfono:</span>{" "}
                  {orderData.client.phone}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Dirección:</span>{" "}
                  {orderData.client.address}
                </p>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-sky-800 mb-4">
                Productos en la Orden
              </h3>
              {orderData.products.length === 0 && <p>No hay productos</p>}
              {orderData.products.map((product) => (
                <div
                  key={product.id}
                  className="border-b border-gray-200 pb-4 mb-4 last:border-b-0"
                >
                  <h4 className="text-lg font-semibold text-gray-800 capitalize">
                    {product.product.name}
                  </h4>
                  <p className="text-gray-600 mb-2">
                    {product.product.description}
                  </p>
                  <div className="space-y-1 text-gray-700">
                    <p>
                      <span className="font-medium">Precio:</span> $
                      {formatMoney(product.product.price)}
                    </p>
                    <p>
                      <span className="font-medium">Cantidad:</span>{" "}
                      {product.quantity}
                    </p>
                    <p>
                      <span className="font-medium">Subtotal:</span> $
                      {formatMoney(product.subtotal)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};
