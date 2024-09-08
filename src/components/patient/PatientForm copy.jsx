import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";

function PatientForm() {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    medicalHistory: "",
  });

  const handleChange = (e) => {
    // console.log(e.target.value);
    
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/patients", patient);
      alert("Patient added successfully!");
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Patient Name"
          name="name"
          value={patient.name}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Age"
          name="age"
          value={patient.age}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Gender"
          name="gender"
          value={patient.gender}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Contact Information"
          name="contact"
          value={patient.contact}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Medical History"
          name="medicalHistory"
          value={patient.medicalHistory}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Patient
        </Button>
      </Grid>
    </Grid>
  );
}

export default PatientForm;
