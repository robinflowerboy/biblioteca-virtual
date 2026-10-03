import 'dotenv/config';
import { validateToken } from "#utils/token.js";

const passwordRegex =  /^[a-zA-Z0-9!@#$%&*()\-_<?:;\[\]{}+=]{8,24}$/;
const usernameRegex = /^[a-zA-Z0-9._]{3,16}$/;
const nameRegex = /^[\p{L}\p{N} ._'-]{3,30}$/u;
const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function checkLoginInputRules(req, res, next) {
    const { username, password } = req.body;
 
    if (!usernameRegex.test(username)) {
        return res.status(400).json({ error: `Username inválido` });
    } 
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: `Senha inválida` });
    }
    next() 
}

export function checkRegisterInputRules(req, res, next) {
    const { email, username, password } = req.body;
 
    if (!usernameRegex.test(username)) { return res.status(400).json({ error: `Username inválido` }); } 
    if (!passwordRegex.test(password)) { return res.status(400).json({ error: `Senha inválida` }); }
    if (!emailRegex.test(email)) { return res.status(400).json({ error: `Email inválido` }); }

    next() 
}


export function authenticate(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({error: 'Não autenticado.'});
    }
    const [type, token] = authToken.split(' ');
    try {
        const payload = validateToken(token, process.env.JWT_ACCESS_SECRET);

        req.user = payload;
        next() 
    }
    catch(error) {
        return res.status(401).json({error: error});
    }
}