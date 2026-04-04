# EAST MERIDIAN — Dev Notes

**Домен:** east-meridian.com
**Блог:** blog.east-meridian.com
**Дата начала:** 02 апреля 2026
**Последнее обновление:** 03 апреля 2026

---

## Часть 1: Обзор проекта

### Описание

East Meridian — корпоративный сайт-лендинг компании, предоставляющей бизнес-услуги в Китае «под ключ» для бизнеса из России и Казахстана. Логистика, склад, финансовые операции, сопровождение сделок, юридическая поддержка, услуги переводчика.

### Технологический стек

- **Frontend:** React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Создан в:** lovable.dev (AI-билдер)
- **Репозиторий:** github.com/kostanian/East-Meridian-site
- **Хостинг сайта:** Vercel (free tier)
- **Хостинг блога:** Hostinger WordPress hosting
- **Домен:** east-meridian.com (регистратор Namecheap)
- **DNS:** Namecheap BasicDNS
- **Редактор:** VS Code + Claude Code + GPT
- **Форма заявок:** Vercel Serverless Function → Telegram Bot API
- **Блог:** WordPress + тема Astra на blog.east-meridian.com

---

## Часть 2: Процесс развёртывания

### 2.1 Создание сайта на Lovable

Сайт создан через платформу lovable.dev — AI-билдер, который генерирует React-приложения на основе описания. Первоначальный URL: `road-hero-tracker.lovable.app` (автосгенерированное имя).

### 2.2 Подключение GitHub

В редакторе Lovable: Settings → Connectors → GitHub → Connect project. Авторизация lovable.dev в GitHub аккаунте kostanian. Создан репозиторий East-Meridian-site с двусторонней синхронизацией: правки в Lovable появляются в GitHub и наоборот.

### 2.3 Попытка GitHub Pages (неудачная)

- **URL:** https://kostanian.github.io/East-Meridian-site/
- **Проблема:** Пустая страница (blank page). Классическая проблема Vite + React SPA на GitHub Pages.
- **Причина:** GitHub Pages раздаёт сайт по пути /East-Meridian-site/, а Vite генерирует пути от корня /. JS и CSS файлы отдают 404.
- **Решение:** Отказ от GitHub Pages в пользу Vercel. Возможно было исправить через base path в vite.config.ts, но Vercel обрабатывает SPA корректно без дополнительных настроек.

### 2.4 Деплой на Vercel

1. Регистрация на vercel.com через GitHub (Continue with GitHub)
2. Add New → Project → Import репозитория East-Meridian-site
3. Vercel автоматически определил фреймворк (Vite) — никаких настроек менять не нужно
4. Нажат Deploy → сайт онлайн за ~60 секунд

- **Результат:** east-meridian-site.vercel.app — рабочий сайт
- **Автодеплой:** каждый git push в main автоматически деплоит новую версию за 30-60 секунд

### 2.5 Покупка домена

- **Регистратор:** Namecheap
- **Домен:** east-meridian.com
- **PremiumDNS:** Отказ от покупки. Причина: Vercel уже использует свой CDN с DDoS-защитой. Бесплатный DNS от Cloudflare быстрее Namecheap PremiumDNS. BasicDNS достаточно.

### 2.6 Привязка домена к Vercel

**В Vercel (Settings → Domains):**

1. Добавлен east-meridian.com с редиректом на www.east-meridian.com
2. Первая ошибка: «The domain you are trying to add is invalid» — причина: лишние символы / https:// в поле ввода. Решение: ввести только `east-meridian.com` без пробелов и протокола
3. Vercel выдал DNS-записи для настройки

**В Namecheap (Domain List → Manage → Advanced DNS):**

1. Удалены дефолтные записи
2. A Record: @ → 216.198.79.1 (Vercel IP)
3. CNAME Record: www → e805bfc259a6f442.vercel-dns-017.com.
4. Ошибка: попытка прописать в Nameservers вместо Advanced DNS. Нужно было именно Advanced DNS → Host Records

- **SSL:** Выпущен автоматически через Let's Encrypt
- **DNS-пропагация:** ~10-15 минут, после чего Valid Configuration в Vercel

### 2.7 Настройка локальной разработки

**Клонирование и запуск:**
```bash
git clone https://github.com/kostanian/East-Meridian-site.git
cd East-Meridian-site
npm install
npm run dev
```

