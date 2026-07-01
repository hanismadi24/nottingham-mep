import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { ServicesPage } from "./pages/ServicesPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { CareersPage } from "./pages/CareersPage";
import { InsightsPage } from "./pages/InsightsPage";
import CMSPage from "./pages/CMSPage";
import { ClientsPage } from "./pages/ClientsPage";
import { RootLayout } from "./components/RootLayout";
import  LoginPage  from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ No braces
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "projects/:projectId", element: <ProjectDetailPage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "careers", element: <CareersPage /> },
      { path: "insights", element: <InsightsPage /> },

      {
        path: "cms",
        element: (
          <ProtectedRoute>
            <CMSPage />
          </ProtectedRoute>
        ),
      },

      { path: "clients", element: <ClientsPage /> },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },
]);