import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBook, getBook, updateBook } from '../services/api';

const AddEditBook = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        price: '',
        category: 'General',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchBook = async () => {
                setLoading(true);
                try {
                    const data = await getBook(id);
                    setFormData(data);
                } catch (err) {
                    setError('無法取得書籍詳情');
                } finally {
                    setLoading(false);
                }
            };
            fetchBook();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                await updateBook(id, formData);
            } else {
                await createBook(formData);
            }
            navigate('/');
        } catch (err) {
            setError('儲存失敗，請重試。');
        } finally {
            setLoading(false);
        }
    };

    if (loading && id) return <div className="container">載入中...</div>;

    return (
        <div className="container fade-in">
            <div className="form-container">
                <h2>{id ? '編輯書籍' : '新增書籍'}</h2>
                {error && <div className="alert alert-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>書名</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="請輸入書名"
                        />
                    </div>
                    <div className="form-group">
                        <label>作者</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                            placeholder="請輸入作者"
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>ISBN</label>
                            <input
                                type="text"
                                name="isbn"
                                value={formData.isbn}
                                onChange={handleChange}
                                required
                                placeholder="ISBN-13"
                            />
                        </div>
                        <div className="form-group">
                            <label>價格</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="1"
                                placeholder="0"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>分類</label>
                        <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="General">一般</option>
                            <option value="Fiction">小說</option>
                            <option value="Non-Fiction">非小說</option>
                            <option value="Science">科學</option>
                            <option value="Technology">科技</option>
                            <option value="History">歷史</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>描述</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="請輸入書籍描述"
                        ></textarea>
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">取消</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? '儲存中...' : (id ? '更新書籍' : '新增書籍')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditBook;
