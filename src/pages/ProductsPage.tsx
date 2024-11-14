import { format } from "date-fns";
import { SkeletonTable, Table } from "@components/ui";
import { useFetchProducts } from "@hooks/.";
import { AppLayout } from "@layouts/AppLayout";
import { formatMoney } from "@utils/formatMoney";

export const ProductsPage = () => {
  const { data: productsData, isPending } = useFetchProducts();

  const formattedProducts = productsData?.map((product) => ({
    name: (
      <p className="text-gray-800 font-semibold capitalize">{product.name}</p>
    ),
    description: product.description,
    price: <p className="text-gray-500">${formatMoney(product.price)}</p>,
    created_at: format(new Date(product.created_at), "dd/MM/yyyy HH:mm:ss"),
    updated_at: format(new Date(product.updated_at), "dd/MM/yyyy HH:mm:ss"),
  }));

  const columns = [
    { key: "name", label: "Nombre" },
    { key: "description", label: "Descripción" },
    { key: "price", label: "Precio" },
    { key: "created_at", label: "Creado" },
    { key: "updated_at", label: "Actualizado" },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold">Productos</h1>
            <p className="text-sm text-gray-500">
              Listado de todos los productos
            </p>
          </div>
          <div></div>
        </div>
        {isPending ? (
          <SkeletonTable columns={columns} />
        ) : (
          <Table data={formattedProducts || []} columns={columns} />
        )}
      </div>
    </AppLayout>
  );
};
