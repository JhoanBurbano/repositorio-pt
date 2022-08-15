import * as yup from 'yup'
import { phoneNumber, onlyLetters } from './regex'

export const schema = yup.object({
    name: yup.string().matches(onlyLetters, 'solo se aceptan letras').required('Ingrese su nombre'),
    lastName: yup.string().matches(onlyLetters, 'solo se aceptan letras').required('Ingrese solo su apellido'),
    cc: yup.number().positive().integer().min(8).required('Su documento de identidad es obligatorio'),
    phoneNumber: yup.string().matches(phoneNumber, 'El numero de telefono debe contener solo numeros').length(10, 'El numero de telefono debe contener 10 numeros').required('El numero de telefono es requerido'),
    email: yup.string().email('Invalid email format').required('Required')
  }).required();

// export const schema = yup.object({
//   name: yup.string().required('hola'),
//   lastName: yup.string().required(),
//   cc: yup.number().positive().integer().required(),
//   phoneNumber: yup.string().required(),
//   email: yup.string().email().required()
// }).required();