import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { TCartItem } from "@/utils/cart.type";

export const fetchCartData = createAsyncThunk<TCartItem[]>(
  "cart/fetchCartData",
  async () => {
    const response = await import("./data.json");
    return response.default;
  }
);

interface CartState {
  items: TCartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<TCartItem[]>) => {
      action.payload.forEach((item) => {
        const cartIndex = state.items.findIndex((cart) => cart.id === item.id);
        if (cartIndex !== -1) {
          state.items[cartIndex] = item;
        } else {
          state.items.push(item);
        }
      });
    },
    deleteAllCarts: (state) => {
      state.items = [];
    },
    deleteCartById: (state, action: PayloadAction<TCartItem["id"]>) => {
      state.items = state.items.filter((cart) => cart.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart data";
      });
  },
});

export const { setCart, deleteAllCarts, deleteCartById } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.items;
export const selectLoading = (state: RootState) => state.cart.loading;
export const selectError = (state: RootState) => state.cart.error;

export default cartSlice.reducer;
