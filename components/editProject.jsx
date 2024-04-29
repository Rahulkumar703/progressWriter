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
import { Edit, Trash } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "./ui/input";
import { updateProjectSchema } from "@/schema/project";
import { useRef, useTransition } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { deleteProject, updateProject } from "@/actions/project";
import { toast } from "sonner";
import Wrapper from "./wrapper";
import { useRouter } from "next/navigation";

const EditProject = ({ id, name, description, visibility }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef();
  const form = useForm({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      id: id,
      name: name,
      description: description,
      visibility: visibility,
    },
  });

  const handleDeleteProject = async () => {
    startTransition(async () => {
      try {
        const data = await deleteProject(id);
        toast[data.type](data.message);
        if (data.type === "success") {
          router.replace(`/`);
        }
      } catch (error) {
        toast.error(error.message);
      }
    });
  };

  const onSubmit = async (values) => {
    startTransition(async () => {
      try {
        const data = await updateProject(values);
        toast[data.type](data.message);
        if (data.type === "success") {
          const name = form.getValues("name");
          closeRef.current.click();
          router.replace(`/project/${name.replaceAll(" ", "+")}?id=${id}`);
          router.refresh();
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
              <div className="flex justify-between items-center">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      variant="destructive"
                      className=""
                      disabled={isPending}
                    >
                      <Trash className="w-4 h-4 mr-2" />
                      Delete Poject
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure to delete the project?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your project and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteProject}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button type="submit" className="" disabled={isPending}>
                  Update Poject
                  <MdKeyboardArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </Form>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" ref={closeRef}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </Wrapper>
      </DrawerContent>
    </Drawer>
  );
};

export default EditProject;
