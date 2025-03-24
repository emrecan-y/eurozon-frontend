import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import MotionButton from "./ui/MotionButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUserSchema } from "@/models/user";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { tryLogin } from "@/api/api";
import { toast } from "react-toastify";
import { useAuthUser } from "./hooks/useAuthUser";

function LoginPage() {
  const { setAccessToken } = useAuthUser();

  type LoginForm = z.infer<typeof LoginUserSchema>;
  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginUserSchema),
  });

  function setJwtCookie(accessToken: string) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    setAccessToken(accessToken, expirationDate);
  }

  const onSubmit = (loginDate: LoginForm) => {
    tryLogin(loginDate).then((accessToken) => {
      if (accessToken) {
        setJwtCookie(accessToken);
        toast.success("Erfolgreich eingeloggt.");
      }
    });
  };

  return (
    <Card className="mx-2 h-fit self-center overflow-hidden bg-primary-bg-2 py-4 text-primary-text-2 md:my-2">
      <Form {...form}>
        <form
          className="flex flex-col items-center gap-3 p-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-center text-center">
            <h1 className="text-xl font-bold">Wilkommen zurück!</h1>
            <p className="text-muted-foreground text-balance">
              Melden Sie sich an
            </p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="w-full bg-primary-bg-1 text-primary-text-1"
                    type="email"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Passwort</FormLabel>
                <FormControl>
                  <Input
                    className="w-full bg-primary-bg-1 text-primary-text-1"
                    type="password"
                    placeholder="Passwort"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <MotionButton
            type="submit"
            className="w-full rounded-lg bg-accent-2 py-2 text-primary-bg-2"
          >
            Login
          </MotionButton>
          <div className="text-center text-sm">
            Sie haben noch kein Account?{" "}
            <Link to="/register" className="underline underline-offset-4">
              Registrieren
            </Link>
          </div>
        </form>
      </Form>
    </Card>
  );
}
export default LoginPage;
