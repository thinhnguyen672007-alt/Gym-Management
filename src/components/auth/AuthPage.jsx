import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import '../../styles/auth.css';

export default function AuthPage() {
    const [mode, setMode] = useState('login');

    return (
        <div className="auth-page">

            {/* LEFT — HERO */}
            <div className="auth-hero">
                <div className="auth-hero-bg" />
                <div className="auth-hero-content">
                    <div className="hero-tag">🔥 #1 Gym Platform</div>
                    <h1 className="hero-headline">
                        PUSH YOUR<br />
                        <span>LIMITS</span>
                    </h1>
                    <p className="hero-sub">
                        Join thousands of athletes transforming their bodies and minds every single day.
                    </p>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <div className="stat-num">12K+</div>
                            <div className="stat-label">Members</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-num">98%</div>
                            <div className="stat-label">Satisfaction</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-num">5★</div>
                            <div className="stat-label">Rating</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT — FORM */}
            <div className="auth-form-side">
                <div className="auth-logo">GYM <span>PRO</span></div>

                <AnimatePresence mode="wait">
                    {mode === 'login'
                        ? <LoginForm key="login" onSwitch={() => setMode('register')} />
                        : <RegisterForm key="register" onSwitch={() => setMode('login')} />
                    }
                </AnimatePresence>
            </div>

        </div>
    );
}