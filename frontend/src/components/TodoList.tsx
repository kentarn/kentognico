import React, { useState } from 'react'
import { Todo, api } from '../lib/api'

interface TodoListProps {
  todos: Todo[]
  isLoading: boolean
  error: string | null
  onTodosChange: () => void
}

export default function TodoList({ todos, isLoading, error, onTodosChange }: TodoListProps) {
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set())
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set())

  const handleToggleComplete = async (todo: Todo) => {
    const todoId = todo.id
    if (updatingIds.has(todoId)) return

    setUpdatingIds(prev => new Set(prev).add(todoId))

    try {
      await api.updateTodo(todoId, { completed: !todo.completed })
      onTodosChange()
    } catch (error) {
      console.error('Failed to update todo:', error)
    } finally {
      setUpdatingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(todoId)
        return newSet
      })
    }
  }

  const handleDelete = async (todoId: string) => {
    if (deletingIds.has(todoId)) return

    setDeletingIds(prev => new Set(prev).add(todoId))

    try {
      await api.deleteTodo(todoId)
      onTodosChange()
    } catch (error) {
      console.error('Failed to delete todo:', error)
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(todoId)
        return newSet
      })
    }
  }

  if (isLoading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '2rem',
        color: '#666',
        fontSize: '1.1rem'
      }}>
        Loading todos...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ 
        padding: '1rem',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        border: '1px solid #f5c6cb',
        borderRadius: '4px',
        marginBottom: '1rem'
      }}>
        Error: {error}
      </div>
    )
  }

  if (todos.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem',
        color: '#999',
        fontSize: '1.1rem'
      }}>
        No todos yet. Add one above to get started!
      </div>
    )
  }

  return (
    <div>
      <h2 style={{ marginBottom: '1rem', color: '#333' }}>
        Your Todos ({todos.length})
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {todos.map((todo) => (
          <div
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <button
              onClick={() => handleToggleComplete(todo)}
              disabled={updatingIds.has(todo.id)}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '3px',
                border: '2px solid #007bff',
                backgroundColor: todo.completed ? '#007bff' : 'transparent',
                cursor: updatingIds.has(todo.id) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                flexShrink: 0,
              }}
            >
              {updatingIds.has(todo.id) ? '⟳' : (todo.completed ? '✓' : '')}
            </button>
            
            <span
              style={{
                flex: 1,
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#999' : '#333',
                fontSize: '1rem',
              }}
            >
              {todo.title}
            </span>
            
            <span style={{ fontSize: '0.8rem', color: '#999' }}>
              {new Date(todo.createdAt).toLocaleDateString()}
            </span>
            
            <button
              onClick={() => handleDelete(todo.id)}
              disabled={deletingIds.has(todo.id)}
              style={{
                padding: '0.25rem 0.5rem',
                backgroundColor: deletingIds.has(todo.id) ? '#ccc' : '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: deletingIds.has(todo.id) ? 'not-allowed' : 'pointer',
                fontSize: '0.8rem',
              }}
            >
              {deletingIds.has(todo.id) ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}