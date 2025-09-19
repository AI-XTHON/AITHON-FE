import React from 'react';
import { login } from '../../../services/auth';

type Props = {
  onBack?: () => void;
  onEmailLogin?: () => void;
};

const LoginPage: React.FC<Props> = ({ onEmailLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#D9DDDF] p-6">
      {/* Top Bar - Removed as per instruction, assuming shared header */}

      {/* Content */}
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md gap-4">
        <button
          className="w-full h-12 rounded-lg bg-[#F36B2A] flex items-center justify-center shadow-md active:opacity-85"
          onClick={onEmailLogin}
        >
          <span className="text-white text-base font-bold">이메일 로그인</span>
        </button>

        <button
          className="w-full h-12 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center shadow-md active:opacity-85"
          onClick={login}
        >
          <div className="flex items-center gap-2">
            <img
              src="/google.png" // Assuming google.png is in the public folder
              alt="Google icon"
              className="w-5 h-5"
            />
            <span className="text-[#111827] text-base font-semibold">구글 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
