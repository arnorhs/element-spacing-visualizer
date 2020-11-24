export const readyp = () => {
  return new Promise((resolve, reject) => {
    if (document.readyState !== 'loading') {
      resolve()
    } else {
      document.addEventListener('DOMContentLoaded', resolve)
    }
  })
}

export const $ = (...args) => {
  const {
    arr,
    doc,
    sel
  } = args.reduce((acc, arg) => {
    if (typeof arg === 'string') {
      return { ...acc, sel: arg }
    } else if (Array.isArray(arg)) {
      return { ...acc, arr: arg }
    } else {
      return { ...acc, doc: arg }
    }
  }, { doc: document })

  if (arr) {
    return arr.map(a => $(a, sel))
      .flat()
  }

  return [
    ...doc.querySelectorAll(sel)
  ]
}

export const readStyle = el => {
  return el.currentStyle || window.getComputedStyle(el)
}

export const Input = ({ title, property }) => {
  return `
    <label>
      ${title}:
      <input data-property="${property}" />
    </label>
  `
}

export const Textarea = ({ title, property }) => {
  return `
    <label>
      ${title}:
      <textarea data-property="${property}"></textarea>
    </label>
  `
}
