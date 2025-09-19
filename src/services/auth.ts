const API_URL = import.meta.env.VITE_API_BASE_URL || "localhost:8080";

export const login = () => {
    window.location.href = `${API_URL}/oauth2/authorization/google`;
};

export const logout = (navigate: any) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/');
};

export const handleLoginSuccess = (searchParams: URLSearchParams) => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
            window.location.href = '/onboarding/user-info';
        }
        return true;
    }
    return false;
};

export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        return false;
    }
    return true;
};
