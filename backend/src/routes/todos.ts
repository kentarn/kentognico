import { Request, Response } from 'express'
import prisma from '../prisma.js'

// GET /api/todos
export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(todos)
  } catch (error) {
    console.error('Error fetching todos:', error)
    res.status(500).json({ error: 'Failed to fetch todos' })
  }
}

// POST /api/todos
export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title } = req.body

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ error: 'Title is required and must be a non-empty string' })
    }

    const todo = await prisma.todo.create({
      data: {
        title: title.trim()
      }
    })

    res.status(201).json(todo)
  } catch (error) {
    console.error('Error creating todo:', error)
    res.status(500).json({ error: 'Failed to create todo' })
  }
}

// PUT /api/todos/:id
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, completed } = req.body

    const updateData: any = {}

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim().length === 0) {
        return res.status(400).json({ error: 'Title must be a non-empty string' })
      }
      updateData.title = title.trim()
    }

    if (completed !== undefined) {
      if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Completed must be a boolean' })
      }
      updateData.completed = completed
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' })
    }

    const todo = await prisma.todo.update({
      where: { id },
      data: updateData
    })

    res.json(todo)
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Todo not found' })
    }
    console.error('Error updating todo:', error)
    res.status(500).json({ error: 'Failed to update todo' })
  }
}

// DELETE /api/todos/:id
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await prisma.todo.delete({
      where: { id }
    })

    res.status(204).send()
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Todo not found' })
    }
    console.error('Error deleting todo:', error)
    res.status(500).json({ error: 'Failed to delete todo' })
  }
}