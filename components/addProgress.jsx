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
import { Plus } from "lucide-react";
import Wrapper from "./wrapper";
import { Textarea } from "./ui/textarea";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useRef, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { progressSchema } from "@/schema/progress";
import { addProgress } from "@/actions/progress";
import { toast } from "sonner";

const AddProgress = ({ projectId }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef();
  const form = useForm({
    resolver: zodResolver(progressSchema),
    defaultValues: {
      projectId,
      message: "",
    },
  });
  const onSubmit = async (values) => {
    startTransition(async () => {
      try {
        const data = await addProgress(values);
        toast[data.type](data.message);
        if (data.type === "success") {
          closeRef.current.click();
        }
      } catch (error) {
        toast.error(error.message);
      }
    });
  };
  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:block">Add Todays Progress</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <Wrapper>
            <DrawerHeader>
              <DrawerTitle>Add Your Project Progress</DrawerTitle>
              <DrawerDescription>
                Enter your project progress for today or this week. Include
                updates on completed tasks, milestones achieved, challenges
                faced, and plans for the upcoming period.
              </DrawerDescription>
            </DrawerHeader>

            <Form {...form}>
              <form
                autoComplete="off"
                autoSave="off"
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6 bg-background rounded-md w-full p-4"
              >
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Progress</FormLabel>
                      <FormControl>
                        <Textarea
                          autoComplete="none"
                          placeholder="Enter your project progress for today or this week."
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="" disabled={isPending}>
                  Add Progress
                  <MdKeyboardArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </Form>
            <DrawerFooter className={"pt-0"}>
              <DrawerClose asChild>
                <Button variant="outline" ref={closeRef}>
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </Wrapper>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AddProgress;
