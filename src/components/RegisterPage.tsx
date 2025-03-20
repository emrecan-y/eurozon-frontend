import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MotionButton from "./ui/MotionButton";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUserSchema } from "@/models/user";
import { Card } from "./ui/card";
import { register } from "@/api/api";

type RegistrationForm = z.infer<typeof RegisterUserSchema>;

function RegisterPage() {
  const navigate = useNavigate();

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const onSubmit = (data: RegistrationForm) => {
    register(data).then((response) => {
      if (response) {
        navigate("/login");
      }
    });
  };

  return (
    <Card className="mx-2 mb-12 h-fit self-center overflow-hidden bg-primary-bg-2 py-4 text-primary-text-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full grid-cols-1 gap-3 p-6 md:grid-cols-2"
        >
          <div className="mb-2 flex flex-col items-center text-center md:col-span-2">
            <h1 className="text-xl font-bold">Welcome to eurozon!</h1>
            <p className="text-muted-foreground text-balance">
              Create a new account
            </p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full md:col-span-2 md:w-full">
                <FormLabel>Email</FormLabel>
                <FormControl className="w-full">
                  <Input
                    className="bg-primary-bg-1 text-primary-text-1"
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

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Passwort wiederholen</FormLabel>
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

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="w-full bg-primary-bg-1 text-primary-text-1"
                    type="text"
                    placeholder="Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nachname</FormLabel>
                <FormControl>
                  <Input
                    className="w-full bg-primary-bg-1 text-primary-text-1"
                    type="text"
                    placeholder="Nachname"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.street"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Straße</FormLabel>
                <FormControl>
                  <Input
                    className="w-full bg-primary-bg-1 text-primary-text-1"
                    type="text"
                    placeholder="Straße"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.streetNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Straßennummer</FormLabel>
                <FormControl>
                  <Input
                    className="w-full bg-primary-bg-1 text-primary-text-1"
                    type="text"
                    placeholder="Straßennummer"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.town"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Stadt</FormLabel>
                <FormControl>
                  <Input
                    className="w-full bg-primary-bg-1 text-primary-text-1"
                    type="text"
                    placeholder="Stadt"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.postalCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Postleitzahl</FormLabel>
                <FormControl>
                  <Input
                    className="w-full bg-primary-bg-1 text-primary-text-1"
                    type="text"
                    placeholder="Postleitzahl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.country"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Land</FormLabel>
                <FormControl>
                  <Input
                    className="w-full bg-primary-bg-1 text-primary-text-1"
                    type="text"
                    placeholder="Land"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Geburtsdatum</FormLabel>
                <FormControl>
                  <Input
                    className="w-full bg-primary-bg-1 text-primary-text-1"
                    type="date"
                    value={
                      field.value ? field.value.toISOString().split("T")[0] : ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <MotionButton
            className="w-full rounded-lg bg-accent-2 py-2 text-primary-bg-2 md:col-span-2"
            type="submit"
          >
            Registrieren
          </MotionButton>
          <div className="text-center text-sm md:col-span-2">
            Haben Sie bereits ein Account?{" "}
            <Link to="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </form>
      </Form>
    </Card>
  );
}

export default RegisterPage;
