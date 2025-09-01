import React, { useState } from 'react'
import { api, CreateTodoRequest } from '../lib/api'

interface AddTodoFormProps {
  onTodoAdded: () => void
}

export default function AddTodoForm({ onTodoAdded }: AddTodoFormProps) {
  const [title, setTitle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      setError('Please enter a todo title')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const todoData: CreateTodoRequest = { title: title.trim() }
      await api.createTodo(todoData)
      setTitle('')
      onTodoAdded()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add todo')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          disabled={isSubmitting}
          style={{
            flex: 1,
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem',
          }}
        />
        <button
          type="submit"
          disabled={isSubmitting || !title.trim()}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: isSubmitting || !title.trim() ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: isSubmitting || !title.trim() ? 'not-allowed' : 'pointer',
          }}
        >
          {isSubmitting ? 'Adding...' : 'Add Todo'}
        </button>
      </div>
      {error && (
        <div style={{ color: '#dc3545', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}
    </form>
  )
}