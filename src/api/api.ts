import { Category } from "@/models/category";
import {
  PaginatedProductList,
  Product,
  ProductQueryType,
} from "@/models/product";
import { ShoppingCartPosition } from "@/models/shoppingcartPosition";
import { LoginUserSchema, RegisterUserSchema, User } from "@/models/user";
import { getCookie } from "@/util/util";
import { UUID } from "crypto";
import { updateShoppingCartPositionDto } from "./dtos/updateShoppingCartPositionDto";
import { Order } from "@/models/order";
import axios, { CancelToken } from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export async function getProducts(
  query: ProductQueryType & { cancelToken: CancelToken },
): Promise<PaginatedProductList> {
  return axios
    .get<PaginatedProductList>("/products", {
      params: {
        page: query?.page,
        category: query?.category,
        size: query?.size,
        searchString: query?.searchString,
      },
      cancelToken: query.cancelToken,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(
        error?.response?.data || "An unexpected error occurred.",
      );
    });
}

export async function getTopProducts(): Promise<Product[]> {
  return axios
    .get<Product[]>("/products/top-ten")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(
        error?.response?.data || "An unexpected error occurred.",
      );
    });
}

export async function getProductById(productId: UUID): Promise<Product> {
  return axios
    .get<Product>("/products/id", {
      params: {
        productId: productId,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(
        error?.response?.data || "An unexpected error occurred.",
      );
    });
}

export async function tryLogin(
  data: Zod.infer<typeof LoginUserSchema>,
): Promise<string> {
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
      return Promise.reject(
        error?.response?.data || "An unexpected error occurred.",
      );
    });
}

export async function register(
  data: Zod.infer<typeof RegisterUserSchema>,
): Promise<string> {
  return axios
    .post<string>("api/auth/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(
        error?.response?.data || "An unexpected error occurred.",
      );
    });
}

export async function getUser(): Promise<User> {
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
      return Promise.reject(
        error?.response?.data || "An unexpected error occurred.",
      );
    });
}

export async function getMainCategories(): Promise<Category[]> {
  return axios
    .get<Category[]>("/categories/main")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(
        error?.response?.data || "An unexpected error occurred.",
      );
    });
}

export async function getShoppingCartPositions(): Promise<
  ShoppingCartPosition[]
> {
  return axios
    .get<ShoppingCartPosition[]>("/cart", {
      headers: {
        Authorization: "Bearer " + getCookie("access_token"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(
        error?.response?.data || "An unexpected error occurred.",
      );
    });
}

export async function addShoppingCartPosition(
  dto: updateShoppingCartPositionDto,
): Promise<string> {
  return axios
    .post<string>("/cart", null, {
      params: dto,
      headers: {
        Authorization: "Bearer " + getCookie("access_token"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(
        error?.response?.data || "An unexpected error occurred.",
      );
    });
}

export async function removeShoppingCartPosition(
  productId: UUID,
): Promise<string> {
  return axios
    .delete<string>("/cart", {
      params: { productId },
      headers: {
        Authorization: "Bearer " + getCookie("access_token"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(
        error?.response?.data || "An unexpected error occurred.",
      );
    });
}

export async function updateShoppingCartPosition(
  dto: updateShoppingCartPositionDto,
): Promise<string> {
  return axios
    .put<string>("/cart", null, {
      params: dto,
      headers: {
        Authorization: "Bearer " + getCookie("access_token"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(
        error?.response?.data || "An unexpected error occurred.",
      );
    });
}

export async function addOrder(): Promise<string> {
  return axios
    .post<string>("/orders", null, {
      headers: {
        Authorization: "Bearer " + getCookie("access_token"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(
        error?.response?.data || "An unexpected error occurred.",
      );
    });
}

export async function getOrders(): Promise<Order[]> {
  return axios
    .get<Order[]>("/orders", {
      headers: {
        Authorization: "Bearer " + getCookie("access_token"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(
        error?.response?.data || "An unexpected error occurred.",
      );
    });
}
