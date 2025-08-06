import {
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "./context/ThemeProvider";
import { Router } from "./route/router";


function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
          <RouterProvider router={Router} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
