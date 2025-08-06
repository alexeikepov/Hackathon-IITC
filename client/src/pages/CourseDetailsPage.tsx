import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User2, CalendarClock, FileText, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
    // queryFn: async () => {
    //   const res = await fetch(`http://localhost:3001/api/courses/${id}`, {
    //     credentials: "include",
    //   });
    //   if (!res.ok) throw new Error("Failed to fetch course");
    //   return res.json();
    // },
    queryFn: async () => {
      return {
        _id: "1",
        title: "Frontend Basics",
        description: "Learn HTML, CSS, and JavaScript from scratch.",
        students: [
          { _id: "s1", name: "Alice Johnson" },
          { _id: "s2", name: "Bob Smith" },
          { _id: "s3", name: "Charlie Lee" },
        ],
        materials: [
          { _id: "m1", title: "Intro to HTML" },
          { _id: "m2", title: "CSS Flexbox Cheatsheet" },
          { _id: "m3", title: "JavaScript Basics" },
        ],
        schedule: [
          {
            day: "Monday",
            startHour: "09:00",
            endHour: "11:00",
            location: {
              name: "Room A101",
              lat: 32.0853,
              lng: 34.7818,
              radiusMeters: 150,
            },
          },
          {
            day: "Thursday",
            startHour: "13:00",
            endHour: "15:00",
            location: {
              name: "Room B202",
              lat: 32.0861,
              lng: 34.7822,
              radiusMeters: 120,
            },
          },
        ],
      };
    },
    enabled: !!id,
  });

  if (isLoading) return <p className="text-center">Loading course...</p>;
  if (error || !course)
    return <p className="text-center text-red-500">Course not found.</p>;

  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <Button
        onClick={() => navigate("/courses")}
        variant="ghost"
        className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Courses
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>{course.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            {course.description}
          </p>

          <Tabs defaultValue="students" className="w-full">
            <TabsList className="flex justify-center gap-4 bg-muted/30 dark:bg-muted/10 p-2 rounded-xl shadow-inner mb-6">
              <TabsTrigger
                value="students"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-sm sm:text-base px-4 py-2 rounded-lg transition-all"
              >
                Students
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-sm sm:text-base px-4 py-2 rounded-lg transition-all"
              >
                Schedule
              </TabsTrigger>
              <TabsTrigger
                value="materials"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-sm sm:text-base px-4 py-2 rounded-lg transition-all"
              >
                Materials
              </TabsTrigger>
            </TabsList>

            <TabsContent value="students">
              {course.students?.length > 0 ? (
                <ul className="space-y-3">
                  {course.students.map((student) => (
                    <li
                      key={student._id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 dark:bg-muted/10 shadow-sm"
                    >
                      <User2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                        {student.name}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No students enrolled.</p>
              )}
            </TabsContent>

            <TabsContent value="schedule">
              {course.schedule?.length > 0 ? (
                <ul className="space-y-3">
                  {course.schedule.map((item, index) => (
                    <li
                      key={index}
                      className="p-3 rounded-lg bg-muted/40 dark:bg-muted/10 shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <CalendarClock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-semibold">
                          {item.day}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {item.startHour} – {item.endHour}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Location: {item.location.name}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No schedule available.</p>
              )}
            </TabsContent>

            <TabsContent value="materials">
              {course.materials?.length > 0 ? (
                <ul className="space-y-3">
                  {course.materials.map((material) => (
                    <li
                      key={material._id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 dark:bg-muted/10 shadow-sm"
                    >
                      <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="text-sm text-gray-800 dark:text-gray-100 font-medium">
                        {material.title}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No materials yet.</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
