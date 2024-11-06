const UserRouter = require('./UserRoutes')
const VehicleRouter = require('./VehicleRoutes')
const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/vehicle', VehicleRouter)

}

module.exports = routes