import { SkeletonTable, Table } from "@components/ui";
import { useFetchClients } from "@hooks/.";
import { AppLayout } from "@layouts/AppLayout";
import { format } from "date-fns";

export const ClientsPage = () => {
  const { data: clientsData, isPending } = useFetchClients();

  const formattedClients = clientsData?.map((client) => ({
    full_name: (
      <p className="text-gray-800 font-semibold capitalize">
        {client.full_name}
      </p>
    ),
    email: client.email,
    phone: client.phone,
    address: client.address,
    created_at: format(new Date(client.created_at), "dd/MM/yyyy HH:mm:ss"),
    updated_at: format(new Date(client.updated_at), "dd/MM/yyyy HH:mm:ss"),
  }));

  const columns = [
    { key: "full_name", label: "Nombre" },
    { key: "email", label: "Correo" },
    { key: "phone", label: "Teléfono" },
    { key: "address", label: "Dirección" },
    { key: "created_at", label: "Creado" },
    { key: "updated_at", label: "Actualizado" },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold">Clientes</h1>
            <p className="text-sm text-gray-500">
              Listado de todos los clientes
            </p>
          </div>
          <div></div>
        </div>
        {isPending ? (
          <SkeletonTable columns={columns} />
        ) : (
          <Table data={formattedClients || []} columns={columns} />
        )}
      </div>
    </AppLayout>
  );
};
