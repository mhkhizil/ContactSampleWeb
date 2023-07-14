// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const authApi = createApi({
//   reducerPath: "pokemonApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://contact-app.mmsdev.site/api/v1",
//   }),
//   tagTypes: ["auth"],
//   endpoints: (builder) => ({
//     register: builder.mutation({
//       query: (data) => ({
//         url: `/register`,
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ['auth']

//     }),

//     login: builder.mutation({
//       query: (data) => ({
//         url: `/login`,
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ['auth']

//     }),
//     logout: builder.mutation({
//         query: (token) => ({
//           url: '/user-logout',
//           method: "POST",
//           headers:{authorization : `Bearer ${token}`}
//         }),
//         invalidatesTags: ['auth']
//       }),
      
//   }),
// });

// export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = authApi;

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../../firebase.config";
// import { auth } from "../../firebase.Config";


export const registerApi =async (email, password) => {
    try{
        const response = createUserWithEmailAndPassword(auth, email, password)
        
        return response
    }
    catch(error) {
        console.log(error)
        
    }



    

    

   
}

export const loginApi =async (email, password) => {
    try{
        const response = signInWithEmailAndPassword(auth, email, password)
        return response
    }
    catch(error){
        console.log(error)
    }

 
}

export const logOutApi = () => {
  try{
    signOut(auth)
    console.log('success')
  }
  catch(err){
    return err

  }
}
