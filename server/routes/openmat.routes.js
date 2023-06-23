const CONTROLLER = require('../controllers/openmat.controller')

module.exports = app  => {
    app.post('/api/createopenmat', CONTROLLER.createNewOpenMat)
    app.get('/api/openmats', CONTROLLER.findAllOpenMats)
    app.get('/api/openmats/:id', CONTROLLER.findOneSingleOpenMat)
    // app.get('/api/openmats/user', CONTROLLER.getByUser)
    app.put('/api/openmat/:id', CONTROLLER.updateOpenMat);
    app.delete('/api/openmat/:id', CONTROLLER.deleteOpenMat);
}
