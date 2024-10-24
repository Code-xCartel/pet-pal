import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";

import { validateSession } from "./workflow";
import { ROUTES } from "@/constants/routes";

const ProtectedRoutes = () => {
  const [autoLoginCheck, setAutoLoginCheck] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated } = useAppSelector((state) => state.auth.login);

  useEffect(() => {
    if (!autoLoginCheck) {
      validateSession(dispatch).then(() => setAutoLoginCheck(true));
    }
  }, [dispatch, autoLoginCheck]);

  useEffect(() => {
    if (
      autoLoginCheck &&
      !isAuthenticated &&
      ![ROUTES.AUTH].includes(location.pathname)
    ) {
      navigate(ROUTES.AUTH, {
        replace: true,
        state: { from: location },
      });
    }
  }, [location, isAuthenticated, autoLoginCheck, navigate]);

  return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoutes;
