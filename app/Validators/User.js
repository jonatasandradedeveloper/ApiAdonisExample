'use strict'

const Antl = use('Antl')

class User {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required|unique:users',
      email: 'required|email|unique:users',
      type: 'required',
      password: 'required|confirmed',
      telephone: 'unique:users',
      cpf: 'unique:users'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = User
