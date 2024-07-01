import { NavBar } from "@/components/NavBar";
import { NavBarPublic } from "@/components/NavBarPublic";
import AuthService from "@/services/AuthService";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function AuthenticatedRoutes() {
  const isAthenticated = AuthService.isAuthenticaded();
  const location = useLocation();

  return isAthenticated ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export function PublicRoutes() {
  const isAthenticated = AuthService.isAuthenticaded();
  
  return isAthenticated ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : ( 
    <>
      <NavBarPublic />
      <Outlet />
    </>
  )
}
