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
  CardHeader,
  CardTitle,
} from "./ui/card";
import { setNewPasswordSchema } from "@/schema/auth";
import { updatePassword } from "@/actions/user";

const SetPasswordForm = ({ name, user, token }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(setNewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      user,
      token,
    },
  });
  const onSubmit = async (values) => {
    console.log(values);
    startTransition(async () => {
      try {
        const data = await updatePassword(values);
        console.log(data);
        toast[data.type](data.message);
        if (data.type === "success") {
          router.push("/auth/login");
        }
      } catch (error) {
        toast.error(error.message);
      }
    });
  };
  return (
    <Card className="shadow-2xl md:min-w-96">
      <CardHeader>
        <CardTitle className="capitalize">Hi, {name}</CardTitle>
        <CardDescription>Set a new strong password.</CardDescription>
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="******"
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
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="******"
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
              Update Password
              <MdKeyboardArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SetPasswordForm;
