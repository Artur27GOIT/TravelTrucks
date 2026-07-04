# TravelTrucks

Фронтенд для оренди кемперів - три сторінки: головна, каталог і детальна картка кемпера. Дані тягнуться з [campers-api.goit.study](https://campers-api.goit.study).

## Що реалізовано

- **/** - банер з фоновим зображенням і кнопкою *View Now*, яка веде в каталог
- **/catalog** - список кемперів, фільтри (локація, тип кузова, двигун, трансмісія), пагінація через *Load More* - по 4 картки за раз
- **/catalog/[camperId]** - повна інформація про кемпер, галерея на Swiper, відгуки зі зірками, форма бронювання

Фільтрація й пагінація працюють через бекенд (query-параметри). Для списку використовується `useInfiniteQuery` з TanStack Query. Кнопка *Show more* на картці відкриває деталі в новій вкладці.

## Стек

Next.js 14 (App Router), TypeScript, TanStack Query, CSS Modules, Swiper, React Icons, react-hot-toast.

## Запуск локально

```bash
npm install
npm run dev
```

Відкрий [http://localhost:3000](http://localhost:3000).

Продакшн-збірка:

```bash
npm run build
npm run start
```

## API

Базовий URL: `https://campers-api.goit.study`

- `GET /campers`- список (page, perPage, location, form, transmission, engine)
- `GET /campers/{id}`- один кемпер
- `GET /campers/{id}/reviews` - відгуки
- `GET /campers/filters` - значення для фільтрів
- `POST /campers/{id}/booking-requests` - бронювання (`name`, `email`)

## Автор

**Artur Furman**
