//NEED TO GET THE STUDENTS' PAPERS
//CAN SAVE THE PAPER_ID TO THE STATE TO KNOW WHAT PAPER WE ARE DOING

import React, { useEffect, useState } from "react";
import StudentNavBar from "./StudentNavBar";
import {
  Box,
  ListItemText,
  ListSubheader,
  ListItemButton,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useSlider } from "@mui/base";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const StudentHome = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  if(user.accessToken === ""){
    history.push("/")
  }
  const [relevantPapers, setRelevantPapers] = useState([]);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/students/login_papers/${user.username}/`)
      .then((res) => {
        setRelevantPapers(res.data);
      });
  }, []);
  console.log(relevantPapers);
  const donePapers = {};
  const toDoPapers = {};
  for (const paper of relevantPapers) {
    if (paper.completed === true) {
      const subject = paper.paper_id.split("_")[1];
      if (subject in donePapers) {
        donePapers[subject].push(paper.paper_id);
      } else {
        donePapers[subject] = [paper.paper_id];
      }
    } else {
      const subject = paper.paper_id.split("_")[1];
      if (subject in toDoPapers) {
        toDoPapers[subject].push(paper.paper_id);
      } else {
        toDoPapers[subject] = [paper.paper_id];
      }
    }
  }
  console.log(donePapers, toDoPapers);

  //create array of states depending on number of subjects x2
  const [open, setOpen] = useState([false]);
  const handleClick = (sequence) => {
    const initial = open[sequence];
    const updated = [...open];
    updated[sequence] = !initial;
    setOpen([...updated]);
  };
  const examPapers = () => {
    return Object.keys(toDoPapers).map((subject, index) => (
      <>
        <ListItemButton
          onClick={() => {
            handleClick(index);
          }}
        >
          <ListItemText primary={subject} />
          {open[index] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open[index]}>
          {toDoPapers[subject].map((element) => {
            return (
              <ListItemText sx={{ pl: 4 }}>
                <Link to={`/student/${element}`}>{element.split("_")[2]}</Link>
              </ListItemText>
            );
          })}
        </Collapse>
      </>
    ));
  };
  const completedPapers = () => {
    return Object.keys(donePapers).map((subject, index) => (
      <>
        <ListItemButton
          onClick={() => {
            handleClick(index + user.subjects.length);
          }}
        >
          <ListItemText primary={subject} />
          {open[index + user.subjects.length] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open[index + user.subjects.length]}>
          {donePapers[subject].map((element) => {
            return (
              <ListItemText sx={{ pl: 4 }}>
                <Link to={`/student/${element}/review`}>{element.split("_")[2]}</Link>
              </ListItemText>
            );
          })}
        </Collapse>
      </>
    ));
  };

  return (
    <div>
      <StudentNavBar />
      <Box
          sx={{
            width: "100%",
            maxWidth: 300,
            margin: "20px",
          }}
        >
          Welcome, {user.f_name}
        </Box>
      <div
        className="all-papers"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "500px",
            maxWidth: 300,
            bgcolor: "background.paper",
            margin: "20px",
          }}
        >
          <ListSubheader sx={{ backgroundColor: "black", color: "white" }}>
            Practice Papers
          </ListSubheader>
          {examPapers()}
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "500px",
            maxWidth: 300,
            bgcolor: "white",
            margin: "20px",
          }}
        >
          <ListSubheader sx={{ backgroundColor: "black", color: "white" }}>
            Completed Papers
          </ListSubheader>
          {completedPapers()}
        </Box>
      </div>
    </div>
  );
};

export default StudentHome;
