"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { projectSchema } from "@/schema/project";
import { useTransition } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { H1 } from "./ui/typography";
import { Textarea } from "./ui/textarea";
import UserSelector from "./userSelector";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { addProject } from "@/actions/project";
import { toast } from "sonner";

const NewPojectForm = ({ loggedInUser, users }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(projectSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      members: [
        {
          _id: loggedInUser._id,
          admin: true,
          name: loggedInUser.name,
          email: loggedInUser.email,
          image: loggedInUser.image,
          fixed: true,
        },
      ],
      visibility: "private",
    },
  });

  const onSubmit = async (values) => {
    startTransition(async () => {
      try {
        const data = await addProject(values);
        toast[data.type](data.message);
        if (data.type === "success") {
          router.push(`/project/${data.project.name}?id=${data.project._id}`);
        }
      } catch (error) {
        toast.error(error.message);
      }
    });
  };
  return (
    <div className="flex flex-col gap-6 mt-5 pb-2">
      <H1 className={"my-5"}>Create a new Project</H1>
      <Form {...form}>
        <form
          autoComplete="off"
          autoSave="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 bg-background rounded-md w-full"
        >
          <div className="flex flex-col gap-6 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="none"
                      type="text"
                      placeholder="IIT Bombay PIB Poject"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description {`(optional)`}</FormLabel>
                  <FormControl>
                    <Textarea
                      autoComplete="none"
                      placeholder="Type some description about the project for new members."
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
              name="members"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Team Members {`(optional)`}</FormLabel>
                  <FormControl>
                    <UserSelector {...field} users={users} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Project Visibility</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="private" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Private
                          <FormDescription>
                            No users can request to join your project.
                          </FormDescription>
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="public" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Public
                          <FormDescription>
                            Users can request to join your project.
                          </FormDescription>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="ml-auto" disabled={isPending}>
            Create Poject
            <MdKeyboardArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewPojectForm;
