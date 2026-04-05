import { Link } from 'react-router-dom';

export default function Home({ user }) {
  return (
    <div>
      <div className="hero">
        <div>
          <div className="hero-eyebrow">Медицинский центр — онлайн-запись</div>
          <h1>Ваше<br />здоровье.<br />Ваше время.</h1>
          <p>Записывайтесь к специалистам в любое время. Без очередей, без звонков.</p>
          <Link to={user ? '/appointments/new' : '/register'} className="btn-hero">
            {user ? 'Записаться сейчас' : 'Начать бесплатно'}
          </Link>
        </div>
        <div className="hero-icon">🏥</div>
      </div>

      <div className="container" style={{ paddingTop: 0 }}>
        <div className="stats">
          <div className="stat"><div className="stat-n">8</div><div className="stat-l">Специалистов</div></div>
          <div className="stat"><div className="stat-n">24/7</div><div className="stat-l">Онлайн-запись</div></div>
          <div className="stat"><div className="stat-n">100%</div><div className="stat-l">Бесплатно</div></div>
          <div className="stat"><div className="stat-n">0</div><div className="stat-l">Очередей</div></div>
        </div>

        <div className="cards-grid">
          {[
            { icon: '🩺', name: 'Специалисты', sub: 'Все врачи', meta: 'Выберите нужного специалиста', link: '/doctors', btn: 'Смотреть' },
            { icon: '📋', name: 'Мои записи', sub: 'Личный кабинет', meta: 'Управляйте своими приёмами', link: user ? '/appointments' : '/login', btn: 'Открыть' },
            { icon: '⚡', name: 'Быстрая запись',  sub: '2 минуты', meta: 'Запись без лишних шагов', link: user ? '/appointments/new' : '/register', btn: 'Записаться' },
            { icon: '⭐', name: 'Отзывы', sub: 'Наши пациенты', meta: 'Читайте отзывы о врачах', link: '/reviews', btn: 'Читать' },
          ].map(c => (
            <div key={c.name} className="card">
              <div className="card-icon">{c.icon}</div>
              <div className="card-name">{c.name}</div>
              <div className="card-sub">{c.sub}</div>
              <div className="card-meta">{c.meta}</div>
              <Link to={c.link} className="btn btn-primary" style={{ marginTop: 8 }}>{c.btn}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}