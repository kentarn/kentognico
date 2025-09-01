export interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateTodoRequest {
  title: string
}

export interface UpdateTodoRequest {
  title?: string
  completed?: boolean
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new ApiError(response.status, errorData.error || 'Request failed')
  }
  
  if (response.status === 204) {
    return undefined as T
  }
  
  return response.json()
}

export const api = {
  async getTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_BASE_URL}/api/todos`)
    return handleResponse<Todo[]>(response)
  },

  async createTodo(data: CreateTodoRequest): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return handleResponse<Todo>(response)
  },

  async updateTodo(id: string, data: UpdateTodoRequest): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return handleResponse<Todo>(response)
  },

  async deleteTodo(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
      method: 'DELETE',
    })
    return handleResponse<void>(response)
  },

  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    const response = await fetch(`${API_BASE_URL}/healthz`)
    return handleResponse<{ status: string; timestamp: string }>(response)
  },
}