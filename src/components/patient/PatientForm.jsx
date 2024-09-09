import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import ViewPatientDialog from "./ViewPatientDialog";

export default function BasicTextFields() {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    address: "",
    medicalHistory: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
 
  const toggleModal = (value) => {
    setIsModalOpen(value)
  };

  const handleChange = (e) => {
    // console.log("handleChange called", e.target.value, e.target.name);

    const { name, value } = e.target;

    setPatient((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setIsSubmitSuccess(false)
  };

  const handleSubmit = async () => {
    try {
      // console.log("submit", patient);
      // const response =  await axios.post('http://localhost:5051/api/regpatient', patient)
      // if(response?.data?.data){
        console.log("Submit success fully");
        setIsSubmitSuccess(true)
        // console.log("Response", response?.data?.data);
      // }
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
        sx={{ width: "50%", border: "1px solid", p: 2, borderRadius: "10px", mt:2 }}
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
              disabled={isSubmitDisabled() || isSubmitSuccess}
            >
              Add Patient
            </Button>
            <Button
              variant="contained"
              color="primary"
             sx={{marginLeft: "10px"}}
              onClick={()=>(toggleModal(true))}
              disabled={!isSubmitSuccess}
            >
              View
            </Button>
          </Grid>
        </Grid>
      </Box>
      <ViewPatientDialog open={isModalOpen} patient={patient} closeModal={toggleModal}/>
    </Box>
  );
}
