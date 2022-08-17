import { useEffect } from "react";

import {
  Box,
  TextField,
  Button,
  Typography,
  Modal,
  Paper,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import useFormStyles from "../styles/useFormFields";
import { schema } from "../validators";
import { DEFAULT_ALERT, DEFAULT_VALUES } from "../constants";

const EditForm = ({
  open,
  closeModal,
  user,
  setAlert,
  setOpen,
  setUser,
  editUser,
}) => {
  const classes = useFormStyles();

  function handleClose() {
    reset(DEFAULT_VALUES);
    setUser(DEFAULT_VALUES);
    closeModal();
  }

  async function onSubmit(_user) {
    Object.keys(user).forEach((field) => {
      if (user[field] === _user[field]) {
        delete _user[field];
      }
    });
    if (Object.keys(_user).length) {
      try {
        _user._id = user._id;
        await editUser(_user);
        setAlert({
          message: "El usuario fue actualizado exitosamente",
          type: "success",
        });
        setOpen(true);
        reset(DEFAULT_VALUES);
        setUser(DEFAULT_VALUES);
        closeModal();
      } catch (error) {
        setAlert({
          message: error.message,
          type: "error",
        });
        setOpen(true);
        setTimeout(setAlert(DEFAULT_ALERT), 6000);
      }
    } else {
      setAlert({
        message: "No has actualizado ningun valor",
        type: "warning",
      });
      setOpen(true);
    }
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });

  useEffect(() => {
    clearErrors();
    Object.entries(DEFAULT_VALUES).forEach(([field, value]) => {
      setValue(field, user[field]);
    });
  }, [clearErrors, setValue, user]);

  return (
    <Modal open={open} onClose={closeModal}>
      <Box
        style={{
          marginTop: "4em",
          background: "white",
          padding: "6em",
          width: "30%",
          margin: "auto",
        }}
        component={Paper}
      >
        <Typography textAlign="center" fontWeight={"bold"} variant={"h4"}>
          EDITAR USUARIO
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            marginTop: "2em",
          }}
        >
          <TextField
            className={classes.formField}
            fullWidth
            {...register("name")}
            helperText={errors.name?.message}
            label="Nombre"
            error={!!errors?.name}
          />
          <TextField
            className={classes.formField}
            {...register("lastName")}
            fullWidth
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            label="Apellido"
          />
          <TextField
            className={classes.formField}
            {...register("email")}
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            label="E-mail"
          />
          <TextField
            className={classes.formField}
            {...register("phoneNumber")}
            fullWidth
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            label="Teléfono"
          />
          <TextField
            className={classes.formField}
            {...register("cc")}
            fullWidth
            error={!!errors.cc}
            helperText={errors.cc?.message}
            label="Documento de identidad"
          />
          <Box display={"flex"} justifyContent="center">
            <Button variant="contained" type="submit" disabled={false}>
              Enviar
            </Button>
            <Button
              variant="contained"
              type="button"
              color="error"
              disabled={false}
              onClick={handleClose}
            >
              Cancelar
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditForm;
