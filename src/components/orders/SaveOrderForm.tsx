import { FieldErrors, UseFormRegister } from "react-hook-form";
import clsx from "clsx";
import { IStatus, useFetchClients } from "@hooks/.";
import { ProductsCatalog } from "./ProductsCatalog";
import { FC } from "react";

interface Inputs {
  status: IStatus;
  client_id: string;
  products: string[];
}

interface ICreateOrderFormProps {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
}

export const SaveOrderForm: FC<ICreateOrderFormProps> = ({
  register,
  errors,
}) => {
  const { data: clientsData, isPending: isPendingClients } = useFetchClients();

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="space-y-2">
          <label
            htmlFor="client_id"
            className="text-sm font-medium text-gray-700"
          >
            Cliente
          </label>
          <select
            disabled={isPendingClients}
            {...register("client_id", { required: "El cliente es requerido" })}
            id="client_id"
            className={clsx(
              "block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
              {
                "border-red-300 bg-red-50": errors.client_id,
              }
            )}
          >
            <option value="">Selecciona un cliente</option>
            {clientsData?.map((client) => (
              <option key={client.id} value={client.id}>
                {client.full_name}
              </option>
            ))}
          </select>
          {errors.client_id && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors.client_id.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium text-gray-700">
            Estado
          </label>
          <select
            {...register("status", { required: "El estado es requerido" })}
            id="status"
            className={clsx(
              "block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
              {
                "border-red-300 bg-red-50": errors.status,
              }
            )}
          >
            <option value="">Selecciona un estado</option>
            <option value="pending">Pendiente</option>
            <option value="completed">Completada</option>
            <option value="cancelled">Cancelada</option>
          </select>
          {errors.status && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors.status.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="products"
            className="text-sm font-medium text-gray-700"
          >
            Agregar productos
          </label>
          <ProductsCatalog />
        </div>
      </div>
    </div>
  );
};
