import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Check if any todos exist
  const todoCount = await prisma.todo.count()

  if (todoCount === 0) {
    console.log('Seeding database with initial todos...')
    
    await prisma.todo.createMany({
      data: [
        {
          title: 'Learn React and TypeScript',
          completed: false
        },
        {
          title: 'Build a Todo app with Prisma',
          completed: false
        }
      ]
    })

    console.log('Seeding completed!')
  } else {
    console.log('Database already has todos, skipping seed.')
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })