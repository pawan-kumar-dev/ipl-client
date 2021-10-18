import axios from "axios";
import * as Yup from "yup";

const stringRequired = Yup.string()
  .trim()
  .min(3, "Minimum 3 characters")
  .required("Required");

const numberRequired = Yup.number()
  .typeError("Enter number value")
  .positive("value should be greater than 0")
  .required("Required");

export const addPlayerValidation = Yup.object().shape({
  code: numberRequired,
  playerName: stringRequired,
  imageUri: stringRequired,
  from: Yup.string().trim().min(2, "Minimum 2 characters").required("Required"),
  price: numberRequired,
  description: stringRequired,
});

const instance = axios.create({
  baseURL: "http://localhost:8000", //api url
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
export default instance;
