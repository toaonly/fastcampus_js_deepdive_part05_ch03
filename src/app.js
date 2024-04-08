import api from './api'
import renderUsers from './users'

export default async function renderApp() {
  const app = document.querySelector('#app')

  app.append(renderUsers(await api.getUsers()))
}
