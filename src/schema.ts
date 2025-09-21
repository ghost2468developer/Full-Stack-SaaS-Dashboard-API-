import { gql } from 'apollo-server-express'
export default gql`
type Query {
  me: User
  plans: [Plan!]!
  dashboardData(range: String): [DataPoint!]!
}

type Mutation {
  register(email: String!, password: String!, name: String): AuthPayload!
  login(email: String!, password: String!): AuthPayload!
  logout: Boolean!
  createCheckoutSession(planId: Int!): CheckoutResult!
  addDataPoint(metric: String!, value: Float!): DataPoint!
}

type User {
  id: Int!
  email: String!
  name: String
  role: String!
  stripeCustomerId: String
}

type AuthPayload {
  accessToken: String!
  user: User!
}

type Plan {
  id: Int!
  name: String!
  priceCents: Int!
  stripePriceId: String!
  interval: String!
}

type CheckoutResult {
  url: String!
}

type DataPoint {
  id: Int!
  metric: String!
  value: Float!
  timestamp: String!
}
`