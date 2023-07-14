import { configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
// import { setupListeners } from '@reduxjs/toolkit/query'

// import { authApi } from '../Apis/authApi'
import userSlice from '../slice/userSlice';
import { contactApi } from '../Apis/ContactApi';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    // [authApi.reducerPath]: authApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    user: userSlice
   
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactApi.middleware),
    // getDefaultMiddleware().concat(authApi.middleware,contactApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)