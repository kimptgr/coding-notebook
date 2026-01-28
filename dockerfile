FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (better cache)
COPY package.json package-lock.json ./
RUN npm ci

# Copy project files
COPY . .

# Expose Docusaurus dev server port
EXPOSE 3000

# Start Docusaurus in dev mode
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
