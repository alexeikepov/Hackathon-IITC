import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";

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
  const { register, handleSubmit, control, reset } = useForm<CourseFormData>({
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
    reset();
  };

  return (
    <Card className="max-w-4xl mx-auto my-10 p-8 shadow-2xl border border-border bg-white dark:bg-slate-900">
      <CardHeader>
        <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-400">
          Create New Course
        </h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <Label className="text-base">Title</Label>
            <Input
              {...register("title")}
              placeholder="Enter course title"
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-base">Description</Label>
            <Textarea
              {...register("description")}
              placeholder="Brief course overview..."
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-base">Syllabus Link</Label>
            <Input
              type="url"
              {...register("syllabusLink")}
              placeholder="https://example.com/syllabus.pdf"
              className="mt-1"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Schedule
            </h3>
            <div className="space-y-6">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="rounded-xl border border-muted p-4 bg-muted/20 dark:bg-muted/5 space-y-4 shadow-sm"
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
                        placeholder="e.g., Room 204"
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
                    className="mt-2"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
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

          <Button type="submit" size="lg" className="w-full text-lg">
            Create Course
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
