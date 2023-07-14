import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  token:null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser : (state, action) => {
      const data= action.payload
      state.user = data.user
      state.token = data.token


      const localUser = JSON.stringify(data.user)
      localStorage.setItem('user', localUser)
      localStorage.setItem('token', data.token)

    },
    removeUser: () => {
      localStorage.setItem('user', null)
      localStorage.setItem('token', null)
    }
  }
})


export const {addUser, removeUser} = userSlice.actions

export default userSlice.reducer