import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBooks, deleteBook, borrowBook, returnBook } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const data = await getBooks();
            setBooks(data);
            setLoading(false);
        } catch (err) {
            setError('無法取得書籍列表');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('確定要刪除這本書嗎？')) {
            try {
                await deleteBook(id);
                fetchBooks(); // Refresh list
            } catch (err) {
                alert('刪除失敗');
            }
        }
    };

    const handleBorrow = async (id) => {
        try {
            await borrowBook(id);
            fetchBooks();
        } catch (err) {
            alert(err.response?.data?.message || '借閱失敗');
        }
    };

    const handleReturn = async (id) => {
        try {
            await returnBook(id);
            fetchBooks();
        } catch (err) {
            alert(err.response?.data?.message || '還書失敗');
        }
    };

    if (loading) return <div className="container">載入中...</div>;
    if (error) return <div className="container error">{error}</div>;

    return (
        <div className="container fade-in">
            <header className="page-header">
                <h1>圖書清單</h1>
                <p>瀏覽與借閱圖書</p>
                {/* Identity Display for Home Page */}
                <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '8px', display: 'inline-block' }}>
                    目前登入身分: <strong>{user ? user.username : '訪客'}</strong>
                    <span style={{ marginLeft: '10px', padding: '4px 8px', backgroundColor: '#007bff', color: 'white', borderRadius: '4px', fontSize: '0.9em' }}>
                        {user ? user.role.toUpperCase() : 'GUEST'}
                    </span>
                </div>
            </header>

            {books.length === 0 ? (
                <div className="empty-state">
                    <p>目前沒有書籍。</p>
                    {user?.role === 'admin' && <Link to="/add" className="btn btn-primary">新增第一本書</Link>}
                </div>
            ) : (
                <div className="book-grid">
                    {books.map((book) => {
                        const isBorrowed = !!book.borrower;
                        const isBorrowedByMe = book.borrower && user && book.borrower._id === user.id;

                        return (
                            <div key={book._id} className="book-card" style={{ borderColor: isBorrowed ? '#ef4444' : '#22c55e' }}>
                                <div className="book-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span className="category-badge">{book.category}</span>
                                    <span className={`badge ${isBorrowed ? 'bg-danger' : 'bg-success'}`} style={{ color: 'white', padding: '4px 8px', borderRadius: '4px' }}>
                                        {isBorrowed ? '已被借出' : '在庫'}
                                    </span>
                                </div>
                                <div className="book-card-body">
                                    <h3>{book.title}</h3>
                                    <p className="author">作者: {book.author}</p>

                                    {/* Admin View: Show who borrowed it */}
                                    {user?.role === 'admin' && isBorrowed && (
                                        <div style={{ margin: '10px 0', padding: '5px', backgroundColor: '#fee2e2', borderRadius: '4px', color: '#b91c1c' }}>
                                            借閱者: <strong>{book.borrower.username}</strong>
                                        </div>
                                    )}

                                    <p className="price">價格: ${book.price}</p>
                                    <p className="isbn">ISBN: {book.isbn}</p>
                                </div>
                                <div className="book-card-footer">
                                    {/* Admin Actions */}
                                    {user?.role === 'admin' && (
                                        <>
                                            <Link to={`/edit/${book._id}`} className="btn btn-secondary">編輯</Link>
                                            <button onClick={() => handleDelete(book._id)} className="btn btn-danger">刪除</button>
                                        </>
                                    )}

                                    {/* Student Actions */}
                                    {user?.role === 'student' && (
                                        <>
                                            {!isBorrowed && (
                                                <button onClick={() => handleBorrow(book._id)} className="btn btn-primary">登記借閱</button>
                                            )}
                                            {isBorrowedByMe && (
                                                <button onClick={() => handleReturn(book._id)} className="btn btn-primary" style={{ backgroundColor: '#10b981' }}>還書</button>
                                            )}
                                            {isBorrowed && !isBorrowedByMe && (
                                                <button disabled className="btn btn-secondary" style={{ opacity: 0.6, cursor: 'not-allowed' }}>已被借出</button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Home;
