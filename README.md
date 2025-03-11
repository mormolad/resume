### **Техническое задание на разработку тренажёра**
#### **1. Общие требования**
- **Стек технологий:**
  - Backend: Python + FastAPI/Django
  - База данных: PostgreSQL
  - Реальное время: WebSocket
  - Контейнеризация: Docker

- **Основные функции:**
  - Реализация REST API для управления тренажёром.
  - Поддержка WebSocket для обновления данных в реальном времени.
  - Аутентификация и авторизация с использованием JWT (JSON Web Tokens).
  - Логирование действий пользователей и системных событий.

---

#### **2. REST API**
##### **Основные эндпоинты**

| **Ресурс**          | **Метод** | **Описание**                                      | **Доступ**         |
|----------------------|-----------|--------------------------------------------------|--------------------|
| `/api/auth/`         | POST      | Аутентификация пользователя (логин/пароль)       | Все                |
| `/api/users/`        | GET       | Получить список пользователей                    | Администратор      |
| `/api/users/`        | POST      | Создать нового пользователя                      | Администратор      |
| `/api/faults/`       | POST      | Добавить неисправность                           | Преподаватель      |
| `/api/metrics/`      | GET       | Получить метрики ученика (ошибки, время выполнения) | Преподаватель      |
| `/api/simulation/`   | POST      | Запустить/остановить симуляцию                   | Преподаватель      |

---

#### **3. WebSocket**
##### **События в реальном времени**
- **Уведомление о неисправности:**
  - Отправка данных о возникшей неисправности (например, "обрыв кабеля").
- **Лог действий ученика:**
  - Отправка данных о действиях ученика в реальном времени (например, нажатие кнопок, выполнение задач).

---

#### **4. Аутентификация и авторизация**
- **JWT-токены:**
  - Аутентификация через `/api/auth/` (возвращает `access_token` и `refresh_token`).
  - Защита эндпоинтов с использованием декораторов (например, `@role_required("преподаватель")`).

- **Роли и права:**
  - **Администратор:** Полный доступ ко всем функциям.
  - **Преподаватель:** Управление неисправностями, просмотр метрик учеников.
  - **Ученик:** Отправка действий в симуляцию.

---

#### **5. База данных (PostgreSQL)**
- **Основные сущности:**
  - Пользователи (роли: администратор, преподаватель, ученик).
  - Неисправности (описание, статус, время возникновения).
  - Метрики учеников (ошибки, время выполнения задач).
  - Логи действий пользователей.

---

#### **6. Обработка неисправностей**
- **Логика симуляции:**
  - При активации неисправности (например, "обрыв кабеля") данные передаются через WebSocket.
  - Возможность ручного добавления неисправностей преподавателем.

---

#### **7. Безопасность**
- **Меры защиты:**
  - Использование параметризованных запросов для предотвращения SQL-инъекций.
  - Валидация входных данных с использованием Pydantic.
  - Настройка CORS-политик.
  - Ограничение частоты запросов (Rate Limiting).

---

#### **8. Инфраструктура**
- **Docker:**
  - Создание `Dockerfile` для контейнеризации приложения.
  - Настройка `docker-compose.yml` для запуска приложения и PostgreSQL.
- **CI/CD:**
  - Настройка автоматического тестирования и деплоя через GitLab CI.

---

#### **9. Дополнительные требования**
- **Документация:**
  - Swagger/OpenAPI для REST API.
  - Описание WebSocket-событий.
- **Тестирование:**
  - Unit-тесты для критических сценариев (например, обработка команд задвижки).
  - Интеграционные тесты для WebSocket.

---

#### **10. Логирование**
- **Логи действий пользователей:**
  - Запись всех действий пользователей (например, вход в систему, добавление неисправностей).
- **Системные логи:**
  - Запись ошибок и важных системных событий.

---

#### **11. Деплой и поддержка**
- **Деплой:**
  - Развертывание приложения на сервере с использованием Docker.
- **Поддержка:**
  - Настройка мониторинга и алертинга для отслеживания состояния системы.

---

Этот документ представляет собой структурированное техническое задание, которое можно использовать для разработки тренажёра с указанными требованиями.
