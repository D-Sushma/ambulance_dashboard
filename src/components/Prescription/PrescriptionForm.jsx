import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import ViewPrescriptionDialog from './ViewPrescriptionDialog';


export default function PrescriptionForm() {

  const [selectedPatient, setSelectedPatient] = useState('')
  const [medicines, setMedicines] = useState({name:'', dosage: ''})
  const [note, setNote] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)
  const [prescriptionData, setPrescriptionData] = useState({});

  const handleMedicineChange = (e) => {
    const { name, value } = e.target;
    setMedicines((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setIsSubmitSuccess(false)
  }

  const handleNoteChange = (e) => {
    setNote(e.target.value)
    setIsSubmitSuccess(false)
  }

  const toggleModal = (value) => {
    setIsModalOpen(value)
  };

  const [userList, setUserList] = useState([]);

  const fetchPatientData = async () => {
    console.log('im hrere');

    try {
      // const response = await axios.get('https://run.mocky.io/v3/31a240fd-5d42-4de8-86b3-6ea095832df7');
      const response = await axios.get('http://localhost:5051/api/getpatient');

      console.log(response);

      const data = response?.data;

      if (data?.data) {
        const userDetails = data?.data.map((user) => {
          return { label: user?.name, id: user?._id };
        });

        setUserList(userDetails);
      }
      // const columnData = data?.map((col)=>{})
    } catch (error) {
      console.log('error', error);
    }
  };

  React.useEffect(() => {
    console.log('user effoce');

    fetchPatientData();
  }, []);

  const handlePatientSelect = (e, newValue) => {
    console.log(newValue);
    setSelectedPatient(newValue?.id)
  }

  const handleSubmit = async () => {
    try {
      const payload = {
        patientID: selectedPatient,
        medicines: [medicines],
        note
      }
      console.log("payload", payload);

      /* ----- un comment api call for submit form -----*/

      
      // const response = await axios.post(
      //   'http://localhost:5051/api/createprescription',
      //   payload
      // );
      // if (response?.data?.data) {
        console.log('Submit success fully');
        // console.log('Response', response?.data?.data);
        setPrescriptionData(payload)
        setIsSubmitSuccess(true)
        // toggleModal(true);
      // }
    } catch (error) {
      console.log('Error submitting data', error);
    }
  };

  const isSubmitDisabled = () => {
    return (
      !selectedPatient ||
      !medicines?.name ||
      !medicines?.dosage ||
      !note
    );
  };

  return (
    <Box
      component="form"
      // sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      // className="box-wrapper"
    >
      <Box>
        <Typography variant="h5" gutterBottom>
          ADD PRESCRIPTIONS FOR PATIENT
        </Typography>
      </Box>

      <Box
        sx={{ width: '50%', border: '1px solid', p: 2, borderRadius: '10px', mt:2 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              options={userList}
              sx={{ width: '100%' }}
              onChange={handlePatientSelect}
              renderInput={(params) => <TextField {...params} label="Select Patient" />}
            />
          </Grid>
          
          <Grid item xs={12}>
          <Typography variant="h6"align='left' > Medicine </Typography>
          </Grid>
          
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Medicine Name"
              name="name"
              value={medicines?.name}
              onChange={handleMedicineChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Dosage"
              name="dosage"
              value={medicines?.dosage}
              onChange={handleMedicineChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Instructions"
              name="note"
              value={note}
              onChange={handleNoteChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={isSubmitDisabled() || isSubmitSuccess}
            >
              Add Prescreption
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
      <ViewPrescriptionDialog open={isModalOpen} prescriptionData={prescriptionData} closeModal={toggleModal}/>
    </Box>
  );
}
