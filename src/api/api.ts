import { Category } from "@/models/category";
import { Product, ProductQueryType } from "@/models/product";
import { ShoppingCartPosition } from "@/models/shoppingcartPosition";
import { LoginUserSchema, RegisterUserSchema, User } from "@/models/user";
import { getCookie } from "@/util/util";
import axios from "axios";
import { UUID } from "crypto";
import { updateShoppingCartPositionDto } from "./dtos/updateShoppingCartPositionDto";
import { Order } from "@/models/order";

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
    .then((response) => response.data.products)
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

export async function register(data: Zod.infer<typeof RegisterUserSchema>) {
  return axios
    .post<string>("api/auth/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        true;
      }
      return false;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

export async function getUser() {
  return axios
    .get<User>("/api/auth/who-am-i", {
      headers: {
        Authorization: "Bearer " + getCookie("access_token"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });
}

export async function getMainCategories() {
  return axios
    .get<Category[]>("/categories/main")
    .then((response) => response.data)
    .catch((error) => {
      return null;
    });
}

export const getShoppingCartPositions = async (): Promise<
  ShoppingCartPosition[]
> => {
  const response = await axios.get<ShoppingCartPosition[]>("/cart", {
    headers: {
      Authorization: "Bearer " + getCookie("access_token"),
    },
  });
  return response.data;
};

export async function addShoppingCartPosition(
  dto: updateShoppingCartPositionDto,
) {
  const response = await axios.post<ShoppingCartPosition>("/cart", null, {
    params: dto,
    headers: {
      Authorization: "Bearer " + getCookie("access_token"),
    },
  });
  return response.data;
}

export async function removeShoppingCartPosition(productId: UUID) {
  const response = await axios.delete("/cart", {
    params: { productId },
    headers: {
      Authorization: "Bearer " + getCookie("access_token"),
    },
  });
  return response.data;
}

export async function updateShoppingCartPosition(
  dto: updateShoppingCartPositionDto,
) {
  const response = await axios.put<ShoppingCartPosition>("/cart", null, {
    params : dto,
    headers: {
      Authorization: "Bearer " + getCookie("access_token"),
    },
  });
  return response.data;
}

export async function addOrder() {
  const response = await axios.post<Order>("/orders", null ,{
    headers: {
      Authorization: "Bearer " + getCookie("access_token"),
    },
  });
  return response.data;
}

export const getOrders = async (): Promise<
  Order[]
> => {
  const response = await axios.get<Order[]>("/orders", {
    headers: {
      Authorization: "Bearer " + getCookie("access_token"),
    },
  });
  return response.data;
};