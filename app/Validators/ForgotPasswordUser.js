'use strict'

const Antl = use('Antl')

class ForgotPasswordUser {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email:users'

    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ForgotPasswordUser
