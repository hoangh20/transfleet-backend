const UserRouter = require('./UserRoutes')
const VehicleRouter = require('./VehicleRoutes')
const DriverRouter = require('./DriverRoutes')
const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/vehicle', VehicleRouter)
    app.use('/api/driver', DriverRouter)

}

module.exports = routes