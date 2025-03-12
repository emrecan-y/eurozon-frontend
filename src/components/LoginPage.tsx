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

function LoginPage() {
  type LoginForm = z.infer<typeof LoginUserSchema>;

  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginUserSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log("User submitted:", data);
  };

  return (
    <Card className="mt-20 h-fit overflow-hidden py-4 sm:mt-32">
      <Form {...form}>
        <form
          className="flex flex-col gap-3 p-6 md:gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-center text-center">
            <h1 className="text-xl font-bold">Welcome back to eurozon!</h1>
            <p className="text-muted-foreground text-balance">
              Login to your account
            </p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
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
          <MotionButton
            type="submit"
            className="bg-primary-bg text-primary-text w-full rounded-lg py-2"
          >
            Login
          </MotionButton>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </Card>
  );
}
export default LoginPage;
