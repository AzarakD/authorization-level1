import { Account, Client } from "appwrite";

export const client = new Client();
export const account = new Account(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
