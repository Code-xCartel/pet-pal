import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import { Toaster } from "sonner";
import ProtectedRoutes from "./utils/auth/protectedRoutes";
import AppLayout from "./pages/layout";
import { routesConfig } from "./utils/routesConfig";
import SubRouteGuard from "./utils/subRouteGuard";
import AuthLayout from "./pages/auth/authLayout";

const App = () => {
  return (
    <div className="">
      <Toaster />
      <Routes>
        <Route path={ROUTES.AUTH} element={<AuthLayout />} />
        <Route element={<ProtectedRoutes />}>
          <Route path={ROUTES.HOME} element={<AppLayout />}>
            {routesConfig.map(({ path, element, requiredSubscription }) => (
              <Route
                key={path}
                path={path}
                element={
                  <SubRouteGuard requiredSubscription={requiredSubscription}>
                    {element}
                  </SubRouteGuard>
                }
              />
            ))}
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
