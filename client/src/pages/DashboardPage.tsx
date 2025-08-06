import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { arrayMove } from "@dnd-kit/sortable";

type Course = {
  _id: string;
  title: string;
  description: string;
};

const STORAGE_KEY = "dashboard_course_order";

function SortableCourseItem({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="cursor-move"
    >
      {children}
    </div>
  );
}

export function DashboardPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await axios.get("http://localhost:3001/api/courses", {
          withCredentials: true,
        });

        const storedOrder = localStorage.getItem(STORAGE_KEY);
        const data: Course[] = res.data;

        if (storedOrder) {
          const order = JSON.parse(storedOrder) as string[];
          const sorted = order
            .map((id) => data.find((c) => c._id === id))
            .filter(Boolean) as Course[];

          const remaining = data.filter((c) => !order.includes(c._id));
          setCourses([...sorted, ...remaining]);
        } else {
          setCourses(data);
        }
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    }

    fetchCourses();
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = courses.findIndex((c) => c._id === active.id);
    const newIndex = courses.findIndex((c) => c._id === over.id);
    const newOrder = arrayMove(courses, oldIndex, newIndex);

    setCourses(newOrder);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(newOrder.map((c) => c._id))
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-700 dark:text-green-400">
        Welcome, {user?.name}!
      </h1>

      <div className="text-lg text-gray-700 dark:text-gray-300">
        You have <strong>{courses.length}</strong> courses.
      </div>

      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={courses.map((c) => c._id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <SortableCourseItem key={course._id} id={course._id}>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold text-amber-500">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {course.description}
                  </p>
                </div>
              </SortableCourseItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
