# 🏥 МедЦентр — Система управления расписанием приёма

## Стек
| Часть | Технологии |
|---|---|
| Frontend | React + Vite, React Router v6, Axios |
| Backend | Node.js, Express.js |
| БД | MongoDB Atlas (Mongoose) |
| Авторизация | JWT + bcryptjs |

---

## 📁 Структура проекта

```
med-scheduler/
├── server/
│   ├── index.js              # Точка входа, подключение к MongoDB
│   ├── middleware/
│   │   └── auth.js           # JWT middleware
│   ├── models/
│   │   ├── User.js           # Схема пользователя
│   │   ├── Doctor.js         # Схема врача
│   │   └── Appointment.js    # Схема записи на приём
│   ├── routes/
│   │   ├── auth.js           # POST /register, POST /login, GET /me
│   │   ├── doctors.js        # GET /doctors, GET /doctors/:id
│   │   └── appointments.js   # CRUD записей
│   └── package.json
│
└── client/
    ├── index.html
    ├── vite.config.js
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx            # Роутинг, стейт пользователя
    │   ├── index.css          # Все стили
    │   ├── services/
    │   │   └── api.js         # Axios + JWT interceptor
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   └── Footer.jsx
    │   └── pages/
    │       ├── Home.jsx
    │       ├── Login.jsx
    │       ├── Register.jsx
    │       ├── Doctors.jsx
    │       ├── NewAppointment.jsx
    │       ├── MyAppointments.jsx
    │       └── NotFound.jsx
    └── package.json
```

---

## 🚀 Установка и запуск

### 1. Клонировать репозиторий
```bash
git clone https://github.com/p0lq/html.kyrs.git
cd html.kyrs
```

### 2. Настроить бэкенд
```bash
cd server
npm install
cp .env.example .env
# Открой .env и вставь свои данные:
# MONGO_URI=mongodb+srv://...  ← строка подключения из MongoDB Atlas
# JWT_SECRET=любой_секретный_ключ
# PORT=5000
npm run dev
```

### 3. Запустить фронтенд (в новом терминале)
```bash
cd client
npm install
npm run dev
# Откроется на http://localhost:5173
```

---

## 📡 API Эндпоинты

### Auth
| Метод | URL | Описание |
|---|---|---|
| POST | `/api/auth/register` | Регистрация `{ name, email, password, phone }` |
| POST | `/api/auth/login` | Вход `{ email, password }` |
| GET | `/api/auth/me` | Текущий пользователь (нужен токен) |

### Doctors
| Метод | URL | Описание |
|---|---|---|
| GET | `/api/doctors` | Все врачи |
| GET | `/api/doctors/:id` | Один врач |

### Appointments (требует Bearer token)
| Метод | URL | Описание |
|---|---|---|
| GET | `/api/appointments` | Мои записи |
| POST | `/api/appointments` | Создать `{ doctor, date, time, reason }` |
| PUT | `/api/appointments/:id` | Обновить запись |
| DELETE | `/api/appointments/:id` | Отменить запись |

---

## 🗓 Git-коммиты по дням (для преподавателя)

```bash
# День 1
git add . && git commit -m "init: project structure, server and client setup"

# День 2
git add . && git commit -m "feat: add auth routes — register, login, JWT middleware"

# День 3
git add . && git commit -m "feat: add mongoose models — User, Doctor, Appointment"

# День 4
git add . && git commit -m "feat: appointments CRUD — create, read, update, cancel"

# День 5
git add . && git commit -m "feat: React pages — Home, Doctors, NewAppointment, MyAppointments"

# День 6
git add . && git commit -m "feat: error handling, form validation, 404 page"

# День 7
git add . && git commit -m "docs: README, API docs, env example"
```

---

## 🔒 Безопасность
- Пароли хэшируются через `bcryptjs` (salt rounds: 10)
- Авторизация через JWT (срок 7 дней)
- Защищённые роуты на сервере через middleware
- Валидация на клиенте и сервере

## 🌐 Деплой
- **Frontend** → [Vercel](https://vercel.com) (подключить папку `client`)
- **Backend** → [Render.com](https://render.com) (подключить папку `server`, команда `node index.js`)
