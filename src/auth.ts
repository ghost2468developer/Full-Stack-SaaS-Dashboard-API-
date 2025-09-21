import { Response } from 'express'
import jwt from 'jsonwebtoken'
const ACCESS_SECRET = process.env.JWT_SECRET!
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!

export function createAccessToken(user: { id: number; role: string }) {
  return jwt.sign({ userId: user.id, role: user.role }, ACCESS_SECRET, { expiresIn: '15m' })
}

export function createRefreshToken(user: { id: number; tokenVersion?: number }) {
  return jwt.sign({ userId: user.id, tokenVersion: user.tokenVersion ?? 0 }, REFRESH_SECRET, { expiresIn: '7d' })
}

export function sendRefreshToken(res: Response, token: string) {
  res.cookie('jid', token, {
    httpOnly: true,
    path: '/refresh_token',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  })
}