import { Routes, Route, Navigate } from "react-router-dom";
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
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <NavBar />
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
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
      </main>
    </div>
  );
}
