import { $, readyp, Input, Textarea, readStyle } from './dom'

const styles = [
  {
    label: 'margin top',
    property: 'margin-top'
  },
  {
    label: 'margin bottom',
    property: 'margin-bottom'
  },
  {
    label: 'padding top',
    property: 'padding-top'
  },
  {
    label: 'padding bottom',
    property: 'padding-bottom'
  },
  {
    label: 'border top',
    property: 'border-top'
  },
  {
    type: 'code block',
    label: 'custom css',
    property: 'custom'
  },
]

const main = async () => {
  await readyp()

  const [ $sidebar ] = $('.sidebar')

  styles.forEach(({ type = 'input', label, property }) => {
    const fn = type === 'input' ? Input : Textarea
    $sidebar.innerHTML += fn({
      title: label,
      property
    })
  })

  const [ $styleContainer ] = $('.style-container')

  $sidebar.addEventListener('input', e => {
    updateStyles($sidebar, $styleContainer)
  })

  updateStyles($sidebar, $styleContainer)
}

const updateStyles = ($sidebar, $styleContainer) => {
  const styles = $($sidebar, 'input').map(el => {
    return `
      ${el.dataset.property}: ${el.value};
    `
  }).join('\n')

  const [ $textarea ] = $($sidebar, 'textarea')
  const customCss = $textarea.value

  $styleContainer.innerHTML = `
    <style>
      .wrapper > * {
        ${styles}
      }

      ${customCss}
    </style>
  `

  setTimeout(() => {
    const $els = $('.wrapper > *')
    $els.forEach(($el, i) => {
      const style = readStyle($el)

      $styleContainer.innerHTML += `
        <style>
          .wrapper > :nth-child(${i + 1})::before {
            top: -${style.marginTop};
            height: ${style.marginTop};
            font-size: inherit;
          }
          .wrapper > :nth-child(${i + 1})::after {
            bottom: -${style.marginBottom};
            height: ${style.marginBottom};
            font-size: inherit;
          }
        </style>
      `
    })
  }, 20)
}

main()