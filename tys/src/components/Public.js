//authenticate log in
//retrieve student profile from database
//set user state from student profile

import React, { useState } from "react";
import { Grid, TextField, Container, Button } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/UserReducer";
// import ".env"

const Home = () => {
  // console.log(process.env.REACT_APP_SECRET)
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  // const user = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (username[0] === "s") {
      const res = await axios.post("http://127.0.0.1:8000/students/login/", {
        username: username,
        password: password,
      });
      console.log(res.data.access);
      dispatch(userActions.setAccessToken(res.data.access));
      console.log(user.accessToken);
      //i'm assuming this only happens after the above lines
      const student = await axios.get(
        `http://127.0.0.1:8000/students/profile/${username}/`,
        { headers: { Authorization: `Bearer ${res.data.access}` } }
      );
      console.log(student.data);
      dispatch(userActions.loginSuccess(student.data));
      history.push("/student");
    } else if (username[0] === "t") {
      const res = await axios.post("http://127.0.0.1:8000/tutors/login/", {
        username: username,
        password: password,
      });
      console.log(res.data);
      dispatch(userActions.setAccessToken(res.data));
      const tutor = await axios.get(
        `http://127.0.0.1:8000/tutors/profile/${username}/`,
        {
          username: username,
        }
      );
      console.log(tutor);
    }
  };
  return (
    <>
      <header
        style={{
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          padding: "3vh",
          marginBottom: "5vh",
          height: "10vh",
        }}
      >
        TYS - LOG IN
      </header>
      <div className="main" style={{ textAlign: "center" }}>
        <form>
          <Container sx={{ marginTop: "10px" }} maxWidth="sm">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid container justifyContent="center" sx={{ margin: "20px" }}>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={handleLogin}
                >
                  Log In
                </Button>
              </Grid>
            </Grid>
          </Container>
        </form>
        Don't have an account with us yet?
        <br />
        Register <Link to="/student_register">here for students</Link>, and{" "}
        <Link to="/tutor/register">here for tutors</Link>.
      </div>
    </>
  );
};

export default Home;
