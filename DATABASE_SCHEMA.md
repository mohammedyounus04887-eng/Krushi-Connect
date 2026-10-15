# 🗄 DATABASE SCHEMA — KRUSHI CONNECT

## Database Architecture Overview

Krushi Connect uses a relational data model structure.

```text
users (id, name, email, role, phone, location, avatar, rating)
  ├── lands (id, owner_id, title, location, size_acres, soil_type, rent_per_year, status)
  │    └── lease_requests (id, land_id, farmer_id, proposed_rent, duration_years, status)
  ├── workers (id, user_id, skills, daily_rate, availability, rating)
  ├── labour_jobs (id, farmer_id, crop, work_type, workers_needed, budget_per_day, status)
  │    └── labour_applications (id, job_id, worker_id, status)
  ├── produce (id, farmer_id, crop_name, category, quantity_kg, price_per_kg, quality, status)
  ├── farms (id, farm_name, acreage, crop, soil_moisture, soil_ph, nitrogen_n, phosphorus_p, potassium_k)
  │    ├── farm_tasks (id, farm_id, title, type, due_date, status, priority)
  │    └── farm_alerts (id, farm_id, type, title, message, severity)
  ├── messages (id, sender_id, receiver_id, content, timestamp, read)
  └── notifications (id, user_id, title, message, type, link, read)
```
