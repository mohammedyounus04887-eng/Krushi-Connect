# 🚀 DEPLOYMENT GUIDE — KRUSHI CONNECT

## Vercel Deployment (Recommended)

1. Push repository code to GitHub or GitLab.
2. Import project into Vercel Dashboard.
3. Vercel automatically detects Next.js framework settings.
4. Click **Deploy**.

---

## Self-Hosted Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
```

Build & run container:
```bash
docker build -t krushi-connect .
docker run -p 3000:3000 krushi-connect
```
