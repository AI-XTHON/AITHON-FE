import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./shared/components/Layout";
import UserInfoPage from "./features/info";
import Mypage from "./features/mypage";
import Home from "./features/home";
import { Upload, DetailPost } from "./features/upload";

// 컴포넌트 테스트 페이지
import DummyPage from "./shared/pages/DummyPage";


function App() {
  function isLoggedIn() {
    const token = localStorage.getItem("accessToken");
    return !!token;
  }
  return (

    <BrowserRouter>
      <Layout>
        <Routes>
          {/* 비 보호 경로 작성 */}
          <Route path="/login" element={""} />
          {/* <Route path="/oauth/google/redirect" element={<AuthCallbackPage />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/onboarding/user-info" element={<UserInfoPage mode="onboarding" />} />
          <Route path="/settings/user-info" element={<UserInfoPage mode="edit" />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/dummy" element={<DummyPage />} />
          <Route path="/upload" element={<Upload />} />\
          <Route path="/upload/:id" element={<DetailPost />} />

          <Route
            path="/"
            element={isLoggedIn() ? <Outlet /> : <Navigate to="/login" replace />}
          >
            {/* 보호 경로 작성 */}
          </Route>

          {/* 알 수 없는 경로 처리 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
