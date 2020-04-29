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

export const cartStore = writable([...initialValue], () => {
  console.log("new cart item");
  return () => console.log("no more cart items");
});
