import React, { useEffect, useState } from 'react'
import { Todo, api } from './lib/api'
import AddTodoForm from './components/AddTodoForm'
import TodoList from './components/TodoList'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [healthStatus, setHealthStatus] = useState<string>('checking...')

  const fetchTodos = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const todosData = await api.getTodos()
      setTodos(todosData)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load todos')
    } finally {
      setIsLoading(false)
    }
  }

  const checkHealth = async () => {
    try {
      const health = await api.checkHealth()
      setHealthStatus(health.status)
    } catch (error) {
      setHealthStatus('error')
    }
  }

  useEffect(() => {
    fetchTodos()
    checkHealth()
  }, [])

  return (
    <div style={{ minHeight: '100vh', padding: '1rem 0' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ 
          color: '#333', 
          marginBottom: '0.5rem',
          fontSize: '2.5rem',
          fontWeight: 'bold'
        }}>
          Todo App
        </h1>
        <p style={{ 
          color: '#666', 
          margin: '0 0 0.5rem 0',
          fontSize: '1.1rem'
        }}>
          A full-stack todo application built with React, Express, and Prisma
        </p>
        <div style={{
          display: 'inline-block',
          padding: '0.25rem 0.75rem',
          backgroundColor: healthStatus === 'ok' ? '#d4edda' : '#f8d7da',
          color: healthStatus === 'ok' ? '#155724' : '#721c24',
          border: `1px solid ${healthStatus === 'ok' ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '4px',
          fontSize: '0.9rem',
          fontWeight: 'bold'
        }}>
          Backend Status: {healthStatus}
        </div>
      </header>

      <main style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}>
        <AddTodoForm onTodoAdded={fetchTodos} />
        <TodoList 
          todos={todos}
          isLoading={isLoading}
          error={error}
          onTodosChange={fetchTodos}
        />
      </main>

      <footer style={{
        marginTop: '2rem',
        textAlign: 'center',
        color: '#999',
        fontSize: '0.9rem'
      }}>
        <p>
          Built with React + TypeScript + Vite frontend and Node.js + Express + Prisma + PostgreSQL backend
        </p>
      </footer>
    </div>
  )
}

export default App