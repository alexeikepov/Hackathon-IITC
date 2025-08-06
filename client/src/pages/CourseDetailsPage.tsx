import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Course = {
  _id: string;
  title: string;
  description: string;
  students: { _id: string; name: string }[];
  materials: { _id: string; title: string }[];
  schedule: {
    day: string;
    startHour: string;
    endHour: string;
    location: {
      name: string;
      lat: number;
      lng: number;
      radiusMeters: number;
    };
  }[];
};

export function CourseDetailsPage() {
  const { id } = useParams();

  const {
    data: course,
    isLoading,
    error,
  } = useQuery<Course>({
    queryKey: ["course", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/courses/${id}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch course");
      return res.json();
    },
    enabled: !!id,
  });

  if (isLoading) return <p className="text-center">Loading course...</p>;
  if (error || !course)
    return <p className="text-center text-red-500">Course not found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle>{course.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            {course.description}
          </p>

          <Tabs defaultValue="students" className="w-full">
            <TabsList className="grid grid-cols-3 w-full mb-4">
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
            </TabsList>

            <TabsContent value="students">
              <ul className="space-y-2">
                {course.students?.length > 0 ? (
                  course.students.map((student) => (
                    <li key={student._id} className="text-sm">
                      {student.name}
                    </li>
                  ))
                ) : (
                  <p className="text-muted-foreground">No students enrolled.</p>
                )}
              </ul>
            </TabsContent>

            <TabsContent value="schedule">
              {course.schedule?.length > 0 ? (
                <ul className="space-y-3">
                  {course.schedule.map((item, index) => (
                    <li key={index} className="text-sm">
                      <div>
                        <strong>{item.day}</strong>: {item.startHour} –{" "}
                        {item.endHour}
                      </div>
                      <div className="text-muted-foreground">
                        Location: {item.location.name}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No schedule available.</p>
              )}
            </TabsContent>

            <TabsContent value="materials">
              <ul className="space-y-2">
                {course.materials?.length > 0 ? (
                  course.materials.map((material) => (
                    <li key={material._id} className="text-sm">
                      {material.title}
                    </li>
                  ))
                ) : (
                  <p className="text-muted-foreground">No materials yet.</p>
                )}
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
