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
import { recoverPasswordSchema } from "@/schema/auth";
import { sendPasswordResetLink } from "@/actions/user";

const RecoverPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(recoverPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values) => {
    startTransition(async () => {
      try {
        const data = await sendPasswordResetLink(values);
        console.log(data);
        toast[data.type](data.message);
        if (data.type === "success") {
          // router.push("/auth/login");
        }
      } catch (error) {
        toast.error(error.message);
      }
    });
  };

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle>Recover Password</CardTitle>
        <CardDescription>
          Enter registered email to get password reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 bg-background rounded-md w-full xs:w-96"
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
            </div>
            <Button type="submit" className="ml-auto" disabled={isPending}>
              Send Link
              <MdKeyboardArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RecoverPasswordForm;
