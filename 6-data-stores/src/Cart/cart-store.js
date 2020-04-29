import { writable } from "svelte/store";

const initialValue = [
  {
    id: "p3",
    title: "Test 3",
    price: 9.99,
  },
  {
    id: "p4",
    title: "Test 4",
    price: 9.99,
  },
];

function createCart() {
  const store = writable([...initialValue], () => {
    console.log("new cart item");
    return () => console.log("no more cart items");
  });

  return {
    subscribe: store.subscribe,
    createOne: (item) => {
      store.update((items) => {
        if (!items.find((i) => i.id === item.id)) return [...items, item];
        return [...items];
      });
    },
    findByIdAndRemove: (id) => {
      store.update((items) => items.filter((i) => i.id !== id));
    },
  };
}

export const cartStore = createCart();
