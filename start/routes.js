'use strict'

const Route = use('Route')

Route.get('/', () => {
  return 'Bem Vindo!'
})

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions-user', 'SessionUserController.store').validator('SessionUser')

Route.post('forgot-password-user', 'ForgotPasswordUserController.store').validator('ForgotPasswordUser')
Route.put('forgot-password-user', 'ForgotPasswordUserController.update')

Route.group(() => {
  Route.get('users', 'UserController.index')
  Route.get('user/:id', 'UserController.show')
  Route.put('user/:id', 'UserController.update')
  Route.delete('user/:id', 'UserController.destroy')

  Route.post('/files', 'FileController.store')
  Route.get('/files/:id', 'FileController.show')

  Route.get('permissions', 'PermissionController.index')
  Route.post('permissions', 'PermissionController.store')
  Route.put('permissions/:id', 'PermissionController.update')
  Route.delete('permissions/:id', 'PermissionController.destroy')

  Route.get('roles', 'RoleController.index')
  Route.post('roles', 'RoleController.store')
  Route.put('roles/:id', 'RoleController.update')
  Route.delete('roles/:id', 'RoleController.destroy')

}).middleware(['auth:jwt'])
