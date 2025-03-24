import { getUser } from "@/api/api";
import { User } from "@/models/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type useAuthUserReturnType = {
  user: User | undefined;
  userIsLoading: boolean;
  setAccessToken: (accessToken: string, expires?: Date) => void;
  logout: () => void;
};

export function useAuthUser(): useAuthUserReturnType {
  const queryClient = useQueryClient();
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!cookies.access_token,
    onError: logout,
  });

  function setAccessToken(accessToken: string, expires?: Date) {
    setCookie("access_token", accessToken, { expires: expires });
    userQuery?.refetch();
    navigate("/");
  }

  function logout() {
    removeCookie("access_token");
    queryClient.clear();
    toast.error("Sie wurden abgemeldet.");
  }

  return {
    user: userQuery.data,
    userIsLoading: userQuery.isLoading,
    setAccessToken: setAccessToken,
    logout: logout,
  };
}
