import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DummyPage from "./shared/pages/DummyPage";
import Layout from "./shared/components/Layout";
import UserInfoPage from "./features/info";
import Mypage from "./features/mypage";

// Import new pages
import LoginPage from "./features/login/pages/LoginPage";
import LoginSuccessPage from "./features/login/pages/LoginSuccessPage";

// Import route components
import ProtectedRoute from "./shared/components/ProtectedRoute";
import PublicRoute from "./shared/components/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DummyPage />} />
            <Route path="/onboarding/user-info" element={<UserInfoPage mode="onboarding" />} />
            <Route path="/settings/user-info" element={<UserInfoPage mode="edit" />} />
            <Route path="/mypage" element={<Mypage />} />
          </Route>

          {/* Standalone routes */}
          <Route path="/login/success" element={<LoginSuccessPage />} />

          {/* Catch-all for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
