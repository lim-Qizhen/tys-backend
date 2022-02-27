import React from "react";
import StudentNavBar from "./StudentNavBar";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const StudentProfile = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  if (user.accessToken === "") {
    history.push("/");
  }
  //get user papers scores
  return (
    <>
      <StudentNavBar />
    </>
  );
};

export default StudentProfile;
