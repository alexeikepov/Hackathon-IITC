// export async function getAllCourses() {
//   const res = await fetch("http://localhost:3001/api/courses", {
//     credentials: "include",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch courses");
//   }

//   return res.json();
// }

export async function getAllCourses() {
  return [
    {
      _id: "1",
      title: "Frontend Basics",
      description: "Learn HTML, CSS, and JavaScript",
    },
    {
      _id: "2",
      title: "React Advanced",
      description: "Dive into hooks, context, and performance",
    },
    {
      _id: "3",
      title: "Backend with Node.js",
      description: "REST API, MongoDB, and Authentication",
    },
  ];
}
