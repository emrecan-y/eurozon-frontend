import { getMainCategories, getUser } from "@/api/api";
import { Category } from "@/models/category";
import { User } from "@/models/user";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, PropsWithChildren } from "react";

type QueryContextProviderType = {
  userQuery: UseQueryResult<void | User, unknown> | undefined;
  mainCategoriesQuery: UseQueryResult<void | Category[], unknown> | undefined;
};

export const QueryContext = createContext<QueryContextProviderType>({
  userQuery: undefined,
  mainCategoriesQuery: undefined,
});

export function QueryContextProvider({ children }: PropsWithChildren) {
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const mainCategoriesQuery = useQuery({
    queryKey: ["mainCategories"],
    queryFn: getMainCategories,
  });

  return (
    <QueryContext.Provider
      value={{ userQuery: userQuery, mainCategoriesQuery: mainCategoriesQuery }}
    >
      {children}
    </QueryContext.Provider>
  );
}
