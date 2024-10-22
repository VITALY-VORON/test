import { TCartItem } from "@/utils/cart.type";

export function filterItems(cartItems: TCartItem[], query: string) {
  return cartItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );
}