- **Dev-сервер:** http://localhost:8080 (Vite hot reload)
- **Проблема с VS Code:** Команда `code` не найдена в терминале.
- **Решение:** VS Code → Cmd+Shift+P → Shell Command: Install 'code' command in PATH
- **AI-инструменты:** Claude Code + GPT (установлены как расширения VS Code)

### 2.8 Vercel Plugin для Claude Code

Установлен плагин Vercel для Claude Code:
```bash
npx plugins add vercel/vercel-plugin
```

Возможности: /deploy, /status, /env, /bootstrap, /marketplace. 47+ навыков, 3 агента (AI Architect, Deployment Expert, Performance Optimizer).

- **Телеметрия:** Отключена (промпты не отправляются)

### 2.9 Шорткат для деплоя

Создан git-алиас для быстрой публикации:
```bash
git config --global alias.deploy '!git add . && git commit -m "update" && git push'
```

Теперь вместо трёх команд — одна: `git deploy`

### 2.10 Исправление ошибки Git push (HTTP 400)

- **Проблема:** `error: RPC failed; HTTP 400` при пуше
- **Причина:** Накопленный размер изменений превысил дефолтный буфер Git (~1MB)
- **Решение:** `git config --global http.postBuffer 157286400` (разовая настройка)

---

## Часть 3: Блог на WordPress

### 3.1 Выбор платформы

WordPress на Hostinger WordPress hosting (отдельно от VPS). Автоустановка через hPanel, без ручной настройки Docker.

### 3.2 Подключение домена blog.east-meridian.com

**DNS (Namecheap Advanced DNS):**
- A Record: blog → 145.79.28.70 (IP Hostinger WordPress hosting)

**Верификация в Hostinger:**
- Hostinger предлагал два варианта: Nameservers (нельзя — сломает основной сайт) и DNS records (правильный путь)
- Выбран вариант "Use DNS records" → A Record для blog → 145.79.28.70

**SSL:**
- Первоначально ошибка ERR_SSL_PROTOCOL_ERROR
- Причина: SSL-сертификат ещё не выпустился (занимает 1-2 часа на Hostinger)
- Решение: подождать, сертификат установился автоматически

### 3.3 Тема WordPress

Выбрана **Astra** — лёгкая, быстрая, SEO-оптимизированная, бесплатная. 1.9 млн активных установок.

### 3.4 Связка с основным сайтом

