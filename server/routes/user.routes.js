
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
}


// module.exports = app  => {
//     // app.get('/api/test', CONTROLLER.index)
//     app.post('/api/register', CONTROLLER.register)
//     app.post('/api/login', CONTROLLER.login)
//     // this route now has to be authenticated
//     app.get("/api/users", authenticate, CONTROLLER.getAll);
//     app.post('/api/logout', CONTROLLER.logout)
//     app.get('/api/user-current', CONTROLLER.getLogged)
//     app.put('/api/user/:id', CONTROLLER.updateOne)
// }