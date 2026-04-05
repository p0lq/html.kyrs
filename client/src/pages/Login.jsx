import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handle(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); setError(''); }

  async function submit(e) {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Заполните все поля'); return; }
    setLoading(true);
    try {
      const res = await login(form);
      onLogin(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка входа');
    } finally { setLoading(false); }
  }

  return (
    <div className="container form-page">
      <div className="form-wrap">
        <div className="form-title">Вход</div>
        <div className="form-sub">Введите данные для входа в систему</div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={submit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="example@mail.ru" value={form.email} onChange={handle} />
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handle} />
          </div>
          <button className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Входим...' : 'Войти'}
          </button>
        </form>

        <div className="form-footer">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
}
