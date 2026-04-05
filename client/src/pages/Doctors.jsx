import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/doctors')
      .then(res => {
        console.log('doctors:', res.data);
        setDoctors(res.data);
      })
      .catch(err => {
        console.error(err);
        setError('Не удалось загрузить список врачей');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loader"><span className="spinner" /></div>;

  return (
    <div className="container">
      <div className="section-header">
        <div>
          <div className="section-title">Специалисты</div>
          <div className="section-sub">Выберите врача и запишитесь на приём</div>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="cards-grid">
        {doctors.map(doc => (
          <div key={doc._id} className="card">
            <div className="card-icon">{doc.photo}</div>
            <div className="card-name">{doc.name}</div>
            <div className="card-sub">{doc.specialty}</div>
            <div className="card-meta">Опыт: {doc.experience}</div>
            <Link to={`/appointments/new?doctorId=${doc._id}`} className="btn btn-primary" style={{ marginTop: 10 }}>
              Записаться
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}