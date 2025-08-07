import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type Course = {
  _id: string;
  title: string;
  description: string;
};

const getUserCourses = async (userId: string) => {
  const res = await axios.get(
    `http://localhost:3001/api/users/${userId}/courses`,
    { withCredentials: true }
  );
  return res.data.courses;
};

export function CoursesPage() {
  const { user } = useAuth();

  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user-courses", user?._id],
    queryFn: () => getUserCourses(user!._id),
    enabled: !!user?._id,
  });

  if (isLoading) return <p className="text-center">Loading courses...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading courses</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {courses?.map((course: Course) => (
        <Link key={course._id} to={`/courses/${course._id}`}>
          <Card className="h-full min-h-[180px] flex flex-col justify-between bg-white dark:bg-slate-900 border border-border hover:shadow-xl hover:border-green-500 transition-all cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg text-green-700 dark:text-green-400">
                {course.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="line-clamp-4">{course.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
