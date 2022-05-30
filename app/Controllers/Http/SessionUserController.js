'use strict'

const User = use('App/Models/User')

class SessionUserController {
  async store ({ request, response, auth }) {
    try {
      const { email, password } = request.all()
      const jwt = auth.authenticator('jwt')
      const token = await jwt.attempt(email, password)
      const user = await User.query().where({ email }).first()

      const { name, id } = user

      return response.json({
        success: true,
        data: {
          token, name, id
        }
      })
    } catch (error) {
      return response.status(error.status).send({ message: 'Aviso, Tente novamente mais tarde!' })
    }
  }
}

module.exports = SessionUserController
