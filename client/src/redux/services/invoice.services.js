import axios from "axios";
import { commonFunctions } from "../../utils/tostSetup";

export const invoiceServices = {
  createinvoice,
};
const apiUrl = import.meta.env.VITE_API_URL;

async function createinvoice(data) {
  const response = await axios.post(`${apiUrl}invoice`, data);
  if (response.data.status == "success") {
    commonFunctions.success("Invoice Created Success!");
  } else {
    commonFunctions.warning("Invoice Creation Failed!");
  }
  return response;
}
