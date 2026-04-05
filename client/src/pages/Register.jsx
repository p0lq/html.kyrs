import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/api';

export default function Register({ onLogin }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handle(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); setError(''); }

  async function submit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('Заполните обязательные поля'); return; }
    if (form.password.length < 6) { setError('Пароль — минимум 6 символов'); return; }
    if (form.password !== form.confirm) { setError('Пароли не совпадают'); return; }
    setLoading(true);
    try {
      const res = await register({ name: form.name, email: form.email, phone: form.phone, password: form.password });
      onLogin(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка регистрации');
    } finally { setLoading(false); }
  }

  return (
    <div className="container form-page">
      <div className="form-wrap">
        <div className="form-title">Регистрация</div>
        <div className="form-sub">Создайте аккаунт для записи к врачу</div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={submit}>
          <div className="form-group">
            <label>Имя *</label>
            <input name="name" placeholder="Иван Петров" value={form.name} onChange={handle} />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input type="email" name="email" placeholder="example@mail.ru" value={form.email} onChange={handle} />
          </div>
          <div className="form-group">
            <label>Телефон</label>
            <input name="phone" placeholder="+7 (777) 000-00-00" value={form.phone} onChange={handle} />
          </div>
          <div className="form-group">
            <label>Пароль *</label>
            <input type="password" name="password" placeholder="Минимум 6 символов" value={form.password} onChange={handle} />
          </div>
          <div className="form-group">
            <label>Повторите пароль *</label>
            <input type="password" name="confirm" placeholder="••••••••" value={form.confirm} onChange={handle} />
          </div>
          <button className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Создаём...' : 'Создать аккаунт'}
          </button>
        </form>

        <div className="form-footer">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </div>
      </div>
    </div>
  );
}
