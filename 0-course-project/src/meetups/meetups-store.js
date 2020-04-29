import { writable } from "svelte/store";
import { exampleMeetups } from "../data/example-meetups.js";

function createMeetups() {
  const store = writable([...exampleMeetups], () => {
    return () => console.log("deleted meetup store");
  });
  return {
    subscribe: store.subscribe,
    createOne: (newMeetup) => {
      store.update((meetups) => {
        return [
          { id: Math.random(), isFavorite: false, ...newMeetup },
          ...meetups,
        ];
      });
    },
    findByIdAndToggleFavorite: (id) => {
      // This is a different approach than the course.
      // This is much better than the previous verbose implementation (cleaner and fewer loops)
      store.update((meetups) => {
        return meetups.map((meetup) => {
          if (meetup.id !== id) return meetup;
          meetup.isFavorite = !meetup.isFavorite;
          return meetup;
        });
      });
    },
  };
}

export const meetupsStore = createMeetups();
