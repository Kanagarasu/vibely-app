// import { Inngest } from "inngest";
// import User from "../models/User.js";

// //create a client to send and receive events
// export const inngest = new Inngest({ id: "vibely-app" ,eventKey: process.env.INNGEST_EVENT_KEY,});


// // inngest function to save your user data to a database
// const syncUserCreation = inngest.createFunction(
//   { id: "sync-user-created" },
//   { event: "user.created" },
//   async ({ event }) => {
//     try {
//       const { id, first_name, last_name, email_addresses, image_url } =
//         event.data;

//       const email = email_addresses?.[0]?.email_address;
//       if (!email) {
//         console.log("No email found, skipping user creation");
//         return;
//       }

//       let username = email.split("@")[0];

//       // ensure unique username
//       while (await User.findOne({ username })) {
//         username = `${username}${Math.floor(Math.random() * 10000)}`;
//       }

//       await User.create({
//         _id: id,
//         email,
//         full_name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
//         profile_picture: image_url,
//         username,
//       });
//       console.log(User.find({email}));

//       console.log("User created:", id);
//     } catch (error) {
//       console.error("syncUserCreation error:", error);
//       throw error;
//     }
//   }
// );

// /* ===============================
//    USER UPDATED
// ================================ */
// const syncUserUpdation = inngest.createFunction(
//   { id: "sync-user-updated" },
//   { event: "user.updated" },
//   async ({ event }) => {
//     try {
//       const { id, first_name, last_name, email_addresses, image_url } =
//         event.data;

//       const email = email_addresses?.[0]?.email_address;

//       await User.findByIdAndUpdate(
//         id,
//         {
//           email,
//           full_name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
//           profile_picture: image_url,
//         },
//         { new: true }
//       );

//       console.log("User updated:", id);
//     } catch (error) {
//       console.error("syncUserUpdation error:", error);
//       throw error;
//     }
//   }
// );

// /* ===============================
//    USER DELETED
// ================================ */
// const syncUserDeletion = inngest.createFunction(
//   { id: "sync-user-deleted" },
//   { event: "user.deleted" },
//   async ({ event }) => {
//     try {
//       const { id } = event.data;
//       await User.findByIdAndDelete(id);
//       console.log("User deleted:", id);
//     } catch (error) {
//       console.error("syncUserDeletion error:", error);
//       throw error;
//     }
//   }
// );

// export const functions = [
//   syncUserCreation,
//   syncUserUpdation,
//   syncUserDeletion,
// ];


import { Inngest } from "inngest";
import User from "../models/User.js";

//create a client to send and receive events
export const inngest = new Inngest({ id: "vibely-app" });


// inngest function to save your user data to a database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    // check availability of username
    let username=email_addresses[0].email_address.split('@')[0];

    const user=await User.findOne({username});

    if(user){
      username = username +Math.floor(Math.random()*10000);
    }

    const userData ={
      _id:id,
      email:email_addresses[0].email_address,
      full_name:first_name+" "+last_name,
      profile_picture:image_url,
      username
    }
    await User.create(userData);

  }
);

// inngest function to update user data in database
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const updatedUserData={
      email:email_addresses[0].email_address,
      full_name:first_name+' '+last_name,
      profile_picture:image_url
    }

    await User.findByIdAndUpdate(id,updatedUserData);

  }
);

// inngest function to update user data in database
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    await User.findByIdAndDelete(id);

  }
);


export const functions = [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
];


