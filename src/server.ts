import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const server = express()
const port = 3333

server.use(express.json())

server.get("/", async (req,res) => {
    const getAll = await prisma.user.findMany()

    res.json(getAll)
})

server.listen(port, () => {
    console.log(`O servidor está na esteira... - http://localhost:${port}`)
})