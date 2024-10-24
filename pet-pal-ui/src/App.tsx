import { Route, Routes, useNavigate } from "react-router-dom";

import ProtectedRoutes from "./utils/auth/protectedRoutes";
import AuthLayout from "./pages/auth/authLayout";
import AppLayout from "./pages/layout";
import SubRouteGuard from "./utils/subRouteGuard";
import { Toaster } from "./components/ui/sonner";

import { routesConfig } from "./utils/routesConfig";
import { ROUTES } from "./constants/routes";
import { useEffect } from "react";
import { useAppSelector } from "./hooks/reduxHooks";

const App = () => {
  // const { isAuthenticated } = useAppSelector((state) => state.auth.login);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate(ROUTES.HOME, { replace: true });
  //   }
  // }, [location, isAuthenticated, navigate]);
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
