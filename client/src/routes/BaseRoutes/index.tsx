import { HomePage } from "@/pages/HomePage";
import { CartPage } from "@/pages/CartPage";
import { LoginPage } from "@/pages/LoginPage";
import { ProductPage } from "@/pages/ProductPage"
import { FinalyPage } from "@/pages/FinalyPage"
import { UserSignupPage } from "@/pages/UserSignupPage";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes, PublicRoutes } from "../AuthenticatedRoutes";

export function BaseRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<UserSignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<PublicRoutes />}>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Route>

      <Route element={<AuthenticatedRoutes />}>
        {/* Protected Routes */}        
        <Route path="/finaly" element={<FinalyPage />} />
      </Route>
    </Routes>
  );
}
