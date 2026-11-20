# Mahesh Shukla – Fitness Portfolio Backend

Next.js (App Router) route handlers + Prisma + Neon Postgres. Deploys to Vercel as-is,
and the React frontend can live in the same project.

## Setup
1. `npm install`
2. `cp .env.example .env` and fill in the values
3. `npm run db:push`
4. `npm run dev`

## API
| Method | Route | Auth | Purpose |
|---|---|---|---|
| GET | `/api/profile` | – | Bio, achievements, socials, WhatsApp link |
| GET | `/api/testimonials` | – | Approved testimonials only |
| POST | `/api/leads` | – | Contact/enquiry form (validated, rate-limited, honeypot) |
| GET | `/api/admin/leads?status=NEW&cursor=` | Bearer | List enquiries |
| PATCH/DELETE | `/api/admin/leads/:id` | Bearer | Update status / delete |
| GET/POST/PATCH/DELETE | `/api/admin/testimonials` | Bearer | Manage testimonials |

Admin calls need `Authorization: Bearer <ADMIN_TOKEN>`.

### Lead form payload
```json
{
  "name": "Rahul Das",
  "phone": "+919876543210",
  "email": "rahul@example.com",
  "goal": "weight-management",
  "mode": "OFFLINE",
  "message": "Looking for morning batches",
  "website": ""
}
```
`website` is a hidden honeypot input: keep it in the form, leave it empty.

## Before going live
- Replace the Instagram link in `src/data/content.ts`
- Set `WHATSAPP_NUMBER` (digits with country code)
- Use a long random `ADMIN_TOKEN`
- In-memory rate limiting resets per serverless instance; use Upstash Redis for strict limits
