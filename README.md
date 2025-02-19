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
| **Postman** | Testing API |  
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
http://localhost:8080

Tada! 🎉 The website should be working locally for you.

It starts with Guest Mode, so you can either add notes locally (through Cookies) or register an account and add notes to your PostgreSQL database.

## 🛢️ Database Access
The project includes **PostgreSQL** as the main database and **pgAdmin** as a database management tool.

### 📌 Placeholder PostgreSQL Access
- **Host name/address:** `db`
- **Port:** `5432`
- **Database Name:** `postgres`
- **Username:** `admin`
- **Password:** `root1234`

### 📌 Placeholder pgAdmin Access
- **Url:** http://localhost:5050
- **Email:** `admin@admin.com`
- **Password:** `root1234`

Info: If you change database settings, remember to remove `./postgres-data` folder locally.

## 🐛 Debugging

### React (Frontend)
#### 1️⃣ Navigate to ./clientapp folder:
```sh   
cd NoteNough-Web
cd clientapp  
```
#### 2️⃣ Start React server:
```sh   
npm start
```

Now, go to http://localhost:3000 and voila! Live changes are happening as you edit project files inside clientapp folder.

### ASP.NET (Backend)
You can use software like Postman to test API. Here's template JSON file containing all possible use cases for this app: [NoteNough_postman_template.json](NoteNough_postman_template.json) 

## 📁 Project Structure  

The project is structured as a **full-stack ASP.NET Core & React application**, following best practices for maintainability and scalability.  

### 🖥️ **Backend (ASP.NET Core API)**  

- [**`Controllers/`**](Controllers/) - Handles HTTP requests and defines API endpoints for user authentication and note management.  
- [**`Models/`**](Models/) - Defines data models used in the application, such as User and Note entities.  
- [**`Services/`**](Services/) - Business logic layer, handling operations like authentication (JWT) and note processing.  
- [**`Data/`**](Data/) - Manages database operations using **Entity Framework Core** (PostgreSQL).  
- [**`Migrations/`**](Migrations/) - Stores **database migration** files for versioning changes in the database schema.  
- **[`Program.cs`](Program.cs)** - The **main entry point** of the ASP.NET Core backend.  

### 🎨 **Frontend (React)**  

- [**`clientapp/`**](clientapp/) - The frontend application built with **React**, featuring a **modern UI** optimized for both **desktop and mobile**. 

### 🐳 **Deployment & DevOps**  

- [**`Dockerfile`**](Dockerfile) - Configures **Docker** for containerized deployment.  
- [**`docker-compose.yml`**](docker-compose.yml) - Manages multi-container services, including the backend, frontend, and database.  

### ⚙️ **Configuration & Infrastructure**  

- [**`Properties/`**](Properties/) - Contains ASP.NET Core project settings.  
- **[`appsettings.json`](appsettings.json) & [`appsettings.Development.json`](appsettings.Development.json)** - Stores environment-specific configurations (e.g., **JWT authentication, database connections**).

---
**Enjoy taking notes with NoteNough! 📝🚀**
