import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  syllabusLink: z.string().url(),
  schedule: z
    .array(
      z.object({
        day: z.string(),
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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      schedule: [
        {
          day: "",
          startHour: "",
          endHour: "",
          location: {
            name: "",
            lat: "",
            lng: "",
            radiusMeters: "",
          },
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "schedule",
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch("http://localhost:3001/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to create course");
      }

      return res.json();
    },
    onSuccess: () => {
      navigate("/courses");
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Create New Course</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input {...register("title")} />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label>Description</Label>
          <Textarea {...register("description")} />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div>
          <Label>Syllabus Link</Label>
          <Input {...register("syllabusLink")} />
          {errors.syllabusLink && (
            <p className="text-sm text-red-500">
              {errors.syllabusLink.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <Label>Schedule</Label>
          {fields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded-md space-y-2">
              <Input placeholder="Day" {...register(`schedule.${index}.day`)} />
              <div className="flex gap-2">
                <Input
                  placeholder="Start Hour"
                  {...register(`schedule.${index}.startHour`)}
                />
                <Input
                  placeholder="End Hour"
                  {...register(`schedule.${index}.endHour`)}
                />
              </div>
              <Input
                placeholder="Location Name"
                {...register(`schedule.${index}.location.name`)}
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Lat"
                  {...register(`schedule.${index}.location.lat`)}
                />
                <Input
                  placeholder="Lng"
                  {...register(`schedule.${index}.location.lng`)}
                />
                <Input
                  placeholder="Radius Meters"
                  {...register(`schedule.${index}.location.radiusMeters`)}
                />
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              append({
                day: "",
                startHour: "",
                endHour: "",
                location: { name: "", lat: "", lng: "", radiusMeters: "" },
              })
            }
          >
            Add Schedule
          </Button>
        </div>

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create Course"}
        </Button>
      </form>
    </div>
  );
}
