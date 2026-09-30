import * as authService from '../services/authService.js';

export function registerController(req, res) {
    const { username, password } = req.body;
    authService.register(res, username, password);
}

export function loginController(req, res){
    const { username, password } = req.body;
    authService.login(res, username, password);
}

export function dashboard(req, res) {
    return res.status(200).json({user: req.user})
}