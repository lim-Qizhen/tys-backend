//add user to database
//add user relevant papers to database

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

const StudentRegister = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const schools = [
    {
      value: "Admiralty_Secondary_School",
      label: "Admiralty Secondary School",
    },
    {
      value: "Ahmad_Ibrahim_Secondary_School",
      label: "Ahmad Ibrahim Secondary School",
    },
    { value: "Anderson_Secondary_School", label: "Anderson Secondary School" },
    { value: "Anglican_High_School", label: "Anglican High School" },
    {
      value: "Anglo_Chinese_School_Barker_Road_",
      label: "Anglo-Chinese School (Barker Road)",
    },
    {
      value: "Anglo_Chinese_School_Independent",
      label: "Anglo-Chinese School (Independent)",
    },
    {
      value: "Ang_Mo_Kio_Secondary_School",
      label: "Ang Mo Kio Secondary School",
    },
    { value: "Assumption_English_School", label: "Assumption English School" },
    { value: "Bartley_Secondary_School", label: "Bartley Secondary School" },
    { value: "Beatty_Secondary_School", label: "Beatty Secondary School" },
    {
      value: "Bedok_Green_Secondary_School",
      label: "Bedok Green Secondary School",
    },
    {
      value: "Bedok_South_Secondary_School",
      label: "Bedok South Secondary School",
    },
    {
      value: "Bedok_View_Secondary_School",
      label: "Bedok View Secondary School",
    },
    {
      value: "Bendemeer_Secondary_School",
      label: "Bendemeer Secondary School",
    },
    { value: "Boon_Lay_Secondary_School", label: "Boon Lay Secondary School" },
    { value: "Bowen_Secondary_School", label: "Bowen Secondary School" },
    {
      value: "Broadrick_Secondary_School",
      label: "Broadrick Secondary School",
    },
    {
      value: "Bukit_Batok_Secondary_School",
      label: "Bukit Batok Secondary School",
    },
    {
      value: "Bukit_Merah_Secondary_School",
      label: "Bukit Merah Secondary School",
    },
    {
      value: "Bukit_Panjang_Government_High_School",
      label: "Bukit Panjang Government High School",
    },
    {
      value: "Bukit_View_Secondary_School",
      label: "Bukit View Secondary School",
    },
    { value: "Catholic_High_School", label: "Catholic High School" },
    { value: "Canberra_Secondary_School", label: "Canberra Secondary School" },
    {
      value: "Cedar_Girls_Secondary_School",
      label: "Cedar Girls' Secondary School",
    },
    {
      value: "Changkat_Changi_Secondary_School	",
      label: "Changkat Changi Secondary School",
    },
    {
      value: "CHIJ_Katong_Convent_Secondary",
      label: "CHIJ Katong Convent (Secondary)",
    },
    {
      value: "CHIJ_Secondary_Toa_Payoh",
      label: "CHIJ Secondary (Toa Payoh)",
    },
    { value: "CHIJ_St_Josephs_Convent", label: "CHIJ St. Joseph's Convent" },
    {
      value: "CHIJ_St_Nicholas_Girls_School",
      label: "CHIJ St. Nicholas Girls' School",
    },
    {
      value: "CHIJ_St_Theresas_Convent",
      label: "CHIJ St. Theresa's Convent",
    },
    {
      value: "Chua_Chu_Kang_Secondary_School",
      label: "Chua Chu Kang Secondary School",
    },
    {
      value: "Christ_Church_Secondary_School",
      label: "Christ Church Secondary School",
    },
    {
      value: "Chung_Cheng_High_School_Main",
      label: "Chung Cheng High School (Main)",
    },
    {
      value: "Chung_Cheng_High_School_Yishun",
      label: "Chung Cheng High School (Yishun)",
    },
    {
      value: "Clementi_Town_Secondary_School",
      label: "Clementi Town Secondary School",
    },
    {
      value: "Commonwealth_Secondary_School",
      label: "Commonwealth Secondary School",
    },
    {
      value: "Compassvale_Secondary_School",
      label: "Compassvale Secondary School",
    },
    { value: "Crescent_Girls_School", label: "Crescent Girls' School" },
    { value: "Crest_Secondary_School", label: "Crest Secondary School" },
    { value: "Damai_Secondary_School", label: "Damai Secondary School" },
    { value: "Deyi_Secondary_School", label: "Deyi Secondary School" },
    { value: "Dunearn_Secondary_School", label: "Dunearn Secondary School" },
    { value: "Dunman_High_School", label: "Dunman High School" },
    { value: "Dunman_Secondary_School", label: "Dunman Secondary School" },
    {
      value: "East_Spring_Secondary_School",
      label: "East Spring Secondary School",
    },
    {
      value: "Edgefield_Secondary_School",
      label: "Edgefield Secondary School",
    },
    {
      value: "Evergreen_Secondary_School",
      label: "Evergreen Secondary School",
    },
    {
      value: "Fairfield_Methodist_Secondary_School",
      label: "Fairfield Methodist Secondary School",
    },
    { value: "Fajar_Secondary_School", label: "Fajar Secondary School" },
    { value: "Fuchun_Secondary_School", label: "Fuchun Secondary School" },
    { value: "Fuhua_Secondary_School", label: "Fuhua Secondary School" },
    { value: "Gan_Eng_Seng_School", label: "Gan Eng Seng School" },
    {
      value: "Geylang_Methodist_School_Secondary",
      label: "Geylang Methodist School (Secondary)",
    },
    {
      value: "Greendale_Secondary_School",
      label: "Greendale Secondary School",
    },
    {
      value: "Greenridge_Secondary_School",
      label: "Greenridge Secondary School",
    },
    {
      value: "Guangyang_Secondary_School",
      label: "Guangyang Secondary School",
    },
    { value: "Hai_Sing_Catholic_School", label: "Hai Sing Catholic School" },
    {
      value: "Hillgrove_Secondary_School",
      label: "Hillgrove Secondary School",
    },
    {
      value: "Holy_Innocents_High_School",
      label: "Holy Innocents' High School",
    },
    { value: "Hong_Kah_Secondary_School", label: "Hong Kah Secondary School" },
    { value: "Hougang_Secondary_School", label: "Hougang Secondary School" },
    { value: "Hua_Yi_Secondary_School", label: "Hua Yi Secondary School" },
    { value: "Hwa_Chong_Institution", label: "Hwa Chong Institution" },
    { value: "Junyuan_Secondary_School", label: "Junyuan Secondary School" },
    { value: "Jurong_Secondary_School", label: "Jurong Secondary School" },
    {
      value: "Jurong_West_Secondary_School",
      label: "Jurong West Secondary School",
    },
    {
      value: "Jurongville_Secondary_School",
      label: "Jurongville Secondary School",
    },
    { value: "Juying_Secondary_School", label: "Juying Secondary School" },
    {
      value: "Kent_Ridge_Secondary_School",
      label: "Kent Ridge Secondary School",
    },
    { value: "Kranji_Secondary_School", label: "Kranji Secondary School" },
    {
      value: "Kuo_Chuan_Presbyterian_Secondary_School",
      label: "Kuo Chuan Presbyterian Secondary School",
    },
    {
      value: "Loyang_View_Secondary_School",
      label: "Loyang View Secondary School",
    },
    { value: "Manjusri_Secondary_School", label: "Manjusri Secondary School" },
    { value: "Maris_Stella_High_School", label: "Maris Stella High School" },
    {
      value: "Marsiling_Secondary_School",
      label: "Marsiling Secondary School",
    },
    {
      value: "Mayflower_Secondary_School",
      label: "Mayflower Secondary School",
    },
    { value: "Meridian_Secondary_School", label: "Meridian Secondary School" },
    {
      value: "Methodist_Girls_School_Secondary",
      label: "Methodist Girls' School (Secondary)",
    },
    { value: "Montfort_Secondary_School", label: "Montfort Secondary School" },
    { value: "Nan_Chiau_High_School", label: "Nan Chiau High School" },
    { value: "Nan_Hua_High_School", label: "Nan Hua High School" },
    {
      value: "Nanyang_Girls_High_School",
      label: "Nanyang Girls' High School",
    },
    { value: "National_Junior_College", label: "National Junior College" },
    {
      value: "Naval_Base_Secondary_School",
      label: "Naval Base Secondary School",
    },
    { value: "New_Town_Secondary_School", label: "New Town Secondary School" },
    { value: "Ngee Ann Secondary School", label: "Ngee Ann Secondary School" },
    {
      value: "North_Vista_Secondary_School",
      label: "North Vista Secondary School",
    },
    {
      value: "Northbrooks_Secondary_School",
      label: "Northbrooks Secondary School",
    },
    {
      value: "Northland_Secondary_School",
      label: "Northland Secondary School",
    },
    {
      value: "NUS_High_School_of_Mathematics_and_Science",
      label: "NUS High School of Mathematics and Science",
    },
    {
      value: "Orchid_Park_Secondary_School",
      label: "Orchid Park Secondary School",
    },
    { value: "Outram_Secondary_School", label: "Outram Secondary School" },
    {
      value: "Pasir_Ris_Crest_Secondary_School",
      label: "Pasir Ris Crest Secondary School",
    },
    {
      value: "Pasir_Ris_Secondary_School",
      label: "Pasir Ris Secondary School",
    },
    {
      value: "Paya_Lebar_Methodist_Girls_School_Secondary",
      label: "Paya Lebar Methodist Girls' School (Secondary)",
    },
    { value: "Pei_Hwa_Secondary_School", label: "Pei Hwa Secondary School" },
    { value: "Peicai_Secondary_School", label: "Peicai Secondary School" },
    { value: "Peirce_Secondary_School", label: "Peirce Secondary School" },
    { value: "Ping_Yi_Secondary_School", label: "Ping Yi Secondary School" },
    { value: "Presbyterian_High_School", label: "Presbyterian High School" },
    { value: "Punggol_Secondary_School", label: "Punggol Secondary School" },
    {
      value: "Queenstown_Secondary_School",
      label: "Queenstown Secondary School",
    },
    {
      value: "Queensway_Secondary_School",
      label: "Queensway Secondary School",
    },
    {
      value: "Raffles_Girls_School_Secondary",
      label: "Raffles Girls' School (Secondary)",
    },
    { value: "Raffles_Institution", label: "Raffles Institution" },
    { value: "Regent_Secondary_School", label: "Regent Secondary School" },
    {
      value: "Riverside_Secondary_School",
      label: "Riverside Secondary School",
    },
    { value: "River_Valley_High_School", label: "River Valley High School" },
    {
      value: "St_Andrews_Secondary_School",
      label: "St. Andrew's Secondary School",
    },
    { value: "St_Patricks_School", label: "St. Patrick's School" },
    {
      value: "School_of_Science_and_Technology_Singapore",
      label: "School of Science and Technology, Singapore",
    },
    { value: "School_of_the_Arts", label: "School of the Arts" },
    {
      value: "Sembawang_Secondary_School",
      label: "Sembawang Secondary School",
    },
    { value: "Sengkang_Secondary_School", label: "Sengkang Secondary School" },
    {
      value: "Serangoon_Garden_Secondary_School",
      label: "Serangoon Garden Secondary School",
    },
    {
      value: "Serangoon_Secondary_School",
      label: "Serangoon Secondary School",
    },
    { value: "Shuqun_Secondary_School", label: "Shuqun Secondary School" },
    {
      value: "Singapore_Chinese_Girls_School",
      label: "Singapore Chinese Girls' School",
    },
    { value: "Singapore_Sports_School", label: "Singapore Sports School" },
    { value: "Spectra_Secondary_School", label: "Spectra Secondary School" },
    {
      value: "Springfield_Secondary_School",
      label: "Springfield Secondary School",
    },
    {
      value: "St_Anthonys_Canossian_Secondary_School",
      label: "St. Anthony's Canossian Secondary School",
    },
    {
      value: "St_Gabriels_Secondary_School",
      label: "St. Gabriel's Secondary School",
    },
    {
      value: "St_Hildas_Secondary_School",
      label: "St. Hilda's Secondary School",
    },
    {
      value: "St_Margarets_Secondary_School",
      label: "St. Margaret's Secondary School",
    },
    { value: "St_Josephs_Institution", label: "St. Joseph's Institution" },
    {
      value: "Swiss_Cottage_Secondary_School",
      label: "Swiss Cottage Secondary School",
    },
    { value: "Tanglin_Secondary_School", label: "Tanglin Secondary School" },
    { value: "Tampines_Secondary_School", label: "Tampines Secondary School" },
    {
      value: "Tanjong_Katong_Girls_School",
      label: "Tanjong Katong Girls' School",
    },
    {
      value: "Tanjong_Katong_Secondary_School",
      label: "Tanjong Katong Secondary School",
    },
    {
      value: "Teck_Whye_Secondary_School",
      label: "Teck Whye Secondary School",
    },
    { value: "Temasek_Junior_College", label: "Temasek Junior College" },
    { value: "Temasek_Secondary_School", label: "Temasek Secondary School" },
    { value: "Unity_Secondary_School", label: "Unity Secondary School" },
    { value: "Victoria_School", label: "Victoria School" },
    {
      value: "West_Spring_Secondary_School",
      label: "West Spring Secondary School",
    },
    { value: "Westwood_Secondary_School", label: "Westwood Secondary School" },
    { value: "Whitley_Secondary_School", label: "Whitley Secondary School" },
    {
      value: "Woodgrove_Secondary_School",
      label: "Woodgrove Secondary School",
    },
    {
      value: "Woodlands_Ring_Secondary_School",
      label: "Woodlands Ring Secondary School",
    },
    {
      value: "Woodlands_Secondary_School",
      label: "Woodlands Secondary School",
    },
    { value: "Xinmin_Secondary_School", label: "Xinmin Secondary School" },
    {
      value: "Yio_Chu_Kang_Secondary_School",
      label: "Yio Chu Kang Secondary School",
    },
    { value: "Yishun_Secondary_School", label: "Yishun Secondary School" },
    {
      value: "Yishun_Town_Secondary_School",
      label: "Yishun Town Secondary School",
    },
    {
      value: "Yuan_Ching_Secondary_School",
      label: "Yuan Ching Secondary School",
    },
    { value: "Yuhua_Secondary_School", label: "Yuhua Secondary School" },
    {
      value: "Yusof_Ishak_Secondary_School",
      label: "Yusof Ishak Secondary School",
    },
    { value: "Yuying_Secondary_School", label: "Yuying Secondary School" },
    { value: "Zhenghua_Secondary_School", label: "Zhenghua Secondary School" },
    { value: "Zhonghua_Secondary_School", label: "Zhonghua Secondary School" },
  ];
  const subjectOptions = [
    { value: "Biology", label: "Biology" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Physics", label: "Physics" },
    { value: "Science_(Biology)", label: "Science (Biology)" },
    { value: "Science_(Chemistry)", label: "Science (Chemistry)" },
    { value: "Science_(Physics)", label: "Science (Physics)" },
    { value: "Science", label: "Science" },
  ];
  const examOptions = [
    { value: "Express", label: "Express" },
    { value: "Normal_(Academic)", label: "Normal Academic" },
    { value: "Normal_(Technical)", label: "Normal Technical" },
  ];
  const [numberOfExams, setNumberOfExams] = useState(1);
  const [subjects, setSubjects] = useState([""]);
  const [exams, setExams] = useState([""]);
  const handleAddExam = () => {
    setNumberOfExams(numberOfExams + 1);
    const subjectToAdd = [...subjects];
    const examToAdd = [...exams];
    subjectToAdd.push("");
    examToAdd.push("");
    setSubjects(subjectToAdd);
    setExams(examToAdd);
  };
  const allExams = () => {
    let number = [];
    for (let i = 1; i <= numberOfExams; i++) {
      number.push(i);
    }
    return number.map((element) => (
      <>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            select
            label="Subject"
            id="subject"
            value={subjects[element - 1]}
            onChange={(e) => {
              const toChange = [...subjects];
              toChange[element - 1] = e.target.value;
              setSubjects(toChange);
            }}
          >
            {subjectOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            select
            label="Exam"
            value={exams[element - 1]}
            onChange={(e) => {
              const toChange = [...exams];
              toChange[element - 1] = e.target.value;
              setExams(toChange);
            }}
          >
            {examOptions.map((option) => (
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
  const disableButton = () => {
    return (
      user.f_name === "" ||
      user.l_name === "" ||
      user.username === "" ||
      user.phone === "" ||
      user.email === "" ||
      user.school === "" ||
      // user.subjects === [] ||
      user.password === ""
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //create account
    const res = await axios.post("http://127.0.0.1:8000/students/new/", {
      first_name: user.f_name,
      last_name: user.l_name,
      username: `s_${user.username}`,
      contact: user.phone,
      email: user.email,
      school: user.school,
      subject: subjects,
      exams: exams,
      password: password,
    });
    console.log(res.data);
    //generating relevant papers for student
    const papers = [];
    for (let i = 0; i < subjects.length; i++) {
      const paper = await axios.get(
        `http://127.0.0.1:8000/students/papers/${subjects[i]}/${exams[i]}/`
      );
      for (const element of paper.data) {
        papers.push(element);
      }
    }
    console.log(papers);
    const studentPapers = [];
    papers.map((paper) => {
      studentPapers.push(paper.paper_id);
    });
    console.log(studentPapers);
    //save exam papers into database
    for (const paper of studentPapers) {
      const savePapers = await axios.post(
        "http://127.0.0.1:8000/students/papers/",
        {
          username: `s_${user.username}`,
          paper_id: paper,
        }
      );
    }
    if (typeof res.data !== "string") {
      history.push("/");
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
        TYS- STUDENT REGISTRATION
      </header>
      <Container sx={{ marginTop: "10px", marginBottom: "10px" }} maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              autoComplete="given-name"
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
                  <InputAdornment position="start">s_</InputAdornment>
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
          {allExams()}
        </Grid>
        <Grid container justifyContent="flex-end">
          <IconButton
            aria-label="subject"
            size="large"
            onClick={handleAddExam}
            disabled={numberOfExams >= 3}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Grid>
        <Grid container justifyContent="center" sx={{ marginTop: "20px" }}>
          <Button
            variant="outlined"
            // disabled={disableButton}
            onClick={handleSubmit}
            color="inherit"
          >
            Register
          </Button>
        </Grid>
      </Container>
    </>
  );
};

export default StudentRegister;
