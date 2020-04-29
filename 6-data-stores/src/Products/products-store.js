import { writable } from "svelte/store";

const initialValue = [
  {
    id: "p1",
    title: "A Book",
    price: 9.99,
    description: "A great book!",
  },
  {
    id: "p2",
    title: "A Carpet",
    price: 99.99,
    description: "Red and green.",
  },
];

export const productsStore = writable([...initialValue], () => {
  console.log("new cart item");
  return () => console.log("no more cart items");
});
