<script context="module">
  import { firebase } from "../../config/firebase.js";
  export async function preload(page) {
    try {
      console.dir(page);
      const { id } = page.params;
      const res = await this.fetch(`${firebase}/meetups/${id}.json`);
      if (!res || !res.ok) throw new Error("meetup not found");
      const data = await res.json();
      return { meetup: { ...data, id } };
    } catch (error) {
      this.error(404, "No such meetup found.");
    }
  }
</script>

<script>
  import Button from "../../components/ui/Button.svelte";
  import { meetupsStore as meetups } from "../../components/meetups/meetups-store.js";
  export let meetup = {};

  // meetup = meetups.findById(id);
  const {
    title = "",
    subtitle = "",
    description = "",
    address = "",
    contactEmail = ""
  } = meetup;
</script>

<style>
  section {
    margin-top: 4rem;
  }
  .image {
    width: 100%;
    height: 25rem;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .image {
    background: #e7e7e7;
  }
  .content {
    text-align: center;
    width: 80%;
    margin: auto;
  }
  h1 {
    font-size: 2rem;
    font-family: "Roboto Slab", sans-serif;
    margin: 0.5rem 0;
  }
  h2 {
    font-size: 1.25rem;
    color: #6b6b6b;
  }
  p {
    font-size: 1.5rem;
  }
</style>

<section>
  <div class="image">
    <img src={meetup.imageUrl} alt={meetup.title} />
  </div>
  <div class="content">
    <h1>{title}</h1>
    <h2>{subtitle}</h2>
    <p>{address}</p>
    <p>{description}</p>
    <Button href={`mailto:${contactEmail}`}>Contact</Button>
    <Button href="/" type="button" mode="outline">Close</Button>
  </div>
</section>
