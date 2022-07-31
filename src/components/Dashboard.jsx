import axios from "axios";
import { useEffect, useState } from "react";
import PatientInfo from "./PatientInfo";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Dashboard() {
  const [patient, setPatient] = useState([]);
  const [doctorInfo, setDoctorInfo] = useState([]);
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  async function getUserDetails() {
    const res = await axios.get("http://localhost:3000/api/v1/dashboard", {
      withCredentials: true,
    });
    setLoggedIn(res.data.success);
    setUser(res.data.user);
    const response = await axios.get(
      `http://localhost:3000/api/v1/patient/${res.data.user.email}`,
      {
        withCredentials: true,
      }
    );
    setPatient(response.data.patient);
    setDoctorInfo(response.data.doctorInfo);
  }

  function getPatientDetails() {
    axios.get(`http://localhost:3000/api/v1/patient/`);
  }

  function logout() {
    axios
      .get("http://localhost:3000/api/v1/logout", {
        withCredentials: true,
      })
      .then((res) => {
        setLoggedIn(!res.data.success);
      });
  }

  useEffect(() => {
    // getSchedule();
    getUserDetails();
  }, []);

  return (
    <div>
      {loggedIn ? (
        <div>
          <div>
            <Button variant="white" type="submit">
              <Link to="/create">create</Link>
            </Button>
            <Button variant="white" type="submit" onClick={logout}>
              logout
            </Button>
          </div>
          {patient && <PatientInfo patient={patient} doctorInfo={doctorInfo} />}
        </div>
      ) : (
        <div>You are not loggedin </div>
      )}
    </div>
  );
}

export default Dashboard;
