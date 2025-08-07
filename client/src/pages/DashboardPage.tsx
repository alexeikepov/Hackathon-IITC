import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

type Course = {
  _id: string;
  title: string;
  description: string;
  teacher?: string;
};

export function DashboardPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await axios.get("http://localhost:3001/api/courses", {
          withCredentials: true,
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    }

    fetchCourses();
  }, []);

  const handleAssign = async (courseId: string) => {
    try {
      await axios.patch(
        `http://localhost:3001/api/courses/${courseId}`,
        { teacherId: user?._id },
        { withCredentials: true }
      );

      setCourses((prev) =>
        prev.map((course) =>
          course._id === courseId ? { ...course, teacher: user?._id } : course
        )
      );
    } catch (err) {
      console.error("Failed to assign course", err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-700 dark:text-green-400">
        Welcome, {user?.name}!
      </h1>

      <div className="text-lg text-gray-700 dark:text-gray-300">
        Total <strong>{courses.length}</strong> courses available.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md"
          >
            <h2 className="text-xl font-semibold text-amber-500">
              {course.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {course.description}
            </p>

            {course.teacher === user?._id ? (
              <p className="text-green-600 mt-2">✔ You are the teacher</p>
            ) : (
              <Button
                onClick={() => handleAssign(course._id)}
                variant="outline"
                size="sm"
                className="mt-4"
              >
                Assign to me
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
