import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type Course = {
  _id: string;
  title: string;
  description: string;
  teacher?: string;
  students: string[];
};

export function DashboardPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

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
        `http://localhost:3001/api/users/${user?._id}/courses`,
        {
          courseId,
          studentId: user?._id,
        },
        { withCredentials: true }
      );

      setCourses((prev) =>
        prev.map((course) =>
          course._id === courseId
            ? {
                ...course,
                teacher: user?._id,
                students: [...new Set([...course.students, user!._id])],
              }
            : course
        )
      );
    } catch (err) {
      console.error("Failed to assign course", err);
    }
  };

  const handleConfirmDelete = async () => {
    if (!courseToDelete) return;

    try {
      await axios.delete(
        `http://localhost:3001/api/courses/${courseToDelete._id}`,
        { withCredentials: true }
      );

      setCourses((prev) => prev.filter((c) => c._id !== courseToDelete._id));
      setCourseToDelete(null);
    } catch (err) {
      console.error("Failed to delete course", err);
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
            className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md flex flex-col justify-between min-h-[220px]"
          >
            <div className="flex-1 space-y-2">
              <h2 className="text-xl font-semibold text-amber-500">
                {course.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {course.description}
              </p>
            </div>

            <div className="mt-auto flex justify-between items-center pt-4">
              {course.teacher === user?._id ? (
                <p className="text-green-600">✔ You are the teacher</p>
              ) : (
                <Button
                  onClick={() => handleAssign(course._id)}
                  variant="outline"
                  size="sm"
                >
                  Assign to me
                </Button>
              )}

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setCourseToDelete(course)}
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this course?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. It will permanently remove{" "}
                      <strong>{courseToDelete?.title}</strong>.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setCourseToDelete(null)}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmDelete}>
                      Yes, delete it
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
