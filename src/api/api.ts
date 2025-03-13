import { Product } from "@/models/product";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export async function getProducts() {
  return axios
    .get<Product[]>("/products")
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
}
