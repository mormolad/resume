### Добавление примеров данных для REST API, WebSocket-событий и структуры базы данных

---

### **1. Примеры данных для REST API**

#### **1.1. Аутентификация пользователя**
**Эндпоинт:** `POST /api/auth/`  
**Описание:** Пользователь отправляет логин и пароль для получения JWT токенов.

**Пример запроса:**
```json
{
  "username": "teacher1",
  "password": "securepassword123"
}
```

**Пример ответа (HTTP 200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Пример ошибки (HTTP 401):**
```json
{
  "error": "Неверный логин или пароль"
}
```

---

#### **1.2. Получение списка пользователей**
**Эндпоинт:** `GET /api/users/`  
**Описание:** Администратор получает список всех пользователей.

**Пример ответа (HTTP 200):**
```json
[
  {
    "id": 1,
    "username": "admin",
    "role": "администратор"
  },
  {
    "id": 2,
    "username": "teacher1",
    "role": "преподаватель"
  },
  {
    "id": 3,
    "username": "student1",
    "role": "ученик"
  }
]
```

---

#### **1.3. Добавление неисправности**
**Эндпоинт:** `POST /api/faults/`  
**Описание:** Преподаватель добавляет неисправность в систему.

**Пример запроса:**
```json
{
  "type": "обрыв_кабеля",
  "description": "Короткое замыкание между фазами",
  "target": "Задвижка_1"
}
```

**Пример ответа (HTTP 201):**
```json
{
  "id": 123,
  "type": "обрыв_кабеля",
  "status": "активна",
  "timestamp": "2023-10-05T12:34:56Z"
}
```

---

#### **1.4. Получение метрик ученика**
**Эндпоинт:** `GET /api/metrics/`  
**Описание:** Преподаватель получает метрики конкретного ученика.

**Пример ответа (HTTP 200):**
```json
{
  "user_id": 3,
  "username": "student1",
  "metrics": [
    {
      "task": "Поиск обрыва кабеля",
      "errors": 2,
      "time_spent": "00:15:23"
    },
    {
      "task": "Диагностика концевого выключателя",
      "errors": 1,
      "time_spent": "00:10:45"
    }
  ]
}
```

---

#### **1.5. Запуск/остановка симуляции**
**Эндпоинт:** `POST /api/simulation/`  
**Описание:** Преподаватель запускает или останавливает симуляцию.

**Пример запроса:**
```json
{
  "action": "start"
}
```

**Пример ответа (HTTP 200):**
```json
{
  "status": "simulating",
  "message": "Симуляция успешно запущена"
}
```

---

### **2. Примеры данных для WebSocket-событий**

#### **2.1. Уведомление о неисправности**
**Описание:** Сервер отправляет уведомление о возникшей неисправности.

**Пример события:**
```json
{
  "event": "fault_detected",
  "data": {
    "type": "обрыв_кабеля",
    "description": "Короткое замыкание между фазами",
    "target": "Задвижка_1",
    "timestamp": "2023-10-05T12:34:56Z"
  }
}
```

---

#### **2.2. Лог действий ученика**
**Описание:** Сервер отправляет данные о действиях ученика в реальном времени.

**Пример события:**
```json
{
  "event": "user_action",
  "data": {
    "user_id": 3,
    "username": "student1",
    "action": "команда_открыть",
    "status": "ошибка",
    "timestamp": "2023-10-05T12:35:10Z"
  }
}
```

---

### **3. Примеры данных для структуры базы данных**

#### **3.1. Таблица пользователей (`users`)**
**Описание:** Хранит информацию о пользователях системы.

**Структура таблицы:**
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('администратор', 'преподаватель', 'ученик'))
);
```

**Пример данных:**
```json
[
  {
    "id": 1,
    "username": "admin",
    "password_hash": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
    "role": "администратор"
  },
  {
    "id": 2,
    "username": "teacher1",
    "password_hash": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
    "role": "преподаватель"
  }
]
```

---

#### **3.2. Таблица неисправностей (`faults`)**
**Описание:** Хранит информацию о неисправностях, добавленных преподавателем.

**Структура таблицы:**
```sql
CREATE TABLE faults (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    target VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('активна', 'устранена')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Пример данных:**
```json
[
  {
    "id": 1,
    "type": "обрыв_кабеля",
    "description": "Короткое замыкание между фазами",
    "target": "Задвижка_1",
    "status": "активна",
    "created_at": "2023-10-05T12:34:56Z"
  }
]
```

---

#### **3.3. Таблица метрик учеников (`metrics`)**
**Описание:** Хранит метрики выполнения задач учениками.

**Структура таблицы:**
```sql
CREATE TABLE metrics (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    task VARCHAR(255) NOT NULL,
    errors INTEGER NOT NULL,
    time_spent INTERVAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Пример данных:**
```json
[
  {
    "id": 1,
    "user_id": 3,
    "task": "Поиск обрыва кабеля",
    "errors": 2,
    "time_spent": "00:15:23",
    "created_at": "2023-10-05T12:40:00Z"
  }
]
```

---

#### **3.4. Таблица логов действий (`logs`)**
**Описание:** Хранит логи действий пользователей и системных событий.

**Структура таблицы:**
```sql
CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('успех', 'ошибка')),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Пример данных:**
```json
[
  {
    "id": 1,
    "user_id": 3,
    "action": "команда_открыть",
    "status": "ошибка",
    "timestamp": "2023-10-05T12:35:10Z"
  }
]
```

---

### **Заключение**
Добавленные примеры данных делают техническое задание более понятным и конкретным. Они помогут разработчикам быстрее реализовать функционал, а тестировщикам — проверить корректность работы системы.
