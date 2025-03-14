import { Product, ProductQueryType } from "@/models/product";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export async function getProducts(query?: ProductQueryType) {
  const params = new URLSearchParams();
  if (query) {
    if (query.page) {
      params.append("page", query.page.toString());
    }
    if (query.category) {
      params.append("category", query.category);
    }
    if (query.size) {
      params.append("size", query.size.toString());
    }
    if (query.searchString) {
      params.append("searchString", query.searchString);
    }
  }
  let destination = "/products";
  if (params.size > 0) {
    destination += "?" + params.toString();
  }
  return axios
    .get<Product[]>("/products")
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
}
