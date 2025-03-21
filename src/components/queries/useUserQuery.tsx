import { getUser } from "@/api/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useUserQuery() {
  const queryClient = useQueryClient();
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    onError: () => {
      queryClient.clear();
      toast.error("Sie wurden abgemeldet.");
    },
  });
  return userQuery;
}
