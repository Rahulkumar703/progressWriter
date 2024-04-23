"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
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
import { updateProjectSchema } from "@/schema/project";
import { useTransition } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { updateProject } from "@/actions/project";
import { toast } from "sonner";
import Wrapper from "./wrapper";
import { useRouter } from "next/navigation";

const EditProject = ({ id, name, description, visibility }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(updateProjectSchema),
    mode: "onChange",
    defaultValues: {
      id: id,
      name: name,
      description: description,
      visibility: visibility,
    },
  });

  const onSubmit = async (values) => {
    startTransition(async () => {
      try {
        const data = await updateProject(values);
        toast[data.type](data.message);
        if (data.type === "success") {
          const name = form.getValues("name");
          router.replace(`/project/${name}?id=${id}`);
        }
      } catch (error) {
        toast.error(error.message);
      }
    });
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="ml-auto" size="icon" variant="secondary">
          <Edit className="w-4 h-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Wrapper>
          <DrawerHeader>
            <DrawerTitle>Update Project Information</DrawerTitle>
            <DrawerDescription>
              You can edit the name and description of the project here. Make
              sure to provide clear and concise details to help team members
              understand the project better.
            </DrawerDescription>
          </DrawerHeader>

          <Form {...form}>
            <form
              autoComplete="off"
              autoSave="off"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6 bg-background rounded-md w-full p-4"
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
                      <FormLabel>Project Description</FormLabel>
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
                Update Poject
                <MdKeyboardArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </Form>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </Wrapper>
      </DrawerContent>
    </Drawer>
  );
};

export default EditProject;
