export async function getAllCourses() {
  const res = await fetch("http://localhost:3001/api/courses", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  return res.json();
}
