---
sidebar_position: 2
sidebar_label: 30 Days SQL Challenge
title: 30 Days SQL Challenge
description: HCMUTE DSC's 30-day SQL course on PostgreSQL 16, with one shared dataset, real query results and exercises with solutions.
keywords: [sql, postgresql, learn sql, sql course, hcmute dsc]
---

# 🗄️ 30 Days SQL Challenge

Learn SQL one lesson a day, from your first `SELECT` to query optimization and database security. The course is for club members and anyone who wants to **understand and actually use** SQL in real projects. The lessons are written in Vietnamese.

:::tip Start learning

👉 **[sql-challenge.hcmute-dsc.io.vn](https://sql-challenge.hcmute-dsc.io.vn/)** — all lessons, diagrams and exercises.

Source code and practice data: [github.com/hcmute-dsc/sql-challenge](https://github.com/hcmute-dsc/sql-challenge)

:::

## What you get

- **One database system:** the whole course uses PostgreSQL 16. Where the syntax differs from MySQL or SQL Server, the lesson says so.
- **One dataset throughout:** **DSC Shop**, a tech store with 7 tables that deliberately contains NULLs and messy data, like the real world. Plus 1 million orders for the performance lessons.
- **Real results:** every result table and timing in the lessons comes from actually running the query on PostgreSQL.
- **Exercises at 3 levels with solutions:** basic, applied and challenge. Solutions are hidden so you can try first.
- **Capstone project:** design and build a complete database, graded with a 100-point rubric together with club mentors.

![ERD of the DSC Shop dataset: 7 tables categories, products, customers, employees, orders, order_items, payments and the foreign keys between them](../../../../docs/img/erd-dsc-shop.png#gh-light-mode-only)
![ERD of the DSC Shop dataset: 7 tables categories, products, customers, employees, orders, order_items, payments and the foreign keys between them](../../../../docs/img/erd-dsc-shop-dark.png#gh-dark-mode-only)

## The 30-day roadmap

| Stage | Days | Topics |
| --- | --- | --- |
| **1. Foundations** | 1–7 | Setup, tables and constraints, `SELECT`/`WHERE` and NULL, sorting and paging, string and date functions, safe inserts/updates/deletes |
| **2. Aggregating and combining** | 8–14 | Aggregate functions, `GROUP BY`/`HAVING`, `JOIN`, subqueries and CTEs, `UNION`/`INTERSECT`/`EXCEPT`, `CASE` and reports |
| **3. Indexes, transactions, DB objects** | 15–21 | Indexes, transactions and isolation levels, functions/procedures, triggers, views, reading `EXPLAIN` |
| **4. SQL in practice** | 22–30 | JSONB, connecting from applications, CSV import/export, partitioning, SQL vs NoSQL, database design, query optimization, window functions and recursive queries, security |

Days 7, 14 and 21 are reviews. After the 30 days comes the capstone project.

## Get started in 3 steps

You need [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```bash
# 1. Clone the repo
git clone https://github.com/hcmute-dsc/sql-challenge.git
cd sql-challenge

# 2. Start PostgreSQL with the data preloaded (plus Adminer at http://localhost:8080)
docker compose up -d

# 3. Open psql and write SQL
docker compose exec db psql -U postgres -d sql_challenge
```

Not using Docker? See [installing PostgreSQL directly](https://sql-challenge.hcmute-dsc.io.vn/setup/README). Then open the [30-day roadmap](https://sql-challenge.hcmute-dsc.io.vn/lessons/00-30-day-sql-learning-roadmap) and start with Day 1.

## Learning with the club

- Questions about a lesson: open an issue or discussion on the [course repository](https://github.com/hcmute-dsc/sql-challenge).
- Found a mistake: click "Sửa trang này trên GitHub" (edit this page on GitHub) at the bottom of any lesson to send a pull request.
