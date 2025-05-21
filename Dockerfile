FROM node:18-alpine

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar arquivos compilados
COPY dist/ ./dist/

# Expor a porta da aplicação
EXPOSE 10000

# Comando para iniciar a aplicação
CMD ["node", "dist/main.js"]