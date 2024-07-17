import axios from "axios";
export const productServices = {
  getProducts,
};
import { commonFunctions } from "../../utils/tostSetup";

const apiUrl = import.meta.env.VITE_API_URL;

async function getProducts() {
  let res = await axios
    .get(`${apiUrl}/product`)
    .then((response) => {
      if (response.data.status == "success") {
        commonFunctions.success("Fetch Products Success!");
        return response.data;
      }
      commonFunctions.success("Fetch Products Failed!");
    })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      commonFunctions.success("Fetch Products Failed!");
    });
  return res;
}
