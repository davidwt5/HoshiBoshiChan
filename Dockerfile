# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install Node.js dependencies (including Discord.js)
RUN npm install

# Copy all application files to the working directory in the container
COPY . .

# Expose the necessary ports (Discord bot usually communicates over 443/80)
EXPOSE 443
EXPOSE 80

# Define the command to start your Discord.js bot (replace bot.js with your bot's entry file)
CMD ["npm", "run", "start"]
