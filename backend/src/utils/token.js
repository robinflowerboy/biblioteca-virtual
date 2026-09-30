import jwt from 'jsonwebtoken';

export function generateToken(id, secret, time) {
    return jwt.sign({ sub:id }, secret, { expiresIn: time });
}

export function validateToken(token, secret) {
    return jwt.verify(token, secret);
}