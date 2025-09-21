import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import resolvers from './resolvers'
import typeDefs from './schema'
import { handleStripeWebhook } from './stripe'

const prisma = new PrismaClient
const app = express()
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(cookieParser())

// Strip Webhook
app.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook)

// GraphQL server
async function start() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => ({ req, res, prisma })
    })
    await server.start()
    server.applyMiddleware({ app, path: '/graphql', cors: false })

    const port = process.env.PORT || 4000
    app.listen(port, () => console.log('Server running: http://localhost:${port}/graphql'))
}

start()