import { createSlice } from "@reduxjs/toolkit";

interface IMiniOrderItem {
  product_name: string;
  product_id: number;
  product_price: number;
  quantity: number;
}

export interface OrderState {
  miniOrderItems: IMiniOrderItem[];
  total: number;
}

const initialState: OrderState = {
  miniOrderItems: [],
  total: 0,
};

function recalculateTotal(state: OrderState) {
  state.total = state.miniOrderItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );
}

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setItems: (state, action: { payload: IMiniOrderItem[] }) => {
      state.miniOrderItems = action.payload;
      recalculateTotal(state);
    },
    addItem: (
      state,
      action: {
        payload: IMiniOrderItem;
      }
    ) => {
      const index = state.miniOrderItems.findIndex(
        (item) => item.product_id === action.payload.product_id
      );
      if (index !== -1) {
        state.miniOrderItems[index].quantity += action.payload.quantity;
      } else {
        state.miniOrderItems.push(action.payload);
      }
      recalculateTotal(state);
    },
    removeItem: (state, action: { payload: number }) => {
      state.miniOrderItems = state.miniOrderItems.filter(
        (item) => item.product_id !== action.payload
      );
      recalculateTotal(state);
    },
    clearOrder: (state) => {
      state.miniOrderItems = [];
      state.total = 0;
    },
  },
});

export const { setItems, addItem, removeItem, clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
