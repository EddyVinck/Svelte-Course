import { writable } from "svelte/store";

function createStore() {
  const store = writable([]);
  return {
    subscribe: store.subscribe,
    setHobbies: (hobbies) => {
      store.set(hobbies);
    },
    addHobby: (hobby) => {
      store.update((hobbies) => {
        return hobbies.concat(hobby);
      });
    },
  };
}

export const hobbyStore = createStore();
