import express from 'express'
import cors from 'cors'
import { getHealth } from './routes/health.js'
import { getTodos, createTodo, updateTodo, deleteTodo } from './routes/todos.js'

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get('/health', getHealth)

// Todo routes
app.get('/api/todos', getTodos)
app.post('/api/todos', createTodo)
app.put('/api/todos/:id', updateTodo)
app.delete('/api/todos/:id', deleteTodo)

// Error handling
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})