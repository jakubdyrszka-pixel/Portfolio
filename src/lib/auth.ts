import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import crypto from 'crypto';

const JWT_SECRET_STRING = process.env.JWT_SECRET || 'fallback_development_secret_do_not_use_in_prod_1234567890';
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STRING);

// Password Helpers
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Token Hash Helper for SHA-256 (for storing refresh tokens in DB)
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

// Access Token Helpers (15 minutes)
export interface AccessTokenPayload extends JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export async function signAccessToken(payload: { userId: string; email: string; role: string }): Promise<string> {
  return new SignJWT({
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(JWT_SECRET);
}

export async function verifyAccessToken(token: string): Promise<AccessTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as AccessTokenPayload;
  } catch {
    return null;
  }
}

// Refresh Token Helpers (30 days)
export interface RefreshTokenPayload extends JWTPayload {
  userId: string;
  deviceId?: string;
  tokenType: 'refresh';
}

export async function signRefreshToken(payload: { userId: string; deviceId?: string }): Promise<{ token: string; expiresAt: Date; tokenHash: string }> {
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  const randomBytes = crypto.randomBytes(32).toString('hex');
  const token = await new SignJWT({
    userId: payload.userId,
    deviceId: payload.deviceId,
    tokenType: 'refresh',
    jti: randomBytes,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(JWT_SECRET);

  const tokenHash = hashToken(token);
  return { token, expiresAt, tokenHash };
}

export async function verifyRefreshToken(token: string): Promise<RefreshTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if ((payload as unknown as RefreshTokenPayload).tokenType !== 'refresh') {
      return null;
    }
    return payload as unknown as RefreshTokenPayload;
  } catch {
    return null;
  }
}

// License Proof Generator (for Electron Offline Caching & Validation)
export interface LicenseProofPayload extends JWTPayload {
  id: string;
  tier: string;
  status: string;
  expiresAt: string;
  features: string[];
  deviceId: string;
  signedAt: string;
}

export async function signLicenseProof(payload: {
  id: string;
  tier: string;
  status: string;
  expiresAt: Date | string;
  features: string[];
  deviceId: string;
  signedAt?: Date | string;
}): Promise<string> {
  const expiresAtString = payload.expiresAt instanceof Date ? payload.expiresAt.toISOString() : payload.expiresAt;
  const signedAtString = payload.signedAt instanceof Date ? payload.signedAt.toISOString() : (payload.signedAt || new Date().toISOString());

  return new SignJWT({
    id: payload.id,
    tier: payload.tier,
    status: payload.status,
    expiresAt: expiresAtString,
    features: payload.features,
    deviceId: payload.deviceId,
    signedAt: signedAtString,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .sign(JWT_SECRET);
}
