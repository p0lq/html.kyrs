import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAppointments, cancelAppointment } from '../services/api';

const fmt = d => { const [y,m,dd] = d.split('-'); return `${dd}.${m}.${y}`; };

export default function MyAppointments() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState(null);

  function load() {
    setLoading(true);
    getAppointments()
      .then(res => setList(res.data))
      .catch(() => setError('Не удалось загрузить записи'))
      .finally(() => setLoading(false));
  }
  useEffect(load, []);

  async function handleCancel(id) {
    if (!window.confirm('Отменить запись?')) return;
    setCancelling(id);
    try { await cancelAppointment(id); load(); }
    catch (err) { setError(err.response?.data?.message || 'Ошибка'); }
    finally { setCancelling(null); }
  }

  if (loading) return <div className="loader"><span className="spinner" /></div>;

  const active = list.filter(a => a.status === 'scheduled');
  const cancelled = list.filter(a => a.status === 'cancelled');

  return (
    <div className="container">
      <div className="section-header">
        <div>
          <div className="section-title">Мои записи</div>
          <div className="section-sub">Управляйте вашими приёмами</div>
        </div>
        <Link to="/appointments/new" className="btn btn-primary">+ Новая запись</Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {list.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">📋</div>
          <div className="empty-title">Записей нет</div>
          <div className="empty-sub">Запишитесь к врачу прямо сейчас</div>
          <Link to="/appointments/new" className="btn btn-primary">Записаться</Link>
        </div>
      ) : (
        <>
          {active.length > 0 && (
            <>
              <div className="group-label">Активные — {active.length}</div>
              <div className="appt-list">
                {active.map(a => (
                  <div key={a._id} className="appt-row">
                    <div style={{ fontSize: '1.8rem', opacity: .5 }}>{a.doctor?.photo}</div>
                    <div className="appt-body">
                      <div className="appt-name">{a.doctor?.name}</div>
                      <div className="appt-spec">{a.doctor?.specialty}</div>
                      <div className="appt-dt">{fmt(a.date)} · {a.time}</div>
                      {a.reason && <div className="appt-reason">{a.reason}</div>}
                    </div>
                    <span className="badge badge-active">Активна</span>
                    <button className="btn-outline" onClick={() => handleCancel(a._id)} disabled={cancelling === a._id}>
                      {cancelling === a._id ? '...' : 'Отменить'}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {cancelled.length > 0 && (
            <>
              <div className="group-label" style={{ marginTop: 32 }}>Отменённые — {cancelled.length}</div>
              <div className="appt-list">
                {cancelled.map(a => (
                  <div key={a._id} className="appt-row" style={{ opacity: .55 }}>
                    <div style={{ fontSize: '1.8rem', opacity: .4 }}>{a.doctor?.photo}</div>
                    <div className="appt-body">
                      <div className="appt-name">{a.doctor?.name}</div>
                      <div className="appt-spec">{a.doctor?.specialty}</div>
                      <div className="appt-dt">{fmt(a.date)} · {a.time}</div>
                    </div>
                    <span className="badge badge-cancelled">Отменена</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
