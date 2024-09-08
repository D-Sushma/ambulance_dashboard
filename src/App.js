import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideNav from "./components/SideNav";
import PatientList from "./components/patient/PatientList";
import DoctorList from "./components/doctor/DoctorList";
import { Box } from "@mui/material";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
        {/* <SideNav /> */}

        <Box component="div">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<SideNav />} />
            <Route path="/patient" element={<PatientList />} />
            <Route path="/doctor" element={<DoctorList />} />
          </Routes>
        </Box>
      </div>
    </BrowserRouter>
  );
}

export default App;
