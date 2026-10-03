import * as authService from '../services/authService.js';

export function registerController(req, res) {
    const { email, username, password } = req.body;
    authService.register(res, email, username, password);
}

export function loginController(req, res){
    const { username, password } = req.body;
    authService.login(res, username, password);
}
