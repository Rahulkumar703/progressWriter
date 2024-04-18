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
import { signupSchema } from "@/schema/auth";
import { signup } from "@/actions/user";

const SignupForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    startTransition(async () => {
      try {
        const data = await signup(values);
        toast.success("Account Created Successfully.");
        router.push("/login");
      } catch (error) {
        toast.error(error.message);
      }
    });
  };

  return (
    <Card className="shadow-2xl rounded-3xl">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>
          Create an Accoutn using email or use Social Account for Convinience
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
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
            </div>
            <Button type="submit" className="ml-auto" disabled={isPending}>
              Create Account
              <MdKeyboardArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="gap-2 flex-col border-t pt-6">
        <SocialLogin isPending={isPending} />
        <div className="mt-4">
          <P className={"flex items-center flex-wrap justify-center gap-1"}>
            Already have an account?{" "}
            <Link href={"/login"} className="text-blue-400 hover:underline">
              Login
            </Link>
          </P>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
