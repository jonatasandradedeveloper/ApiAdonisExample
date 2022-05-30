'use strict'

const User = use('App/Models/User')

class UserController {
  async index ({ request, response, view }) {
    const { name, page } = request.get()
    const wherename = name && name !== '' ? `users.name = '${name}' ` : ''
    try {
      const users = await User.query().with('permissions').with('roles').whereRaw(wherename).paginate(page, 50)
      if (users) {
        return users
      } else {
        return response
          .status(404)
          .send({ message: 'Usuários não encontrados!' })
      }
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Erro ao tentar encontrar usuários cadastrados' })
    }
  }

  async store ({ request, response }) {
    const { permissions, roles, ...data } = request.only(['name', 'email', 'type', 'password', 'zip_code', 'city', 'type', 'address', 'district', 'number', 'telephone', 'cpf', 'gym_id', 'permissions', 'roles'])
    try {
      const user = await User.create(data)
      if (roles) {
        await user.roles().attach(roles)
      }
      if (permissions) {
        await user.permissions().attach(permissions)
      }
      await user.loadMany(['roles', 'permissions'])

      return user
    } catch (error) {
      return response.status(error.status).send({ message: 'Aviso, Tente novamente mais tarde!' })
    }
  }

  async show ({ params, response }) {
    try {
      const user = await User.findOrFail(params.id)
      await user.loadMany(['roles', 'permissions'])
      if (user) {
        return user
      } else {
        return response
          .status(404)
          .send({ message: 'Usuário não encontrado!' })
      }
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Erro ao exibir usuário' })
    }
  }

  async update ({ params, request, response }) {
    const user = await User.findOrFail(params.id)
    const { permissions, roles, ...data } = request.only(['name', 'email', 'type', 'password', 'zip_code', 'city', 'type', 'address', 'district', 'number', 'telephone', 'cpf', 'gym_id', 'permissions', 'roles'])
    try {
      user.merge(data)
      await user.save()

      if (roles) {
        await user.roles().sync(roles)
      }
      if (permissions) {
        await user.permissions().sync(permissions)
      }
      await user.loadMany(['roles', 'permissions'])

      return user
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Erro ao tentar atualizado usuário' })
    }
  }

  async destroy ({ params, request, response }) {
    try {
      const user = await User.findOrFail(params.id)
      if (user) {
        await user.delete()
        return response
          .status(200)
          .send({ message: 'Usuário excluído com sucesso' })
      } else {
        return response
          .status(404)
          .send({ message: 'Usuário não foi localizado' })
      }
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Erro ao excluir usuário' })
    }
  }
}

module.exports = UserController
