import { NavLink, useNavigate } from 'react-router-dom';

export default function Header({ user, onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate('/');
  }

  return (
    <header className="header">
      <NavLink to="/" className="header-brand">
        🏥 МедЦентр
      </NavLink>

      <nav className="header-nav">
        <NavLink to="/" end className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
          Главная
        </NavLink>
        <NavLink to="/doctors" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
          Врачи
        </NavLink>
        {user && (
          <NavLink to="/appointments" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
            Мои записи
          </NavLink>
        )}
        {user ? (
          <>
            <span className="nav-user">👤 {user.name}</span>
            <button className="nav-btn" onClick={handleLogout}>Выйти</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
              Войти
            </NavLink>
            <NavLink to="/register">
              <button className="nav-btn">Регистрация</button>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
