const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    const { fullName, password } = req.body
    try {
        const user = await authService.login(fullName, password)
        req.session.user = user;
        res.json(user)
    } catch (err) {
        res.status(401).send({ error: err })
    }
}

async function signup(req, res) {
    try {
        const { email, password, fullName, tel, skills, favs, events } = req.body
        logger.debug(email + ", " + fullName + ', ' + password)
        const account = await authService.signup(email, password, fullName, tel, skills, favs, events)
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const user = await authService.login(fullName, password)
        req.session.user = user
        res.json(user)
    } catch (err) {
        logger.error('[SIGNUP] ' + err)
        res.status(500).send({ error: 'could not signup, please try later' })
    }
}

async function logout(req, res) {
    try {
        req.session.destroy()
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

module.exports = {
    login,
    signup,
    logout
}