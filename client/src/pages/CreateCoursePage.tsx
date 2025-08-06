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

const schema = z.object({
  title: z.string().min(1, "Title is too short"),
  description: z.string().min(1, "Description is too short"),
  syllabusLink: z.url("Must be a valid URL"),
  schedule: z
    .array(
      z.object({
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
    )
    .min(1, "At least one schedule is required"),
});

type FormData = z.infer<typeof schema>;

export function CreateCoursePage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
   
defaultValues: {
  title: "Intro to Web Development",
  description: "A full introduction to web development covering frontend and backend basics.",
  syllabusLink: "https://example.com/syllabus.pdf",
  schedule: [
    {
      day: "Monday",
      startHour: "09:00",
      endHour: "11:00",
      location: {
        name: "Room 204 - Tech Campus",
        lat: "32.0853", // Tel Aviv latitude example
        lng: "34.7818", // Tel Aviv longitude example
        radiusMeters: "50", // Distance for GPS-based check-ins
      },
    },
  ],
}
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedule",
  });

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
    onSuccess: () => navigate("/courses"),
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-border my-10">
      <h1 className="text-3xl font-bold text-center text-green-700 dark:text-green-400">
        Create New Course
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <Label className="text-base">Title</Label>
          <Input
            {...register("title")}
            placeholder="Enter course title"
            className="mt-1"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <Label className="text-base">Description</Label>
          <Textarea
            {...register("description")}
            placeholder="Brief course overview..."
            className="mt-1"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Syllabus */}
        <div>
          <Label className="text-base">Syllabus Link</Label>
          <Input
            {...register("syllabusLink")}
            placeholder="https://example.com/syllabus"
            className="mt-1"
          />
          {errors.syllabusLink && (
            <p className="text-sm text-red-500">
              {errors.syllabusLink.message}
            </p>
          )}
        </div>

        {/* Schedule */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Schedule
          </h3>

          <div className="space-y-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border border-muted rounded-lg p-4 bg-muted/30 dark:bg-muted/10 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Day</Label>
                    <Input
                      {...register(`schedule.${index}.day`)}
                      placeholder="e.g., Monday"
                    />
                  </div>
                  <div>
                    <Label>Start Hour</Label>
                    <Input
                      type="time"
                      {...register(`schedule.${index}.startHour`)}
                    />
                  </div>
                  <div>
                    <Label>End Hour</Label>
                    <Input
                      type="time"
                      {...register(`schedule.${index}.endHour`)}
                    />
                  </div>
                  <div>
                    <Label>Location Name</Label>
                    <Input
                      {...register(`schedule.${index}.location.name`)}
                      placeholder="Room name"
                    />
                  </div>
                  <div>
                    <Label>Latitude</Label>
                    <Input
                      type="number"
                      step="any"
                      {...register(`schedule.${index}.location.lat`)}
                    />
                  </div>
                  <div>
                    <Label>Longitude</Label>
                    <Input
                      type="number"
                      step="any"
                      {...register(`schedule.${index}.location.lng`)}
                    />
                  </div>
                  <div>
                    <Label>Radius (meters)</Label>
                    <Input
                      type="number"
                      {...register(`schedule.${index}.location.radiusMeters`)}
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                  className="mt-2"
                >
                  Remove Schedule
                </Button>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            className="mt-6"
            onClick={() =>
              append({
                day: "",
                startHour: "",
                endHour: "",
                location: { name: "", lat: "", lng: "", radiusMeters: "" },
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
  );
}
