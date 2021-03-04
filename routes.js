const personsApi = require('./api/persons')

const appImporter = (app) => {
    app.use(personsApi)
}

module.exports = appImporter