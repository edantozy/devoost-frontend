import { Routes, Route, Navigate } from "react-router-dom";
import {
  ClientsPage,
  CreateOrderPage,
  EditOrderPage,
  OrderPage,
  OrdersPage,
  ProductsPage,
} from "@pages/.";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="orders" replace />} />
      <Route path="/orders/:id" element={<OrderPage />} />
      <Route path="/orders/:id/edit" element={<EditOrderPage />} />
      <Route path="/orders/create" element={<CreateOrderPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/clients" element={<ClientsPage />} />
    </Routes>
  );
}
