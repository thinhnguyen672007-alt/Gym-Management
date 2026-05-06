import { useState } from 'react';
import { motion } from 'framer-motion';
import { registerApi } from '../../utils/authApi';

function PasswordStrength({ password }) {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const getClass = (i) => {
        if (score === 0) return '';
        if (score === 1) return i < 1 ? 'weak' : '';
        if (score === 2) return i < 2 ? 'medium' : '';
        if (score === 3) return i < 3 ? 'medium' : '';
        return 'strong';
    };

    return (
        <div className="strength-wrap">
            <div className="strength-bars">
                {[0,1,2,3].map(i => (
                    <div key={i} className={`strength-bar ${getClass(i)}`} />
                ))}
            </div>
            {password && <div className="strength-text">{labels[score] || 'Weak'}</div>}
        </div>
    );
}

export default function RegisterForm({ onSwitch }) {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

    const validate = () => {
        const err = {};
        if (!form.name.trim()) err.name = 'Vui lòng nhập họ tên';
        if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) err.email = 'Email không hợp lệ';
        if (!form.password || form.password.length < 6) err.password = 'Tối thiểu 6 ký tự';
        return err;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        const err = validate();
        if (Object.keys(err).length > 0) { setErrors(err); return; }
        setErrors({});
        setLoading(true);

        const data = await registerApi(form.name, form.email, form.password);
        setLoading(false);

        if (data.success) {
            setMessage({ type: 'success', text: 'Đăng ký thành công! Chuyển sang đăng nhập...' });
            setTimeout(() => onSwitch(), 2000);
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
            <h2 className="form-title">JOIN THE TEAM</h2>
            <p className="form-subtitle">Start your transformation today</p>

            {message && (
                <div className={`auth-message show ${message.type}`}>{message.text}</div>
            )}

            <form onSubmit={handleSubmit} noValidate>
                <div className="input-group">
                    <label className="input-label">Full Name</label>
                    <input
                        className={`auth-input ${errors.name ? 'error' : ''}`}
                        type="text"
                        placeholder="Nguyen Van A"
                        value={form.name}
                        onChange={update('name')}
                    />
                    {errors.name && <div className="input-error show">{errors.name}</div>}
                </div>

                <div className="input-group">
                    <label className="input-label">Email</label>
                    <input
                        className={`auth-input ${errors.email ? 'error' : ''}`}
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={update('email')}
                    />
                    {errors.email && <div className="input-error show">{errors.email}</div>}
                </div>

                <div className="input-group">
                    <label className="input-label">Password</label>
                    <input
                        className={`auth-input ${errors.password ? 'error' : ''}`}
                        type="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={update('password')}
                    />
                    {form.password && <PasswordStrength password={form.password} />}
                    {errors.password && <div className="input-error show">{errors.password}</div>}
                </div>

                <motion.button
                    className="btn-primary"
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {loading ? 'CREATING ACCOUNT...' : 'JOIN NOW →'}
                </motion.button>
            </form>

            <div className="auth-divider">or continue with</div>

            <div className="social-btns">
                <button className="btn-social">G &nbsp; Google</button>
                <button className="btn-social">f &nbsp; Facebook</button>
            </div>

            <div className="auth-switch">
                Already a member?{' '}
                <button onClick={onSwitch}>Sign In</button>
            </div>
        </motion.div>
    );
}