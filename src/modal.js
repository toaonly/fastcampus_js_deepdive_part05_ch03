import createElement from './createElement'

export default function createModal({ attrs, width, children }) {
  const modalWrapper = createElement(
    'div',
    {
      className: 'modal-container',
      ...attrs,
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
              createElement('div', { className: `flex flex-col gap-4 w-[${width}px] h-fit` }, [
                ...children,
                createElement('div', {}, []),
                createElement(
                  'button',
                  {
                    className: 'text-sm py-2 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 rounded-md',
                    onclick() {
                      modalWrapper.remove()
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

  document.body.append(modalWrapper)
}
