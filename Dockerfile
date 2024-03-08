FROM ubuntu

# Install node
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get upgrade -y && \
    apt-get install -y nodejs

# Create a directory for your app
WORKDIR /app

# Copy the entire folder structure
COPY . .

# Install dependencies
RUN npm install

# Set entry point
ENTRYPOINT [ "node", "app.js" ]
