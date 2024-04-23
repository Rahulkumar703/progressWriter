"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { P } from "./ui/typography";
import SocialLogin from "./socialLogin";
import { loginSchema } from "@/schema/auth";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    startTransition(async () => {
      try {
        const data = await signIn("credentials", {
          redirect: false,
          ...values,
        });
        console.log(data);
        if (data?.error) {
          toast.error(data.error);
        } else {
          toast.success("Sigedin Successfully.");
          router.push("/");
        }
      } catch (error) {
        toast.error(error.message);
      }
    });
  };

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login with Credentials or use Social Account for Convinience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 bg-background rounded-md"
          >
            <div className="flex flex-col gap-6 ">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@demo.com"
                        {...field}
                        disabled={isPending}
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
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="ml-auto">
                <Link
                  href={`/auth/recover-password${
                    form.getValues("email") !== ""
                      ? `?email=${form.getValues("email")}`
                      : ""
                  }`}
                  className="text-blue-400 hover:underline"
                >
                  Forgot Password ?
                </Link>
              </div>
            </div>
            <Button type="submit" className="ml-auto" disabled={isPending}>
              Login
              <MdKeyboardArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="gap-2 flex-col border-t pt-6">
        <SocialLogin isPending={isPending} />

        <div className="mt-4">
          <P className={"flex items-center flex-wrap justify-center gap-1"}>
            Don&apos;t have an account?{" "}
            <Link
              href={"/create-account"}
              className="text-blue-400 hover:underline"
            >
              Create an Account
            </Link>
          </P>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
