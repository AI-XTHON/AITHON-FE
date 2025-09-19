import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { handleLoginSuccess } from '../../../services/auth';

const LoginSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (handleLoginSuccess(searchParams)) {
            console.log('Tokens stored successfully!');
            navigate('/profile');
        } else {
            console.error('Login failed: No access token provided.');
            navigate('/login'); // Redirect to login page on failure
        }
    }, [searchParams, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#D9DDDF]">
            <p className="text-[#111827]">Login successful, redirecting...</p>
        </div>
    );
};

export default LoginSuccessPage;
