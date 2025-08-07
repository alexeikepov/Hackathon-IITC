export async function getAllCourses() {
  const res = await fetch("http://localhost:3001/api/courses", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  return res.json();
}

export async function unassignCourse(courseId: string) {
  const res = await fetch(
    `http://localhost:3001/api/courses/${courseId}/unassign`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to unassign course");
  }

  return res.json();
}
