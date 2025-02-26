import { JSDOM } from 'jsdom'
import DOMPurify from 'isomorphic-dompurify'

export const stripString = (str: string) => {
  return str.replace(/(<([^>]+)>)/gi, '')
}

export const parseHtml = (html: string) => {
  try {
    // Create virtual DOM
    const dom = new JSDOM('')
    const window = dom.window
    const DOMPurifyInstance = DOMPurify(window)

    // Sanitize HTML
    const cleanHtml = DOMPurifyInstance.sanitize(html, {
      USE_PROFILES: { html: true },
      ALLOWED_TAGS: [
        'p',
        'a',
        'b',
        'br',
        'img',
        'ul',
        'ol',
        'li',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'blockquote',
        'code',
        'em',
        'strong',
        'span'
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class']
    })

    // Create virtual element with cleaned HTML
    const div = dom.window.document.createElement('div')
    div.innerHTML = cleanHtml

    return {
      element: div,
      html: cleanHtml,
      text: div.textContent
    }
  } catch (error) {
    console.error('Error parsing HTML:', error)
    return {
      element: null,
      html: '',
      text: ''
    }
  }
}
