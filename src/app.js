import api from './api'
import renderUsers from './users'

export default async function renderApp() {
  const app = document.querySelector('#app')

  app.append(renderUsers(await api.getUsers()))
  // app.innerHTML = `
  //   <h1>사용자 목록</h1>

  //   <div>
  //     <button class="btn-start">start</button>
  //   </div>
  // `
}