В Navbar.tsx ссылка "Блог" (#blog) заменена на https://blog.east-meridian.com

---

## Часть 4: Форма заявок → Telegram

### 4.1 Архитектура

```
Клиент → форма на сайте → Vercel Serverless Function → Telegram Bot API → Telegram-чат
```

### 4.2 Создание бота

1. @BotFather → /newbot → получен токен
2. Написал боту /start → получил chat_id: ******** через `https://api.telegram.org/botTOKEN/getUpdates`

### 4.3 Environment Variables (Vercel)

В Vercel Settings → Environment Variables добавлены:
- `TELEGRAM_BOT_TOKEN` — токен бота (секретный)
- `TELEGRAM_CHAT_ID` — *********

Переменные зашифрованы, значения не видны даже владельцу после сохранения.

### 4.4 Серверная функция (api/send-lead.ts)

- Принимает POST с полями: name, telegram, email, message, файлы
- Валидация: обязательны имя и сообщение + хотя бы один способ связи (telegram или email)
- Берёт токен и chat_id из process.env
- Отправляет текст через sendMessage, файлы через sendDocument
- CORS-заголовки на всех ответах

### 4.5 Форма (LeadForm.tsx)

- Поля: имя (обязательно), Telegram, email, сообщение (обязательно)
- Если не заполнен telegram или email — модальное окно с просьбой заполнить + опция отправить без
- Загрузка файлов: до 10 файлов, общий размер до 4MB
- Блокировка опасных расширений: .exe, .bat, .cmd, .sh, .msi, .dll
- Три состояния: отправка, успех, ошибка

### 4.6 Локальная разработка

Для тестирования формы локально создан `.env` файл (в .gitignore, не попадает на GitHub):
```
TELEGRAM_BOT_TOKEN=реальный_токен
TELEGRAM_CHAT_ID=******
```

Dev-handler (`api/_dev-handler.ts`) подхватывает .env и проксирует запросы к серверной функции на localhost.

### 4.7 Почему серверная функция, а не напрямую

Если отправлять запрос в Telegram прямо из браузера — токен бота будет виден в коде страницы через DevTools. Серверная функция работает на стороне Vercel — клиент видит только `/api/send-lead`, а токен остаётся секретным.

---

## Часть 5: Оптимизация и безопасность

### 5.1 Очистка зависимостей

Удалено 20 неиспользуемых пакетов, установленных Lovable автоматически:
- react-router-dom, @tanstack/react-query, recharts, react-resizable-panels, embla-carousel-react, date-fns, react-day-picker, react-hook-form, @hookform/resolvers, zod, input-otp, cmdk, vaul, 8 пакетов @radix-ui/*
- Убран QueryClientProvider из App.tsx

### 5.2 Оптимизация картинок

Тяжёлые изображения (deal-support.jpg 1.6MB, legal.jpg 1.2MB, financial.jpg 1.2MB) конвертированы в WebP, уменьшены до 600-800px по ширине.

### 5.3 Фавикон

Сгенерирован кастомный фавикон — глобус с меридианами и компасной стрелкой (E) в сине-золотой гамме:
- favicon.svg — векторный
- favicon-32.png — для браузеров
- favicon.ico — классический формат
- apple-touch-icon.png — для iOS (180×180)

### 5.4 Security Headers (vercel.json)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

### 5.5 SEO мета-теги

Добавлены в index.html:
- `<link rel="canonical" href="https://east-meridian.com">`
- `<meta name="robots" content="index,follow">`
- `<meta name="description">` — для поисковиков
- `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale` — для шаринга в мессенджерах/соцсетях
- OG-image: брендовый баннер 1200×630px

---

## Часть 6: Архитектура

### Текущая схема

```
east-meridian.com / www.east-meridian.com → Vercel CDN → React SPA
blog.east-meridian.com → Hostinger (145.79.28.70) → WordPress + Astra
/api/send-lead → Vercel Serverless Function → Telegram Bot API
```

### DNS-записи (Namecheap Advanced DNS)

| Type | Host | Value | Назначение |
|------|------|-------|------------|
| A Record | @ | 216.198.79.1 | Vercel (основной сайт) |
| CNAME | www | e805bfc259a6f442.vercel-dns-017.com. | Vercel www |
| A Record | blog | 145.79.28.70 | WordPress (Hostinger) |

### Environment Variables (Vercel)

| Переменная | Назначение |
|-----------|------------|
| TELEGRAM_BOT_TOKEN | Токен Telegram-бота для формы заявок |
| TELEGRAM_CHAT_ID | ID чата для получения заявок |

---

## Часть 7: Рабочий процесс разработки

### Workflow

Редактирование кода в VS Code (с AI: Claude Code / GPT) → просмотр изменений на localhost:8080 → коммит и пуш в GitHub → Vercel автодеплой на east-meridian.com (30-60 сек).

### Команды

```bash
# Запуск локального сервера
cd ~/East-Meridian-site
npm run dev

# Быстрый деплой (шорткат)
git deploy

# Деплой с кастомным сообщением
git add .
git commit -m "описание изменений"
git push

# Проверка статуса
git status
```

### Важные правила

- Не править одновременно в Lovable и VS Code — будут конфликты
- `.env` файл только локально, на GitHub не попадает
- Токены и ключи хранить только в Vercel Environment Variables, не в коде

---

## Часть 8: Статус задач

### ✅ Выполнено

- Создание сайта на Lovable
- Подключение GitHub
- Деплой на Vercel
- Покупка домена (Namecheap)
- Привязка east-meridian.com к Vercel
- SSL-сертификат
- Локальная разработка (VS Code + AI)
- Vercel Plugin (Claude Code)
- Фавикон
- Форма заявок → Telegram (с файлами)
- Блог WordPress на blog.east-meridian.com
- SEO мета-теги / OG-image
- Security headers
- Оптимизация картинок (WebP)
- Очистка зависимостей (20 пакетов)
- Ссылка "Блог" в навигации → blog.east-meridian.com
- Телефон и email кликабельны

### 🔮 Возможные улучшения (будущее)

- Подключить Google Analytics / Yandex Metrika
- Добавить Google Search Console, отправить sitemap
- Настроить email на домене (info@east-meridian.com)
- Accessibility: aria-атрибуты для мобильного меню
- Вынести scrollTo в общий утилитный файл
- Мультиязычность (РУ/EN/中文) — если понадобится
- Дублирование заявок на email (помимо Telegram)
- sitemap.xml и robots.txt
