import { getUser } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export function useUserQuery() {
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  return userQuery;
}
