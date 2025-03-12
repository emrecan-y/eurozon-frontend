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
import { Link } from "react-router-dom";
import { UserSchema } from "@/models/user";
import { Card } from "./ui/card";

type RegistrationForm = z.infer<typeof UserSchema>;

function RegisterPage() {
  const form = useForm<RegistrationForm>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = (data: RegistrationForm) => {
    console.log("User submitted:", data);
  };

  return (
    <Card className="mt-4 h-fit overflow-hidden py-4 md:mt-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-3 p-6 md:grid-cols-2 md:gap-4"
        >
          <div className="mb-4 flex flex-col items-center text-center md:col-span-2 md:mb-8">
            <h1 className="text-xl font-bold">Welcome to eurozon!</h1>
            <p className="text-muted-foreground text-balance">
              Create a new account
            </p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="md:col-span-2 md:w-full">
                <FormLabel>Email</FormLabel>
                <FormControl className="w-full">
                  <Input
                    className="w-full"
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
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Surname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Street" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.streetNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Number</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Street Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.town"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Town</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Town" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Postal Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input
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
            className="bg-primary-bg text-primary-text w-full rounded-lg py-2 md:col-span-2 md:my-4"
            type="submit"
          >
            Register
          </MotionButton>
          <div className="text-center text-sm md:col-span-2">
            Already have an account?{" "}
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
