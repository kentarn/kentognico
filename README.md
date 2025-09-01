# Todo App - Full Stack Application

A modern full-stack todo application built with React, TypeScript, Node.js, Express, Prisma, and PostgreSQL. This application demonstrates a complete CRUD implementation with a clean, responsive user interface and a robust REST API.

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and developer experience
- **Vite** - Fast build tool and development server
- **Nginx** - Production web server for static assets

### Backend
- **Node.js 20** - JavaScript runtime
- **Express** - Web framework
- **Prisma** - Modern database ORM
- **PostgreSQL** - Robust relational database
- **TypeScript** - Type safety across the stack

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📋 Ports

| Service  | Port | Description                    |
|----------|------|--------------------------------|
| Frontend | 3000 | React application (Nginx)     |
| Backend  | 4000 | Express API server            |
| Database | 5432 | PostgreSQL database           |

## 🏃‍♂️ Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git

### Running with Docker (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd kentognico
```

2. Start all services:
```bash
docker compose up --build
```

3. Access the application:
- Frontend: http://localhost:3000
- API Health Check: http://localhost:4000/health
- API Documentation: http://localhost:4000/api/todos

The application will automatically:
- Set up the PostgreSQL database
- Run database migrations
- Seed initial todo data
- Build and serve both frontend and backend

## 💻 Local Development (Without Docker)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database connection string
```

4. Set up the database:
```bash
npm run prisma:migrate
npm run prisma:generate
npm run db:seed
```

5. Start development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# VITE_API_BASE_URL should point to your backend (default: http://localhost:4000)
```

4. Start development server:
```bash
npm run dev
```

## 🛠 API Endpoints

| Method | Endpoint        | Description           | Body                              |
|--------|----------------|-----------------------|-----------------------------------|
| GET    | /health        | Health check          | -                                 |
| GET    | /api/todos     | Get all todos         | -                                 |
| POST   | /api/todos     | Create a new todo     | `{ "title": "string" }`          |
| PUT    | /api/todos/:id | Update a todo         | `{ "title"?: "string", "completed"?: boolean }` |
| DELETE | /api/todos/:id | Delete a todo         | -                                 |

### Example API Usage

```bash
# Health check
curl http://localhost:4000/health

# Get all todos
curl http://localhost:4000/api/todos

# Create a new todo
curl -X POST http://localhost:4000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Docker"}'

# Toggle todo completion
curl -X PUT http://localhost:4000/api/todos/{id} \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Delete a todo
curl -X DELETE http://localhost:4000/api/todos/{id}
```

## 📝 Scripts

### Backend Scripts

| Script               | Description                      |
|---------------------|----------------------------------|
| `npm run dev`       | Start development server         |
| `npm run build`     | Build for production            |
| `npm start`         | Start production server         |
| `npm run prisma:migrate` | Run database migrations   |
| `npm run prisma:deploy`  | Deploy migrations (production) |
| `npm run prisma:generate` | Generate Prisma client   |
| `npm run db:seed`   | Seed database with initial data |

### Frontend Scripts

| Script            | Description                 |
|------------------|------------------------------|
| `npm run dev`    | Start development server     |
| `npm run build`  | Build for production        |
| `npm run preview` | Preview production build   |

## 🌍 Environment Variables

### Backend (.env)

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/todos"
PORT=4000
NODE_ENV=development
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:4000
```

## 📊 Data Model

```prisma
model Todo {
  id        String   @id @default(cuid())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("todos")
}
```

## ✨ Features

- ✅ Create new todos
- ✅ Mark todos as complete/incomplete
- ✅ Delete todos
- ✅ Real-time updates
- ✅ Loading states
- ✅ Error handling
- ✅ Responsive design
- ✅ Health monitoring
- ✅ Database seeding
- ✅ Docker containerization

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Todo categories and tags
- [ ] Due dates and reminders
- [ ] Search and filtering
- [ ] Bulk operations
- [ ] Real-time updates with WebSockets
- [ ] Mobile app with React Native
- [ ] Export/import functionality
- [ ] Analytics and reporting
- [ ] Dark mode theme

## 🧹 Cleanup

To stop and remove all containers and volumes:

```bash
# Stop services
docker compose down

# Remove volumes (this will delete all data)
docker compose down -v

# Remove images
docker compose down --rmi all
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).