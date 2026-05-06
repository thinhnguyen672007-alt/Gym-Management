import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/auth/AuthPage';

function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (
        <div style={{ background: '#0D0D0D', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'sans-serif' }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Xin chào, {user.name}! 💪</h1>
                <p style={{ color: '#888' }}>Dashboard đang được xây dựng...</p>
                <button onClick={() => { localStorage.clear(); window.location.href = '/'; }}
                    style={{ marginTop: '24px', padding: '12px 24px', background: '#FF6B35', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>
                    Đăng xuất
                </button>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}