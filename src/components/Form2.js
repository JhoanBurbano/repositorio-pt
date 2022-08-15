import { TextField, Button } from "@mui/material";
import { DEFAULT_VALUES } from "../constants";

import useUsers from "../hooks/useUsers";
import useFormStyles from "../styles/useFormFields";

const Form2 = ({ setStep, register, handleSubmit, errors, reset, setAlert, setOpen }) => {
  const classes = useFormStyles();
  const { createUser } = useUsers();

  const onSubmit = async (user) => {
    try {
      await createUser(user)
      reset(DEFAULT_VALUES)
      setAlert({
        message: 'El usuario fue creado exitosamente',
        type: 'success'
      })
      setOpen(true)
    } catch (error) {
      setAlert({
        message: error.message,
        type: 'error'
      })
      console.log('error :>> ', error);
      setOpen(true)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Button
        className={classes.formButtons}
        variant="outlined"
        onClick={() => setStep(0)}
      >
        Anterior
      </Button>
      <Button variant="contained" type="submit">
        Enviar
      </Button>
    </form>
  );
};

export default Form2;
