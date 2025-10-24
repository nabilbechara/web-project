import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import NavBar from "./NavBar.jsx";
import Home from "./Home.jsx";
import BusinessesList from "./BusinessesList.jsx";
import BusinessDetail from "./BusinessDetail.jsx";
import BusinessForm from "./BusinessForm.jsx";
import WriteReview from "./WriteReview.jsx";
import UserReviews from "./UserReviews.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import NotFound from "./NotFound.jsx";
import { useData } from "./DataContext.jsx";

function ProtectedRoute({ children }) {
  const { currentUser } = useData();
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen text-gray-900 bg-gradient-aurora bg-aurora-overlay overflow-hidden">
      <NavBar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.99 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="p-4"
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/businesses" element={<BusinessesList />} />
            <Route
              path="/businesses/new"
              element={
                <ProtectedRoute>
                  <BusinessForm />
                </ProtectedRoute>
              }
            />
            <Route path="/businesses/:id" element={<BusinessDetail />} />
            <Route
              path="/businesses/:id/edit"
              element={
                <ProtectedRoute>
                  <BusinessForm isEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/businesses/:id/review"
              element={
                <ProtectedRoute>
                  <WriteReview />
                </ProtectedRoute>
              }
            />
            <Route path="/users/:id/reviews" element={<UserReviews />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
