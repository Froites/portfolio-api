FROM node:18-alpine AS builder

WORKDIR /app

# Copiar os arquivos do projeto
COPY . .

# Instalar todas as dependências, incluindo as de desenvolvimento
RUN npm ci

# Executar o build do NestJS
RUN npm run build

# Iniciar uma nova imagem para a aplicação final (multi-stage build)
FROM node:18-alpine

WORKDIR /app

# Copiar apenas package.json e package-lock.json
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm ci --only=production

# Copiar a pasta dist do estágio de build
COPY --from=builder /app/dist ./dist

# Expor a porta da aplicação
EXPOSE 10000

# Comando para iniciar a aplicação
CMD ["node", "dist/main.js"]