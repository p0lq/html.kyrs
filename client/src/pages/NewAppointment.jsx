import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getDoctors, createAppointment } from '../services/api';

const SLOTS = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00'];
const today = () => new Date().toISOString().split('T')[0];

export default function NewAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ doctor: '', date: '', time: '', reason: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    getDoctors().then(res => {
      setDoctors(res.data);
      const pre = params.get('doctorId');
      if (pre) setForm(f => ({ ...f, doctor: pre }));
    }).catch(() => setError('Не удалось загрузить врачей'));
  }, [params]);

  function handle(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); setError(''); }

  async function submit(e) {
    e.preventDefault();
    if (!form.doctor || !form.date || !form.time) { setError('Выберите врача, дату и время'); return; }
    if (form.date < today()) { setError('Нельзя записаться на прошедшую дату'); return; }
    setLoading(true);
    try {
      await createAppointment(form);
      setSuccess('Запись создана!');
      setTimeout(() => navigate('/appointments'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при создании записи');
    } finally { setLoading(false); }
  }

  return (
    <div className="container form-page">
      <div className="form-wrap">
        <div className="form-title">Запись к врачу</div>
        <div className="form-sub">Заполните форму — запись займёт 2 минуты</div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={submit}>
          <div className="form-group">
            <label>Врач *</label>
            <select name="doctor" value={form.doctor} onChange={handle}>
              <option value="">— Выберите специалиста —</option>
              {doctors.map(d => (
                <option key={d._id} value={d._id}>{d.photo} {d.name} ({d.specialty})</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Дата *</label>
            <input type="date" name="date" min={today()} value={form.date} onChange={handle} />
          </div>
          <div className="form-group">
            <label>Время *</label>
            <select name="time" value={form.time} onChange={handle}>
              <option value="">— Выберите время —</option>
              {SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Причина обращения</label>
            <textarea name="reason" placeholder="Опишите жалобы или цель визита..." value={form.reason} onChange={handle} />
          </div>
          <button className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Создаём запись...' : 'Записаться'}
          </button>
        </form>
      </div>
    </div>
  );
}
