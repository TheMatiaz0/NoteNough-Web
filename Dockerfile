# Prebuild Stage (react)
FROM node:16 AS react
WORKDIR /app

# install app dependencies
COPY clientapp/package.json ./
RUN npm install 

# Copies everything over to Docker environment
COPY clientapp/. ./
RUN npm run build

# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

# Copy everything
COPY . ./
# Restore as distinct layers
RUN dotnet restore

# Build and publish a release
RUN dotnet publish -c Release -o out

# Build and publish a development build
# RUN dotnet publish -c Debug -o out /p:EnvironmentName=Development

# Serve Stage
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .
# Copy final react to wwwroot
COPY --from=react /app/build ./wwwroot

ENTRYPOINT ["dotnet", "NoteNough.NET.dll"]