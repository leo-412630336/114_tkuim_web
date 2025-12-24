import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    📚 Book Inventory
                </Link>
                <div className="navbar-links">
                    {user ? (
                        <>
                            <span style={{ color: 'white', marginRight: '15px', fontWeight: 'bold' }}>
                                {user.username} <span className="badge bg-light text-dark" style={{ marginLeft: '5px', borderRadius: '4px', padding: '2px 6px', fontSize: '0.8em' }}>{user.role.toUpperCase()}</span>
                            </span>
                            <Link to="/" className="nav-link">首頁</Link>
                            {user.role === 'admin' && <Link to="/add" className="nav-link btn-primary">新增書籍</Link>}
                            <button onClick={logout} className="nav-link btn-secondary" style={{ border: 'none', cursor: 'pointer' }}>登出</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">登入</Link>
                            <Link to="/register" className="nav-link btn-primary">登記</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
