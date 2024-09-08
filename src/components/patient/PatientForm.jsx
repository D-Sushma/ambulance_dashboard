import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";

export default function BasicTextFields() {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    address: "",
    medicalHistory: "",
  });

  const handleChange = (e) => {
    // console.log("handleChange called", e.target.value, e.target.name);

    const { name, value } = e.target;

    setPatient((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    try {
      // console.log("submit", patient);
      // const response = axios
    } catch (error) {
      console.log("Error submitting data", error);
    }
  };

  const isSubmitDisabled = () => {
    return (
      !patient?.name ||
      !patient?.age ||
      !patient?.gender ||
      !patient?.contact ||
     !patient?.address
    )
  };

  return (
    <Box
      component="form"
      // sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      // className="box-wrapper"
    >
      <Box>
        <Typography variant="h5" gutterBottom>
          ADD PATIENT
        </Typography>
      </Box>

      <Box
        sx={{ width: "50%", border: "1px solid", p: 2, borderRadius: "10px" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Patient Name"
              name="name"
              value={patient?.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Age"
              name="age"
              value={patient?.age}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Gender"
              name="gender"
              value={patient?.gender}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Contact Information"
              name="contact"
              value={patient?.contact}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Address"
              name="address"
              value={patient?.address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Medical History"
              name="medicalHistory"
              value={patient?.medicalHistory}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={isSubmitDisabled()}
            >
              Add Patient
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
