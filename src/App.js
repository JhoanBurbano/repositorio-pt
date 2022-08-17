import { useState } from "react";

import {
  Container,
  Step,
  Stepper,
  StepLabel,
  Box,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validators/";

import Form1 from "./components/Form1";
import Form2 from "./components/Form2";
import TableData from "./components/Table";
import EditForm from "./components/EditForm";
import { DEFAULT_ALERT, DEFAULT_VALUES } from "./constants";
import useUsers from "./hooks/useUsers";

const App = () => {
  const [step, setStep] = useState(0);
  const [alert, setAlert] = useState(DEFAULT_ALERT);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false)
  const [userEdit, setUserEdit] = useState(DEFAULT_VALUES)
  const { users, deleteUser, changePage, createUser, editUser, total } = useUsers();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });

  const steps = [
    {
      label: "Paso 1",
      componente: (
        <Form1
          setStep={setStep}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      ),
    },
    {
      label: "Paso 2",
      componente: (
        <Form2
          setStep={setStep}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          reset={reset}
          setAlert={setAlert}
          setOpen={setOpen}
          createUser={createUser}
        />
      ),
    },
  ];

  function handleClose() {
    setOpen(false);
  }

  function handleCloseModal() {
    setOpenModal(false)
  }

  function openEditModal(user) {
    setOpenModal(true)
    setUserEdit(user)
  }

  return (
    <Container
      fixed
      style={{
        padding: "3em",
      }}
    >
      <Grid container spacing={6}>
        <Grid item md={4} sm={12} xs={12}>
          <Stepper activeStep={step}>
            {steps.map((step, key) => (
              <Step key={key}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box
            style={{
              marginTop: "4em",
            }}
          >
            {steps[step].componente}
          </Box>
        </Grid>
        <Grid item md={8} sm={26} xs={26}>
          <TableData openEditModal={openEditModal} users={users} deleteUser={deleteUser} changePage={changePage} total={total} />
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.type} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
      <EditForm open={openModal} closeModal={handleCloseModal} user={userEdit} setAlert={setAlert}  setOpen={setOpen} setUser={setUserEdit} editUser={editUser}/>
    </Container>
  );
};

export default App;
