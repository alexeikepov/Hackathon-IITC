import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

type Course = {
  _id: string;
  title: string;
  description: string;
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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-700 dark:text-green-400">
        Welcome, {user?.name}!
      </h1>

      <div className="text-lg text-gray-700 dark:text-gray-300">
        You have <strong>{courses.length}</strong> courses.
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
          </div>
        ))}
      </div>
    </div>
  );
}
