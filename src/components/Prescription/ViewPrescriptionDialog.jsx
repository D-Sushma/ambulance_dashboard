import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ViewPrescriptionDialog({open, prescriptionData, closeModal}) {

  const handleClose = () => {
    closeModal(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Prescriptions Information
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box
            sx={{ width: '100%', border: '1px solid', p: 2, borderRadius: '10px', mt: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Patient Name"
                  name="name"
                  value={prescriptionData?.patientID ?? ''}
                  InputProps={{
                    readOnly: true,
                  }}
                  required
                />  
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" align="left"> Medicine </Typography>
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Medicine Name"
                  name="name"
                  value={prescriptionData?.medicines?.[0]?.name ?? ''}
                  InputProps={{
                    readOnly: true,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Dosage"
                  name="dosage"
                  value={prescriptionData?.medicines?.[0]?.dosage ?? ''}
                  InputProps={{
                    readOnly: true,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Instructions"
                  name="note"
                  value={prescriptionData?.note ?? ''}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Okay
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
