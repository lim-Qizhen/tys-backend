import React, { useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Container,
  IconButton,
  Button,
  InputAdornment,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/UserReducer";
import axios from "axios";
import { useHistory } from "react-router-dom";

const TutorRegister = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const schools = [
    { value: "Anglican_High_School", label: "Anglican High School" },
  ];
  const subjects = [
    { value: "Biology", label: "Biology" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Physics", label: "Physics" },
  ];
  const [numberOfSubjects, setNumberOfSubjects] = useState(1);
  const [teachingSubjects, setTeachingSubjects] = useState([""]);
  const handleAddSubject = () => {
    setNumberOfSubjects(numberOfSubjects + 1);
    const toChange = [...teachingSubjects];
    toChange.push("");
    setTeachingSubjects(toChange);
  };
  const subjectOptions = () => {
    let number = [];
    for (let i = 1; i <= numberOfSubjects; i++) {
      number.push(i);
    }
    return number.map((element) => (
      <>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            select
            label="Subject"
            id="subject"
            value={teachingSubjects[element - 1]}
            onChange={(e) => {
              const toChange = [...teachingSubjects];
              toChange[element - 1] = e.target.value;
              setTeachingSubjects(toChange);
              console.log(teachingSubjects);
            }}
          >
            {subjects.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </>
    ));
  };
  const handleFirstNameChange = (e) => {
    dispatch(userActions.setFirstName(e.target.value));
  };
  const handleLastNameChange = (e) => {
    dispatch(userActions.setLastName(e.target.value));
  };
  const handleUsernameChange = (e) => {
    dispatch(userActions.setUsername(e.target.value));
  };
  const handleEmailChange = (e) => {
    dispatch(userActions.setEmail(e.target.value));
  };
  const handlePhoneChange = (e) => {
    dispatch(userActions.setPhone(e.target.value));
  };
  const handleSchoolChange = (e) => {
    dispatch(userActions.setSchool(e.target.value));
  };
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://127.0.0.1:8000/tutors/new/", {
      first_name: user.f_name,
      last_name: user.l_name,
      username: `t_${user.username}`,
      contact: user.phone,
      email: user.email,
      school: user.school,
      subject: teachingSubjects,
      password: password,
    });
    console.log(res.data);
    history.push("/");
  };
  
  const disableButton = () => {
    return (
      user.f_name === "" ||
      user.l_name === "" ||
      user.username === "" ||
      user.phone === "" ||
      user.email === "" ||
      user.school === "" ||
      // teachingSubjects === [""] ||
      user.password === ""
    );
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
        TYS- TUTOR REGISTRATION
      </header>
      <Container sx={{ marginTop: "10px", marginBottom: "10px" }} maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={user.f_name}
              onChange={handleFirstNameChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={user.l_name}
              onChange={handleLastNameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">t_</InputAdornment>
                ),
              }}
              value={user.username}
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
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              autoComplete="email"
              value={user.email}
              onChange={handleEmailChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              disabled
              fullWidth
              label="Country Code"
              id="outlined-disabled"
              value="+65 (SGP)"
            />
          </Grid>
          <Grid item xs={9}>
            <TextField
              required
              fullWidth
              name="phone"
              label="Phone Number"
              type="number"
              id="phone"
              autoComplete="phone"
              value={user.phone}
              onChange={handlePhoneChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              select
              label="School"
              id="school"
              value={user.school}
              onChange={handleSchoolChange}
            >
              {schools.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {subjectOptions()}
        </Grid>
        <Grid container justifyContent="flex-end">
          <IconButton
            aria-label="subject"
            size="large"
            onClick={handleAddSubject}
            disabled={numberOfSubjects >= 3}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Grid>
        <Grid container justifyContent="center" sx={{ marginTop: "20px" }}>
          <Button
            variant="outlined"
            onClick={handleSubmit}
            disabled={disableButton}
          >
            Register
          </Button>
        </Grid>
      </Container>
    </>
  );
};

export default TutorRegister;
