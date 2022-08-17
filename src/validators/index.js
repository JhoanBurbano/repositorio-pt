import * as yup from 'yup'
import { phoneNumber, onlyLetters } from './regex'

export const schema = yup.object({
    name: yup.string().matches(onlyLetters, 'solo se aceptan letras, minimo 3').required('Ingrese su nombre'),
    lastName: yup.string().matches(onlyLetters, 'solo se aceptan letras, minimo 3').required('Ingrese solo su apellido'),
    cc: yup.number().positive().integer('solo se aceptan numeros').min(8, 'debe tener minimo 8 numeros').required('Su documento de identidad es obligatorio'),
    phoneNumber: yup.string().matches(phoneNumber, 'El numero de telefono debe contener solo numeros, solo 10 digitos').length(10, 'El numero de telefono debe contener 10 numeros').required('El numero de telefono es requerido'),
    email: yup.string().email('Formato invalido, debe seguir el template: email@dominio.com').required('El email es obligatorio')
  }).required();