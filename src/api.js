const api = {
  getUsers() {
    return fetch(`http://localhost:3000/users`).then(res => res.json())
  },
  getPostsByUser(userId) {
    return fetch(`http://localhost:3000/posts?user=${userId}`).then(res => res.json())
  },
}

export default api
