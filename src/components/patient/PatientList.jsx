import * as React from 'react';
import { useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbar
} from '@mui/x-data-grid';


export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const fetchPatientData = async () => {
    console.log("im hrere");
    
    try {
      const response = await axios.get("http://localhost:5051/api/getpatient");

      console.log(response);
      
      const data = response?.data;

      if(data?.data){
        console.log(response?.data);
        
        setRows(data?.data);
      }
      // const columnData = data?.map((col)=>{})
    } catch (error) {
      console.log("error", error);
    }
  };

  React.useEffect(() => {
    console.log("user effoce");
    
    fetchPatientData();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    console.log("id", id);
    
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    try {
      // Assuming your JSON server is running on localhost:3000
      const patientData = await axios.put(`http://localhost:8081/patientData/${newRow.id}`, updatedRow);
      console.log(patientData);
      
      
      // Update state with the new row if the API call is successful
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    } catch (error) {
      console.error("Error updating row on JSON Server: ", error);
      return newRow; // Optionally return the unchanged row on error
    }
  };
  

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'name', 
      headerName: 'Name', 
      width: 100,
      flex:1, 
      editable: true 
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'text',
      width: 80,
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      type: 'text',
      width: 80,
      // flex:1,
      editable: true,
    },
    {
      field: 'contact',
      headerName: 'Contact Number',
      width: 200,
      flex:1,
      editable: true,
      type: 'text',
    },
    {
      field: 'medicalHistory',
      headerName: 'Medical History',
      width: 150,
      flex:1,
      editable: true,
      type: 'text',
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 350,
      flex:1,
      editable: true,
      type: 'text',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',flex:1,
      width: 150,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        getRowId ={(row) => row?.id}
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        autoHeight
        disableRowSelectionOnClick
        disableColumnSelector
        disableColumnMenu
        disableDensitySelector
        disableColumnFilter
        disableColumnResize
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, showQuickFilter: true,
            csvOptions: { disableToolbarButton: false },
            printOptions: { disableToolbarButton: false } },
        }}
      />
    </Box>
  );
}
