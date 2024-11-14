import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { clearOrder, setItems } from "@redux/slices/orderSlice";
import { AppLayout } from "@layouts/AppLayout";
import { SaveOrderForm, SaveOrderSummary } from "@components/orders";
import { useForm } from "react-hook-form";
import { IStatus } from "@hooks/useFetchOrders";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchOrder } from "@hooks/useFetchOrder";
import { useUpdateOrder } from "@hooks/useUpdateOrder";
import { useQueryClient } from "@tanstack/react-query";

interface Inputs {
  status: IStatus;
  client_id: string;
  products: string[];
}

export const EditOrderPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.auth);
  const { miniOrderItems } = useAppSelector((state) => state.order);
  const { id } = useParams<{ id: string }>();
  const { data: orderData } = useFetchOrder(id || "", `fetchOrder-${id}`);
  const queryClient = useQueryClient();
  const { updateOrder } = useUpdateOrder(async () => {
    await queryClient.invalidateQueries({
      queryKey: [`fetchOrder-${id}`],
    });
    navigate(`/app/orders/${id}`);
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (orderData) {
      setValue("status", orderData.status);
      setValue("client_id", orderData.client.id.toString());
      dispatch(
        setItems(
          orderData.products.map((item) => {
            return {
              product_name: item.product.name,
              product_id: item.product.id,
              product_price: item.product.price,
              quantity: item.quantity,
            };
          })
        )
      );
    }
    return () => {
      dispatch(clearOrder());
    };
  }, [dispatch, orderData, setValue]);

  const onSubmit = (data: Inputs) => {
    updateOrder({
      order_id: id || "",
      client_id: data.client_id,
      status: data.status,
      items: miniOrderItems,
      token: token!,
    });
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold">
          Editar orden #{orderData?.order_number}
        </h1>
        <form
          className="mt-4 grid md:grid-cols-2 grid-cols-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <SaveOrderForm register={register} errors={errors} />
          <SaveOrderSummary labelButton="Guardar cambios" />
        </form>
      </div>
    </AppLayout>
  );
};
