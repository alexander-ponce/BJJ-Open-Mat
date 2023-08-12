
const verifyToken = require('../controllers/auth.middleware');
// const express = require('express');
// const { authenticate } = require('../config/jwt.config');

const UserController = require('../controllers/user.controller');

module.exports = function(app){
    app.get('/api/users', UserController.index);
    app.post('/api/register', UserController.registerUser);
    app.post('/api/login', UserController.loginUser);
    app.get('/api/logout', UserController.logout);
    app.get('/api/user-current', UserController.getLogged);
    app.put('/api/user/update', UserController.updateOne);
    app.get('/user/:id', UserController.findOneUser);

}
