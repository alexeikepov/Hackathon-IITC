import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

type CourseFormData = {
  title: string;
  description: string;
  syllabusLink: string;
  schedule: {
    day: string;
    startHour: string;
    endHour: string;
    location: {
      name: string;
      lat: string;
      lng: string;
      radiusMeters: string;
    };
  }[];
};

export function CreateCourseForm() {
  const { register, handleSubmit, control } = useForm<CourseFormData>({
    defaultValues: {
      schedule: [
        {
          day: "",
          startHour: "",
          endHour: "",
          location: { name: "", lat: "", lng: "", radiusMeters: "" },
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedule",
  });

  const onSubmit = (data: CourseFormData) => {
    console.log("Creating course:", data);
  };

  return (
    <Card className="max-w-4xl mx-auto my-10 p-6">
      <CardHeader>
        <h2 className="text-2xl font-bold">Create New Course</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label>Title</Label>
            <Input {...register("title")} />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea {...register("description")} />
          </div>
          <div>
            <Label>Syllabus Link</Label>
            <Input type="url" {...register("syllabusLink")} />
          </div>

          <div>
            <h3 className="font-semibold text-lg mt-4">Schedule</h3>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 p-4 border rounded-lg"
              >
                <div>
                  <Label>Day</Label>
                  <Input {...register(`schedule.${index}.day`)} />
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
                  <Input {...register(`schedule.${index}.location.name`)} />
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
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>
            ))}

            <Button
              type="button"
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

          <Button type="submit" className="w-full">
            Create Course
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
