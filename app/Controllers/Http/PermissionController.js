'use strict'

const Permission = use('Permission')

class PermissionController {
  async index ({ request, response, view }) {
    const { name, page } = request.get()
    const wherename = name && name !== '' ? `permissions.name = '${name}' ` : ''
    try {
      const permissions = await Permission.query().whereRaw(wherename).paginate(page, 50)
      if (permissions) {
        return permissions
      }
    } catch (error) {
      console.log(error)
      return response
        .status(error.status)
        .send({ message: 'Erro ao tentar encontrar as Permissões cadastradas.' })
    }
  }

  async store ({ request, response }) {
    const data = request.only(['name', 'slug', 'description'])
    try {
      await Permission.create(data)
      return response.status(200).json({
        message: 'Permissão gravado com sucesso!'
      })
    } catch (error) {
      return response.status(error.status).send({ message: 'Algo deu errado ao cadastrar permissãp.' })
    }
  }

  async update ({ request, params, response }) {
    const data = request.only(['name', 'slug', 'description'])
    const permission = await Permission.findOrFail(params.id)

    try {
      permission.merge(data)
      await permission.save()
      return permission
    } catch (error) {
      return response.status(error.status).send({ message: 'Algo deu errado ao atualizar permissão.' })
    }
  }

  async destroy ({ params, response }) {
    try {
      const permission = await Permission.findOrFail(params.id)
      if (permission) {
        await permission.delete()
        return response
          .status(200)
          .send({ message: 'Permissão excluído com sucesso' })
      }
    } catch (error) {
      return response.status(error.status).send({ message: 'Algo deu errado ao excluir permissão.' })
    }
  }
}

module.exports = PermissionController
