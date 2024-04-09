import { vi, expect } from 'vitest'
import api from '../api'
import renderUsers from '../users'
import db from '../../db/db.json'

describe('app 테스트', () => {
  beforeEach(async () => {
    vi.mock('../api.js', () => {
      return {
        default: {
          getUsers: () => Promise.resolve(db.users),
          getPostsByUser: userId => Promise.resolve(db.posts.filter(p => p.user === userId)),
        },
      }
    })

    document.body.innerHTML = `<div id="app"></div>`

    const app = document.querySelector('#app')

    app.append(renderUsers(await api.getUsers()))
  })

  it('"상세 보기" 버튼을 클릭하면 modal 이 열리고 modal 에서 사용자의 상세 정보가 렌더링 된다', () => {
    const btnDetail = document.querySelector('[data-test-id="btn-detail__0"]')

    btnDetail.click()

    const user = db.users[0]
    const modal = document.querySelector(`[data-test-id="user__${user.id}"]`)

    expect(modal).toBeInstanceOf(HTMLElement)
    expect(modal.textContent.match(user.id)).toBeTruthy()
    expect(modal.textContent.match(user.name)).toBeTruthy()
    expect(modal.textContent.match(user.gender === 'M' ? '남성' : '여성')).toBeTruthy()
  })

  it('"작성한 게시글" 버튼을 클릭하면 modal 이 열리고 modal 에서 사용자가 작성한 게시글 목록이 렌더링 된다', async () => {
    const btnPosts = document.querySelector('[data-test-id="btn-posts__0"]')

    await btnPosts.click()

    const user = db.users[0]
    const modal = document.querySelector(`[data-test-id="user__${user.id}__posts"]`)

    expect(modal).toBeInstanceOf(HTMLElement)

    const posts = await api.getPostsByUser(user.id)

    posts.forEach(post => {
      expect(modal.textContent.match(post.title)).toBeTruthy()
    })
  })
})
