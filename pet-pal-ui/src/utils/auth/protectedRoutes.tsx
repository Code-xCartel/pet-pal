import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { validateSession } from "./workflow";
import { ROUTES } from "@/constants/routes";

const ProtectedRoutes = () => {
  const [autoLoginCheck, setAutoLoginCheck] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth.login
  );

  useEffect(() => {
    validateSession(dispatch).then(() => setAutoLoginCheck(true));
  }, [dispatch]);

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
  }, [location, isAuthenticated, navigate, autoLoginCheck]);

  return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoutes;
