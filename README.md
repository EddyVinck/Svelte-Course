# Svelte course

This is just a demo application. To make it work, add your unprotected firebase database URL to `0-course-project/src/data/firebase.js`.

```js
// 0-course-project/src/data/firebase.js
export const firebase = "https://__your_firebase_url_here__.firebaseio.com";
```

This course application is not complete. It does not have things like authentication. This means that when you favorite a meetup, it is a favorite meetup for everyone connected to the same database. Supporting multiple users and authentication was beyond the scope of the course.
