import { format } from "date-fns";
import { SkeletonTable, StatusLabel, Table } from "@components/ui";
import { useFetchOrders } from "@hooks/.";
import { AppLayout } from "@layouts/AppLayout";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "flowbite-react";

export const OrdersPage = () => {
  const { data: ordersData, isPending, params, setParams } = useFetchOrders();
  const navigate = useNavigate();

  const formattedOrders = ordersData?.data?.map((order) => ({
    order_number: (
      <Link to={`/app/orders/${order.id}`}>
        <p className="text-blue-500 underline">{order.order_number}</p>
      </Link>
    ),
    status: <StatusLabel status={order.status} />,
    client: order.client.full_name,
    created_at: format(new Date(order.created_at), "dd/MM/yyyy HH:mm:ss"),
    updated_at: format(new Date(order.updated_at), "dd/MM/yyyy HH:mm:ss"),
    actions: (
      <div className="flex space-x-2">
        <Link to={`/app/orders/${order.id}`} className="text-slate-500 px-2">
          <FontAwesomeIcon icon={faEye} />
        </Link>
        <Link
          to={`/app/orders/${order.id}/edit`}
          className="text-slate-500 px-2"
        >
          <FontAwesomeIcon icon={faEdit} />
        </Link>
      </div>
    ),
  }));

  const columns = [
    { key: "order_number", label: "Número de orden" },
    { key: "client", label: "Cliente" },
    { key: "status", label: "Estado" },
    { key: "created_at", label: "Creado" },
    { key: "updated_at", label: "Actualizado" },
    { key: "actions", label: "Acciones" },
  ];

  const handleCreateOrder = () => {
    navigate("/app/orders/create");
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold">Órdenes</h1>
            <p className="text-sm text-gray-500">
              Listado de todas las órdenes
            </p>
          </div>
          <div>
            <button
              onClick={handleCreateOrder}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Crear orden
            </button>
          </div>
        </div>
        {isPending ? (
          <SkeletonTable columns={columns} />
        ) : (
          <>
            <Table data={formattedOrders || []} columns={columns} />
            <div className="mt-4 flex justify-center">
              <Pagination
                currentPage={params.page || 1}
                totalPages={ordersData?.meta.total_pages || 1}
                onPageChange={(page) => setParams({ ...params, page })}
              />
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};
