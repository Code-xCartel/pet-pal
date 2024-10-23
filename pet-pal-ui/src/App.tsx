import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import ProtectedRoutes from "./utils/auth/protectedRoutes";
import AuthLayout from "./pages/auth/authLayout";
import AppLayout from "./pages/layout";
import SubRouteGuard from "./utils/subRouteGuard";

import { routesConfig } from "./utils/routesConfig";
import { ROUTES } from "./constants/routes";

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
