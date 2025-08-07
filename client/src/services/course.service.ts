import axios from "axios";

export const getAllCourses = async () => {
  const response = await axios.get("http://localhost:3001/api/courses", {
    withCredentials: true,
  });
  return response.data;
};

export const getTeacherCourses = async (teacherId: string) => {
  const response = await axios.get(
    `http://localhost:3001/api/courses?teacher=${teacherId}`,
    { withCredentials: true }
  );
  return response.data;
};

export const unassignCourse = async (courseId: string) => {
  const response = await axios.patch(
    `http://localhost:3001/api/courses/${courseId}/unassign`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};
