## Проект Freebie состоит из частей:

 - website - публичный сайт
 - server.api - бекенд сервер для api публичной (т.ч. мобильное пр.) и административной части
 - admin.webap - SPA приложение для администрирования проектом
 - client - библиотеки и информация для сайт и мобильного
 - core - библиотеки используемые во всех частях проекта
   - core/db - модели ORM, миграция

## Используемые библиотеки:

 - Ant - UI для админки [https://ant.design/](https://ant.design/)
 - Sequelize - ORM
 - postgrator - библиотека миграции

Поднять Базу:
core/db/README.md

Запустить линтер:
npm run eslint .

## Переменные окружения

Для настройки локальных переменных, создайте в корне репозитория файл .env, где можно прописать значения

```
STORE_PATH="/<path_to_>/store"
```

## Store
Пропишите в env api путь до стора и создайте каталоги
mkdir coupons

## Задачи по крону
*Website* (controllers/cron)
 - /cron/partner-rating - ежесуточный апдейт рейтинга партнёров
 - /cron/market-lots - ежесуточный чек истечения лотов на ТП
*Admin* (controllers/cron)
 - /cron/checks-expired - ежесуточно, проверка истечения серий чеков
 - /cron/partner-point-month-statistic - ежесуточно, сбор статистики по точкам

 curl http://127.0.0.1:3015/cron/checks-expired
 curl http://127.0.0.1:3015/cron/partner-point-month-statistic
 curl http://127.0.0.1:3015/cron/city-day-statistic
