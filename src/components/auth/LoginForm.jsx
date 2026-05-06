import { useState } from 'react';
import { motion } from 'framer-motion';
import { loginApi } from '../../utils/authApi';

export default function LoginForm({ onSwitch }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const err = {};
        if (!email || !/\S+@\S+\.\S+/.test(email)) err.email = 'Email không hợp lệ';
        if (!password) err.password = 'Vui lòng nhập mật khẩu';
        return err;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        const err = validate();
        if (Object.keys(err).length > 0) { setErrors(err); return; }
        setErrors({});
        setLoading(true);

        const data = await loginApi(email, password);
        setLoading(false);

        if (data.success) {
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', JSON.stringify(data.data.user));
            setMessage({ type: 'success', text: 'Đăng nhập thành công! Đang chuyển hướng...' });
            setTimeout(() => window.location.href = '/dashboard', 1200);
        } else {
            setMessage({ type: 'error', text: data.message });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
        >
            <h2 className="form-title">WELCOME BACK</h2>
            <p className="form-subtitle">Sign in to continue your journey</p>

            {message && (
                <div className={`auth-message show ${message.type}`}>{message.text}</div>
            )}

            <form onSubmit={handleSubmit} noValidate>
                <div className="input-group">
                    <label className="input-label">Email</label>
                    <div className="input-wrap">
                        <input
                            className={`auth-input ${errors.email ? 'error' : ''}`}
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    {errors.email && <div className="input-error show">{errors.email}</div>}
                </div>

                <div className="input-group">
                    <label className="input-label">Password</label>
                    <div className="input-wrap">
                        <input
                            className={`auth-input ${errors.password ? 'error' : ''}`}
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    {errors.password && <div className="input-error show">{errors.password}</div>}
                </div>

                <motion.button
                    className="btn-primary"
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {loading ? 'SIGNING IN...' : 'START TRAINING →'}
                </motion.button>
            </form>

            <div className="auth-divider">or continue with</div>

            <div className="social-btns">
                <button className="btn-social">G &nbsp; Google</button>
                <button className="btn-social">f &nbsp; Facebook</button>
            </div>

            <div className="auth-switch">
                New to GYM PRO?{' '}
                <button onClick={onSwitch}>Join Now</button>
            </div>
        </motion.div>
    );
}