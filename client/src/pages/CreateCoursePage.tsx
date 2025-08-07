import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Loader2 } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const scheduleItem = z
  .object({
    day: z.string().min(1, "Day is required"),
    startHour: z.string(),
    endHour: z.string(),
    location: z.object({
      name: z.string(),
      lat: z.string(),
      lng: z.string(),
      radiusMeters: z.string(),
    }),
  })
  .refine((data) => data.startHour < data.endHour, {
    message: "Start time must be before end time",
    path: ["endHour"],
  });

const schema = z.object({
  title: z.string().min(1, "Title is too short"),
  description: z.string().min(1, "Description is too short"),
  syllabusLink: z.string().url("Must be a valid URL"),
  schedule: z.array(scheduleItem).min(1, "At least one schedule is required"),
});

type FormData = z.infer<typeof schema>;

function SortableScheduleItem({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-move"
    >
      {children}
    </div>
  );
}

export function CreateCoursePage() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      syllabusLink: "",
      schedule: [
        {
          day: "Monday",
          startHour: "09:00",
          endHour: "11:00",
          location: {
            name: "Room 204",
            lat: "32.0853",
            lng: "34.7818",
            radiusMeters: "50",
          },
        },
      ],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "schedule",
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch("http://localhost:3001/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create course");

      return res.json();
    },
    onSuccess: () => {
      setShowSuccess(true);
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);
    move(oldIndex, newIndex);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-8 space-y-8 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-border my-10">
        <h1 className="text-3xl font-bold text-center text-green-700 dark:text-green-400">
          Create New Course
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-2">
            <Label>Title</Label>
            <Input {...register("title")} placeholder="Course title" />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea
              {...register("description")}
              placeholder="About course..."
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Syllabus Link</Label>
            <Input {...register("syllabusLink")} placeholder="https://..." />
            {errors.syllabusLink && (
              <p className="text-sm text-red-500">
                {errors.syllabusLink.message}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Schedule
            </h3>

            <DndContext
              collisionDetection={closestCenter}
              sensors={sensors}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={fields.map((f) => f.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-6">
                  {fields.map((field, index) => (
                    <SortableScheduleItem key={field.id} id={field.id}>
                      <div className="border border-muted rounded-lg p-4 bg-muted/30 dark:bg-muted/10 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="flex flex-col gap-2">
                            <Label>Day</Label>
                            <Input {...register(`schedule.${index}.day`)} />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label>Start</Label>
                            <Input
                              type="time"
                              {...register(`schedule.${index}.startHour`)}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label>End</Label>
                            <Input
                              type="time"
                              {...register(`schedule.${index}.endHour`)}
                            />
                            {errors.schedule?.[index]?.endHour && (
                              <p className="text-sm text-red-500">
                                {errors.schedule[index]?.endHour?.message}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label>Location</Label>
                            <Input
                              {...register(`schedule.${index}.location.name`)}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label>Lat</Label>
                            <Input
                              type="number"
                              step="any"
                              {...register(`schedule.${index}.location.lat`)}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label>Lng</Label>
                            <Input
                              type="number"
                              step="any"
                              {...register(`schedule.${index}.location.lng`)}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label>Radius</Label>
                            <Input
                              type="number"
                              {...register(
                                `schedule.${index}.location.radiusMeters`
                              )}
                            />
                          </div>
                        </div>

                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => remove(index)}
                        >
                          Remove Schedule
                        </Button>
                      </div>
                    </SortableScheduleItem>
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            <Button
              type="button"
              variant="outline"
              className="mt-6"
              onClick={() =>
                append({
                  day: "",
                  startHour: "",
                  endHour: "",
                  location: {
                    name: "",
                    lat: "",
                    lng: "",
                    radiusMeters: "",
                  },
                })
              }
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Schedule
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full mt-6 text-lg"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Creating...
              </>
            ) : (
              "Create Course"
            )}
          </Button>
        </form>
      </div>

      <AlertDialog open={showSuccess}>
        <AlertDialogContent className="bg-white text-gray-900 dark:bg-zinc-900 dark:text-gray-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold">
              Course created successfully!
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setShowSuccess(false);
                navigate("/");
              }}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white"
            >
              Go to Dashboard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
