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
        // Todo: validate newMeetup shape
        return [
          { id: Math.random(), isFavorite: false, ...newMeetup },
          ...meetups,
        ];
      });
    },
    findById: (id) => {
      let meetup = {};
      const unsubscribe = store.subscribe((meetups) => {
        const match = meetups.find((m) => m.id === id);
        meetup = match;
      });
      unsubscribe();
      return meetup;
    },
    findByIdAndUpdate: (id, updates = {}) => {
      store.update((meetups) => {
        return meetups.map((meetup) => {
          if (meetup.id !== id) return meetup;
          // Todo: validate updatedMeetup shape
          return { ...meetup, ...updates };
        });
      });
    },
    findByIdAndDelete: (id) => {
      store.update((meetups) => {
        return meetups.filter((meetup) => {
          if (meetup.id !== id) return meetup;
        });
      });
    },
    findByIdAndToggleFavorite: (id) => {
      // This is a different approach than the course.
      // This is much better than the previous verbose implementation (cleaner and fewer loops)
      store.update((meetups) => {
        return meetups.map((meetup) => {
          if (meetup.id !== id) return meetup;
          // Todo: validate meetup shape
          meetup.isFavorite = !meetup.isFavorite;
          return meetup;
        });
      });
    },
  };
}

export const meetupsStore = createMeetups();
