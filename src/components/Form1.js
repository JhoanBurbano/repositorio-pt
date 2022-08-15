import { TextField, Button } from "@mui/material";
import { useState } from "react";

import useFormStyles from "../styles/useFormFields";
import { onlyLetters } from "../validators/regex";

const Form1 = ({
  setStep,
  // setUser,
  // user,
  register
}) => {
  const classes = useFormStyles();
  const [errors, setErrors] = useState({
    name: {
      message: 'El campo es requerido.',
      error: true
    },
    lastName: {
      message: 'El campo es requerido',
      error: true
    }
  })

  const [clicked, setClicked] = useState({name: false, lastName: false})


  function validateFields({target: {name, value}}) {
    switch(name){
      case 'name':
        if(!value.length){
          setErrors(errors => ({
            ...errors,
            [name]: {
              error: true,
              message: `Debe ingresar su Nombre`
            }
          }))
        break;
        }
        if(!onlyLetters.test(value)){
          setErrors(errors => ({
            ...errors,
            [name]: {
              error: true,
              message: `Solo puedes ingresar letras`
            }
          }))
        break;
        }
        setErrors(errors => ({
          ...errors,
          [name]: {
            error: false,
            message: ``
          }
        }))
        break;
      case 'lastName':
        if(!value.length){
          setErrors(errors => ({
            ...errors,
            [name]: {
              error: true,
              message: `Debe ingresar su Apellido`
            }
          }))
        break;
        }
        if(!onlyLetters.test(value)){
          setErrors(errors => ({
            ...errors,
            [name]: {
              error: true,
              message: `Solo puedes ingresar letras`
            }
          }))
        break;
        }
        setErrors(errors => ({
          ...errors,
          [name]: {
            error: false,
            message: ``
          }
        }))
        break;
      default:
        break;
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setStep(1);
  };


  return (
    <form onSubmit={onSubmit}>
      <TextField
        className={classes.formField}
        fullWidth
        {...register("name")}
        helperText={clicked.name && errors.name?.message}
        label="Nombre"
        error={clicked.name && !!errors.name.error}
        onChange={validateFields}
        onFocus={()=>setClicked( before => ({...before, name: true}))}
      />
      <TextField
        className={classes.formField}
        {...register("lastName")}
        fullWidth
        error={clicked.lastName && !!errors.lastName.error}
        helperText={clicked.lastName && errors.lastName?.message}
        label="Apellido"
        onChange={validateFields}
        onFocus={()=>setClicked( before => ({...before, lastName: true}))}
      />
      <Button variant="contained" type="submit" disabled={!Object.entries(errors).map(([name, field]) => field.error).every(error => error === false)} >
        Siguiente
      </Button>
    </form>
  );
};

export default Form1;
