# Atinlang Media Upload

This is a personal project for uploading and hosting media.

It is built using React and Node.js and utilizes CloudFlare R2 for storage. Database has been switched from SQLite to PostgreSQL.

## To-do list

- Polish user interface and error states.
- Implement accounts and associate uploads for each account.
- Add albums available for registered accounts.
- Add video with limited support.
- Add video encoding to increase support.

## Running a local copy

This includes both frontend and backend applications managed by pnpm. You will also need to supply your own API keys.

```bash
# Copy contents of .env.example to .env
copy ./apps/api/.env.example ./apps/api/.env

# Use your preferred editor and supply your keys
nano ./apps/api/.env

# Install all packages with pnpm.
pnpm install

# Run required prisma commands for database
pnpm prisma:prepare

# Open a terminal for each app (frontend and backend)
pnpm dev:api
pnpm dev:web
```

Deployment will depend on your service provider. It is important to run the prisma commands to initialize your database.
