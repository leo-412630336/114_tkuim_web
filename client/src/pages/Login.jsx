import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api') + '/user';

function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/login`, formData);
            login(res.data.user, res.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
            <div className="form-container" style={{ padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>會員登入</h2>
                {error && <div className="alert alert-danger" style={{ padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.375rem', backgroundColor: '#fee2e2', color: '#ef4444' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3" style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>帳號</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
                            placeholder="請輸入帳號"
                        />
                    </div>
                    <div className="mb-3" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>密碼</label>
                        <input
                            type="password"
                            className="form-control"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
                            placeholder="請輸入密碼"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" style={{ width: '100%', padding: '0.75rem', fontSize: '1rem' }}>登入</button>
                </form>
                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    還沒有帳號？ <Link to="/register" style={{ color: '#6366f1', fontWeight: '500' }}>立即登記</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
