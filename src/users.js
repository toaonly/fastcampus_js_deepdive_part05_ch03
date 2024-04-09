import api from './api'
import createElement from './createElement'

const CLASSNAME = {
  USERS_WRAPPER: 'users-wrapper',
  get USERS_WRAPPER_HEADER() {
    return `${this.USERS_WRAPPER}__header`
  },
  get USERS_WRAPPER_ROW() {
    return `${this.USERS_WRAPPER}__row`
  },
}

export default function renderUsers(users) {
  const userRowWrapper = createElement(
    'div',
    {
      className: CLASSNAME.USERS_WRAPPER,
    },
    [
      createElement(
        'div',
        {
          className: `${CLASSNAME.USERS_WRAPPER_HEADER}`,
        },
        [createElement('div', null, ['No.']), createElement('div', null, ['이름'])]
      ),
      ...users.map((user, index) =>
        createElement(
          'div',
          {
            className: `${CLASSNAME.USERS_WRAPPER_ROW}`,
          },
          [
            createElement('div', null, [`${index}`]),
            createElement('div', null, [user.name]),
            createElement('div', null, [
              createElement(
                'button',
                {
                  className: `${CLASSNAME.USERS_WRAPPER_ROW}__btn-detail`,
                  dataset: {
                    testId: `btn-detail__${index}`,
                  },
                  onclick() {
                    const modalWrapper = createElement(
                      'div',
                      {
                        className: 'modal-container',
                        dataset: {
                          testId: `user__${user.id}`,
                        },
                      },
                      [
                        createElement(
                          'div',
                          {
                            className: 'modal-container__layer',
                          },
                          [
                            createElement(
                              'div',
                              {
                                className: 'modal-container__layer__main',
                              },
                              [
                                createElement('div', { className: 'flex flex-col gap-4 w-[320px] h-fit' }, [
                                  createElement(
                                    'div',
                                    {
                                      className: 'text-sm font-semibold italic',
                                    },
                                    [user.id]
                                  ),
                                  createElement('div', { className: 'flex gap-8' }, [
                                    createElement('div', { className: 'font-semibold' }, ['이름']),
                                    createElement('div', {}, [user.name]),
                                  ]),
                                  createElement('div', { className: 'flex gap-8' }, [
                                    createElement('div', { className: 'font-semibold' }, ['성별']),
                                    createElement('div', {}, [user.gender === 'M' ? '남성' : '여성']),
                                  ]),
                                  createElement('div', {}, []),
                                  createElement(
                                    'button',
                                    {
                                      className:
                                        'text-sm py-2 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 rounded-md',
                                      onclick() {
                                        modalWrapper.hide()
                                      },
                                    },
                                    ['닫기']
                                  ),
                                ]),
                              ]
                            ),
                          ]
                        ),
                      ]
                    )
                  },
                },
                ['상세 정보']
              ),
            ]),
            createElement('div', null, [
              createElement(
                'button',
                {
                  className: `${CLASSNAME.USERS_WRAPPER_ROW}__btn-posts`,
                  dataset: {
                    testId: `btn-posts__${index}`,
                  },
                  async onclick() {
                    const posts = await api.getPostsByUser(user.id)
                    const modalWrapper = createElement(
                      'div',
                      {
                        className: 'modal-container',
                        dataset: {
                          testId: `user__${user.id}__posts`,
                        },
                      },
                      [
                        createElement(
                          'div',
                          {
                            className: 'modal-container__layer',
                          },
                          [
                            createElement(
                              'div',
                              {
                                className: 'modal-container__layer__main',
                              },
                              [
                                createElement('div', { className: 'flex flex-col gap-8 w-[480px] h-fit' }, [
                                  createElement('div', { className: 'font-semibold' }, [
                                    createElement('span', { className: 'italic' }, [user.name]),
                                    `님이 작성한 게시글 목록`,
                                  ]),
                                  createElement(
                                    'div',
                                    { className: 'flex flex-col gap-4' },
                                    posts.map(post => createElement('a', { href: '#' }, [post.title]))
                                  ),
                                  createElement(
                                    'button',
                                    {
                                      className:
                                        'text-sm py-2 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 rounded-md',
                                      onclick() {
                                        modalWrapper.hide()
                                      },
                                    },
                                    ['닫기']
                                  ),
                                ]),
                              ]
                            ),
                          ]
                        ),
                      ]
                    )
                  },
                },
                ['작성한 게시글']
              ),
            ]),
          ]
        )
      ),
    ]
  )

  return userRowWrapper
}
