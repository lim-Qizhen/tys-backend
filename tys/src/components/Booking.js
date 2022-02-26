import React, { useState } from "react";
import StudentNavBar from "./StudentNavBar";
import { Grid, Container, TextField, Button, Typography } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TimePicker from "@mui/lab/TimePicker";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../redux/UserReducer";

const Booking = () => {
  const today = new Date();
  const year = String(today.getFullYear()).padStart(4, "0");
  const month = String((today.getMonth() + 1) % 12).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");
  const [consultFullDate, setConsultFullDate] = useState(
    `${year}-${month}-${date}`
  );
  const [time, setTime] = useState(new Date(0, 0, 0, 10, 0));
  console.log(consultFullDate);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleBook = (e) => {
    e.preventDefault();
    const current = [...user.consultations];
    current.push({
      date: consultFullDate,
      time: `${time.getHours()} : ${String(time.getMinutes()).padStart(2,"0")}`
    });
    dispatch(userActions.setConsultations(current));
    history.push("/student_consultations");
  };
  return (
    <>
      <StudentNavBar />
      <Container sx={{ marginTop: "30px" }} maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography align="center">CONSULTATION SLOT</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="Date"
              required
              fullWidth
              id="Date"
              label="Date"
              autoFocus
              type="date"
              InputLabelProps={{ shrink: true }}
              value={consultFullDate}
              onChange={(e) => {
                console.log(e.target.value);
                setConsultFullDate(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider
              textFieldStyle={{ width: "100%" }}
              dateAdapter={AdapterDateFns}
            >
              <TimePicker
                label="Time"
                // fullWidth
                value={time}
                onChange={(newValue) => {
                  setTime(newValue);
                }}
                minTime={new Date(0, 0, 0, 10)}
                maxTime={new Date(0, 0, 0, 17, 30)}
                minutesStep={15}
                renderInput={(params) => <TextField {...params} />}
                shouldDisableTime={(timeValue, clockType) => {
                  return clockType === "minutes" && timeValue % 15 !== 0;
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          sx={{ marginTop: "20px" }}
          color="inherit"
        >
          <Link to="/student_consultations" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              style={{ color: "black", borderColor: "black" }}
              onClick={handleBook}
            >
              Book Consultation
            </Button>
          </Link>
        </Grid>
      </Container>
    </>
  );
};

export default Booking;
