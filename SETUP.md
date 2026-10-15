# 🛠 SETUP GUIDE — KRUSHI CONNECT

## System Requirements

- **Node.js**: `v18.17.0` or higher (Recommended `v20.x`)
- **npm**: `v9.x` or higher
- **Modern Browser**: Chrome, Edge, Firefox, or Safari with WebGL enabled for 3D visualizer.

---

## Installation Steps

1. **Clone or Open Project Workspace Directory**:
   ```bash
   cd "c:/Users/moham/OneDrive/Desktop/KRUSHI CONNECT"
   ```

2. **Install Node Packages**:
   ```bash
   npm install
   ```

3. **Verify TypeScript & Syntax**:
   ```bash
   npm run typecheck
   ```

4. **Launch Development Server**:
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000`.

---

## Environment Configuration (`.env.local`)

```env
NEXT_PUBLIC_APP_NAME="Krushi Connect"
NEXT_PUBLIC_APP_TAGLINE="First Serve Farmers"
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000/api"
```
