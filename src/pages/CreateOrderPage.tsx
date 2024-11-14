import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { clearOrder } from "@redux/slices/orderSlice";
import { AppLayout } from "@layouts/AppLayout";
import { SaveOrderForm, SaveOrderSummary } from "@components/orders";
import { useForm } from "react-hook-form";
import { useCreateOrder } from "@hooks/useCreateOrder";
import { IStatus } from "@hooks/useFetchOrders";
import { useNavigate } from "react-router-dom";

interface Inputs {
  status: IStatus;
  client_id: string;
  products: string[];
}

export const CreateOrderPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { createOrder } = useCreateOrder(() => {
    navigate("/app/orders");
  });
  const { token } = useAppSelector((state) => state.auth);
  const { miniOrderItems } = useAppSelector((state) => state.order);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    return () => {
      dispatch(clearOrder());
    };
  }, [dispatch]);

  const onSubmit = (data: Inputs) => {
    createOrder({
      client_id: data.client_id,
      status: data.status,
      items: miniOrderItems,
      token: token!,
    });
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold">Crear orden</h1>
        <form
          className="mt-4 grid md:grid-cols-2 grid-cols-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <SaveOrderForm register={register} errors={errors} />
          <SaveOrderSummary labelButton="Crear orden" />
        </form>
      </div>
    </AppLayout>
  );
};
