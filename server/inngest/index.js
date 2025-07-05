import { Inngest } from "inngest";
import User from "../models/User.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickticks" });

//Inngest Function to save user data to database
const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-creation",
  },
  { event: "clerk.user.created" },
  async ({ event }) => {
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_addresses,
      name: first_name + " " + last_name,
      image: image_url,
    };
    console.log("User created", userData);
    await User.create(userData);
  }
);
//Inngest Function to delete user from database
const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-with-clerk",
  },
  { event: "clerk.user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    console.log("User deleted", id);
    await User.findByIdAndDelete(id);
  }
);

//Inngest Function to update user  in database
//Inngest Function to delete user from database
const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
  },
  { event: "clerk.user.updated" },
  async ({ event }) => {
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_addresses,
      name: first_name + " " + last_name,
      image: image_url,
    };
    await User.findByIdAndUpdate(id, userData);
  }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
