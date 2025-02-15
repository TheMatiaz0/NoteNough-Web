![NoteNough logo](clientapp/public/favicon.png)
# NoteNough
*When your notes are not **note enough**!*

NoteNough is a **self-hosted full-stack web application** for managing notes, built with **ASP.NET (C#) and React**. It provides a seamless, secure, and user-friendly experience, whether you’re using an account or just taking quick notes locally.

## ✨ Features
- ✅ User Authentication – Register/Login with JWT authentication, including a Stay Logged In option.
- ✅ Guest Mode – No account required! Notes are saved locally in cookies.
- ✅ Full CRUD Operations – Create, read, update, and delete notes from the database.
- ✅ Responsive UI – Optimized for both Desktop and Mobile devices.
- ✅ Modern & Intuitive Design – Prototyped using Figma for a great user experience.

## 🛠️ Tech Stack  
| Technology  | Description |  
|-------------|------------|  
| **ASP.NET Core (C#)** | Backend API & authentication |  
| **React** | Frontend UI framework |  
| **PostgreSQL** | Database for storing notes |  
| **Docker** | Containerized deployment |  
| **Figma** | UI/UX prototyping |  

## 🚀 Getting Started  
Before starting, ensure you have **Docker** installed on your machine.  

### 1️⃣ Clone the Repository  
```sh  
git clone https://github.com/TheMatiaz0/NoteNough-Web.git  
cd NoteNough-Web  
```

### 2️⃣ Start the Application
Run the following command to start the Docker container:
```sh
docker compose up
```

### 3️⃣ Access the App
Once setup is complete, open your browser and visit:
https://localhost:8080

Tada! 🎉 The website should be working locally for you.

It starts with Guest Mode, so you can either add notes locally (through Cookies) or register an account and add notes to your PostgreSQL database.

## 🛢️ Database Access
The project includes **PostgreSQL** as the main database and **pgAdmin** as a database management tool.

### 📌 Placeholder PostgreSQL Access
- **Host:** `localhost`
- **Port:** `5432`
- **Database Name:** `notenoughdb`
- **Username:** `admin`
- **Password:** `root1234`

### 📌 Placeholder pgAdmin Access
- **Host:** `localhost`
- **Port:** `5050`
- **Email:** `admin@admin.com`
- **Password:** `root1234`

You can connect to PostgreSQL using any SQL client (e.g., **DBeaver, TablePlus, or psql**):
```sh
psql -h localhost -p 5432 -U admin -d notenoughdb
```

## 📁 Project Structure  

The project is structured as a **full-stack ASP.NET Core & React application**, following best practices for maintainability and scalability.  

### 🖥️ **Backend (ASP.NET Core API)**  

- [**`Controllers/`**](Controllers/) - Handles HTTP requests and defines API endpoints for user authentication and note management.  
- [**`Models/`**](Models/) - Defines data models used in the application, such as User and Note entities.  
- [**`Services/`**](Services/) - Business logic layer, handling operations like authentication (JWT) and note processing.  
- [**`Data/`**](Data/) - Manages database operations using **Entity Framework Core** (PostgreSQL).  
- [**`Migrations/`**](Migrations/) - Stores **database migration** files for versioning changes in the database schema.  
- **[`Program.cs`](Program.cs)** - The **main entry point** of the ASP.NET Core backend.  
- **[`NoteNough.NET.sln`](NoteNough.NET.sln)** - The **main entry point** to edit C# code.

### 🎨 **Frontend (React)**  

- [**`clientapp/`**](clientapp/) - The frontend application built with **React**, featuring a **modern UI** optimized for both **desktop and mobile**. 

### 🐳 **Deployment & DevOps**  

- [**`Dockerfile`**](Dockerfile) - Configures **Docker** for containerized deployment.  
- [**`docker-compose.yml`**](docker-compose.yml) - Manages multi-container services, including the backend, frontend, and database.  

### ⚙️ **Configuration & Infrastructure**  

- [**`Properties/`**](Properties/) - Contains ASP.NET Core project settings.  
- **[`appsettings.json`](appsettings.json) & [`appsettings.Development.json`](appsettings.Development.json)** - Stores environment-specific configurations (e.g., **JWT authentication, database connections**).  
- **[`.editorconfig`](.editorconfig) & [`.gitignore`](.gitignore)** - Defines coding standards and excludes unnecessary files from version control.  

---
**Enjoy taking notes with NoteNough! 📝🚀**
