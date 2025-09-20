import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./shared/components/Layout";
import UserInfoPage from "./features/info";
import Mypage from "./features/mypage";
import Home from "./features/home";
import LoginPage from "./features/login/pages/LoginPage";
import LoginSuccessPage from "./features/login/pages/LoginSuccessPage";
import { Upload, DetailPost } from "./features/upload";

// Import route components
import ProtectedRoute from "./shared/components/ProtectedRoute";
import PublicRoute from "./shared/components/PublicRoute";
import { QuizPage, QuizNumber, QuizResult, QuizCommentary } from "./features/quiz";

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
            <Route path="/onboarding/user-info" element={<UserInfoPage mode="onboarding" />} />
            <Route path="/settings/user-info" element={<UserInfoPage mode="edit" />} />
            <Route path="/mypage/:userId" element={<Mypage />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/upload/:id" element={<DetailPost />} />


          </Route>

          {/* Standalone routes */}
          <Route path="/login/success" element={<LoginSuccessPage />} />


          {/* Catch-all for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/quiz/:quizId/q/:index" element={<QuizNumber />} />
          <Route path="/quiz/result" element={<QuizResult />} />
          <Route path="/quiz/:quizId/commentary/:num" element={<QuizCommentary />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
