import { RootLayout } from "@/components/RootLayout";
import { SchedulePage } from "@/components/SchedulePage";
import { SyllabusPage } from "@/components/SyllabusPage";
import { CourseDetailsPage } from "@/pages/CourseDetailsPage";
import { CoursesPage } from "@/pages/CoursesPage";
import { CreateCoursePage } from "@/pages/CreateCoursePage";
import { DashboardPage } from "@/pages/DashboardPage";
import { ProtectRoutes } from "./protectedRoutes";

import LoginPage from "@/pages/login-page";
import RegistrationPage from "@/pages/register-page";
import { createBrowserRouter } from "react-router-dom";

export const Router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegistrationPage /> },

  {
    path: "/",
    element: <ProtectRoutes />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children: [
<<<<<<< HEAD
          { index: true, element: <DashboardPage /> },
=======

          { index: true, element: <DashboardPage /> },

>>>>>>> 71bc0ca92932c8d8fa23acbe07bd7c095d86251f
          { path: "/syllabus", element: <SyllabusPage /> },
          { path: "/schedule-page", element: <SchedulePage /> },
          { path: "create-course", element: <CreateCoursePage /> },
          { path: "/courses", element: <CoursesPage /> },
          { path: "/courses/:id", element: <CourseDetailsPage /> },
        ],
      },
    ],
  },
]);
