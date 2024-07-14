import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types-db";
import { toast } from "react-hot-toast";

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  calculateTotalWithVAT: () => number;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          const updatedItems = currentItems.map((item) =>
            item.id === data.id
              ? { ...item, qty: item.qty + data.qty }
              : item
          );
          set({ items: updatedItems });
          toast.success("Item quantity updated in cart");
        } else {
          set({ items: [...get().items, data] });
          toast.success("Item added to cart");
        }
      },

      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        toast.success("Item removed from cart");
      },

      removeAll: () => set({ items: [] }),

      updateItemQuantity: (id: string, qty: number) => {
        const updatedItems = get().items.map((item) =>
          item.id === id ? { ...item, qty: qty } : item
        );
        set({ items: updatedItems });
      },

      calculateTotalWithVAT: () => {
        const totalPrice = get().items.reduce((total, item) => {
          return total + Number(item.price * item.qty);
        }, 0);
        const vatAmount = totalPrice * 0.07;
        return totalPrice + vatAmount;
      },
    }),
    { name: "cart-storage", storage: createJSONStorage(() => localStorage) }
  )
);

export default useCart;
