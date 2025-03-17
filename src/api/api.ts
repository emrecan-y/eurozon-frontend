import { Category } from "@/models/category";
import { Product, ProductQueryType } from "@/models/product";
import { LoginUserSchema } from "@/models/user";
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
    .get<Product[]>(destination)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
}

export async function tryLogin(data: Zod.infer<typeof LoginUserSchema>) {
  return axios
    .post<string>("/api/auth/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getMainCategories() {
  return axios
    .get<Category[]>("/categories/main")
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
}
