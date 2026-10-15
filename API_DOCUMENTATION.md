# 🔌 API DOCUMENTATION — KRUSHI CONNECT

## Authentication & Users

### `GET /api/users`
Retrieves registered ecosystem accounts.

### `POST /api/auth/switch-role`
Switches active session role perspective (Farmer, Landowner, Worker, Buyer, Admin).

---

## Module 1: Land Leasing

### `GET /api/land`
Retrieves available land listings with location, size, soil type, and price filters.

### `POST /api/land`
Creates a new farmland property listing.

### `POST /api/leases/request`
Submits a lease proposal request from a farmer to a landowner.

### `PATCH /api/leases/:id`
Accepts or rejects a pending lease proposal.

---

## Module 2: Labour Community

### `GET /api/workers`
Retrieves worker profiles with skill and daily rate filters.

### `GET /api/jobs`
Retrieves active agricultural labour requirements.

### `POST /api/jobs`
Posts a new labour requirement.

### `POST /api/jobs/:id/apply`
Submits a worker application for a job.

---

## Module 3: Crop Demand Prediction

### `GET /api/crop-demand`
Retrieves crop demand scores and price trends.

### `POST /api/crop-recommendation`
Generates optimal crop recommendation based on land size, soil type, water supply, and season.

---

## Module 4: Crop Market & Storage

### `GET /api/produce`
Retrieves listed vegetables, fruits, and grains available for purchase.

### `POST /api/produce`
Lists harvest produce for sale.

### `GET /api/storage`
Retrieves cold storage and warehouse locations with capacity details.

---

## Module 5: ₹1 Scheme & Insurance

### `GET /api/schemes`
Retrieves government scheme details and ₹1 crop insurance enrollment guidance.

### `POST /api/schemes/apply`
Submits scheme guidance request.

---

## Module 6 & 7: Precision & Monitoring

### `GET /api/farms`
Retrieves active farm zones with soil N-P-K readings.

### `POST /api/tasks`
Creates a new cultivation task.

### `PATCH /api/tasks/:id/complete`
Toggles task completion status.
