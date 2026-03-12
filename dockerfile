FROM node:20-alpine

WORKDIR /app

# habilita pnpm (viene con corepack en node)
RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm prisma generate
RUN pnpm build

EXPOSE 3000

CMD sh -c "pnpm prisma migrate deploy && pnpm start"