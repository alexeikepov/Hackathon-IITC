import { useQuery } from "@tanstack/react-query";
import { getAllCourses } from "@/services/course.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

type Course = {
  _id: string;
  title: string;
  description: string;
};

export function CoursesPage() {
  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
  });

  if (isLoading) return <p className="text-center">Loading courses...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading courses</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {courses?.map((course: Course) => (
        <Link key={course._id} to={`/courses/${course._id}`}>
          <Card className="hover:shadow-md transition cursor-pointer">
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {course.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
