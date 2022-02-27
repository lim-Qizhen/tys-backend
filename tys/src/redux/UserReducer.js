import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user", //store name
  initialState: {
    f_name: "",
    l_name: "",
    username: "",
    accessToken: "",
    email: "",
    phone: null,
    school: "",
    subjects: [],
    exams: [],
    paper: "",
    consultations: [],
    is_tutor: false,
  },
  reducers: {
    setFirstName: (state, action) => {
      state.f_name = action.payload;
    },
    setLastName: (state, action) => {
      state.l_name = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setSchool: (state, action) => {
      state.school = action.payload;
    },
    setSubjects: (state, action) => {
      state.subjects = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setPapers: (state, action) => {
      state.paper = action.payload;
    },
    setTutor: (state, action) => {
      state.f_name = action.payload;
    },
    setConsultations: (state, action) => {
      state.consultations = action.payload;
    },
    loginSuccess: (state, action) => {
      state.f_name = action.payload.first_name;
      state.l_name = action.payload.last_name;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.phone = action.payload.contact;
      state.school = action.payload.school;
      state.subjects = action.payload.subject;
      state.exams = action.payload.exams;
      state.username = action.payload.username;
      //state is like the actual thing, action.payload is like what you put in
    },
    // registerSuccess: (state, action) => {
    //   state.name = action.payload.name;
    //   state.address = action.payload.address;
    //   state.country = action.payload.country;
    //   state.postal = action.payload.postal;
    //   state.email = action.payload.email;
    //   state.phone = action.payload.phone;
    //   state.id = action.payload._id;
    // },
    logout: (state) => {
      state.f_name = "";
      state.l_name = "";
      state.email = "";
      state.accessToken = "";
      state.username = "";
      state.phone = "";
      state.school = "";
      state.subjects = "";
      state.exams = "";
      state.paper = "";
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
