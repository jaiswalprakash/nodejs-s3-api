FROM ubuntu

# Install Node.js
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get upgrade -y && \
    apt-get install -y nodejs

# Set the working directory for the application
WORKDIR /app

# Copy just the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies based on package.json and package-lock.json
RUN npm install

# Copy the rest of the application code
COPY . .

# Set the entry point for the application
ENTRYPOINT [ "node", "app.js" ]
