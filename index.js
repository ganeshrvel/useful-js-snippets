/**
 * Move a key-value pair to a specified index.
 * @param oldIndex
 * @param newIndex
 * @returns {Array}
 */

Array.prototype.move = function (oldIndex, newIndex) {
  while (oldIndex < 0) {
    oldIndex += this.length
  }
  while (newIndex < 0) {
    newIndex += this.length
  }
  if (newIndex >= this.length) {
    let k = newIndex - this.length
    while ((k--) + 1) {
      this.push(undefined)
    }
  }
  this.splice(newIndex, 0, this.splice(oldIndex, 1)[0])
  return this
}

//Example:
let value = ['animals', 'plants']
value.move(0, 3)

//Output: ["plants",undefined,undefined,"animals"]

//####################################################################################################

/**
 * Wait until the browser successfully loads an image from the url
 * @param src
 * @returns {Promise<any>}
 */
function imageLoaded (src) {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => resolve({src: src, status: 'ok'})
    img.onerror = () => resolve({src: src, status: 'error'})
    
    img.src = src
  })
}

//Example: <img src='https://assets-cdn.github.com/images/modules/logos_page/GitHub-Logo.png'>

imageLoaded('https://assets-cdn.github.com/images/modules/logos_page/GitHub-Logo.png').then(res => {
  console.log(`Success`)
}).catch(e => {
  console.error(`Error`)
})

//####################################################################################################

/**
 * Get the actual width of an element; It takes style of children into consideration;
 * Total width: width + margin - padding + border
 * @param selector => id or class name
 * @returns {*}
 */

function getNetElementWidth (selector) {
  let elem = document.querySelectorAll(selector),
    total = 0
  
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return null
  }
  
  elem && Object.keys(elem).length > 0 && Object.keys(elem).forEach((i) => {
    let style = elem[i].currentStyle || window.getComputedStyle(elem[i]),
      width = elem[i].offsetWidth,
      margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
      padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
      border = parseFloat(style.borderLeftWidth) +
        parseFloat(style.borderRightWidth)
    total += (width + margin - padding + border)
  })
  return total
}

//Example:
console.log(getNetElementWidth('#logo'))

//####################################################################################################

/**
 * Generates a lengthy random number
 * @returns {number}
 */
function rand () {
  return (Math.floor(Math.random() * 100000000) + 9999999999999) +
    Math.random()
}

//Example:
console.log(rand())

//####################################################################################################

/**
 * Strip HTML Tags from a string input
 * @param input; string
 * @param allowed; <img> or <span><body>
 * @returns {string}
 */
function stripTags (input = '', allowed = '') {
  allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('')
  let tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
  let commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi
  return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
    return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''
  })
}

//Example:
console.log(stripTags(`<img src='https://assets-cdn.github.com/images/modules/logos_page/GitHub-Logo.png'>`, `<img><span>`))

//####################################################################################################

/**
 * Replace all occurrences of a string
 * @param str
 * @param find
 * @param replace
 * @returns {string | void | *}
 */
function replaceAll (str, find, replace) {
  return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi'), replace)
}

//Example:
console.log(replaceAll('this is a test but this is another test too', 'this', 'that'))

//####################################################################################################

/**
 * URL Sanitizer
 * Encodes and decodes url parameters
 * @param str
 * @returns {{encode: string, decode: string}}
 */
function urlSanitizer (str) {
  if (!str) {
    str = ''
  }
  return {
    encode: encodeURIComponent(str.replace(/\\\//g, '')).replace(/%20/g, '+'),
    decode: decodeURIComponent(str.replace(/\+/g, '%20')),
  }
}

//Example:
console.log(urlSanitizer(`https://www.google.co.in/search?ei=abc&q=test+test`))

//####################################################################################################

/**
 * Return only a Numeric value from the inputted string
 * @param number
 * @param allowDecimal
 * @param pattern
 * @returns Number
 */
function onlyNumber (number = null, allowDecimal = false, pattern = /[^1-9]/g) {
  if (!isNaN(number)) {
    return number
  }
  if (allowDecimal) {
    pattern = /[^1-9.]/g
  }
  return number.replace(new RegExp(pattern, 'gi'), '')
}

//Example:
console.log(onlyNumber(`test abc 124#$' xyz`))

//####################################################################################################

/**
 * Array to toObject
 * @param array
 * @returns {{}}
 */
function toObject (array) {
  if (typeof array === 'undefined' || !array || array.length < 1) {
    return {}
  }
  let k = {}
  for (let i = 0; i < array.length; ++i) {
    if (array[i] !== undefined) {
      k[i] = array[i]
    }
  }
  return k
}

//Example:
console.log(toObject([3, 5, 6]))

//####################################################################################################

/**
 * Strip a character from the beginning and end of the string
 * @param string
 * @param search
 */
function rtrim (string, search = '') {
  string = string.toString()
  if (typeof string === 'undefined' || string === null) {
    return ''
  }
  if (search === '') {
    return string.trim()
  }
  let regex = new RegExp('^' + search + '+|' + search + '+$', 'g')
  return string.replace(regex, '').trim()
}

//Example:
let animal = ' cat  '
console.log(rtrim(animal))
//Output:cat

let planet = 'sunsunearthsun'
console.log(rtrim(planet))
//Output:earth

//####################################################################################################

/**
 * Get/manipulate url, parameters, hashes
 *
 * get: returns parameter(s) in a url as an object; if url is empty current url is considered; if param is empty all url parameters are returned as an object
 * getUrlWithoutHash: strips hash and return url; if url is empty current url is considered;
 * getHash: returns the hash value of an url as an object; if url is empty current url is considered;
 * parseHash: parses and returns multiple hash values of an url as an object; if url is empty current url is considered; if param is empty all url parameters are returned as an object
 * removeHash: remove hash from the address bar url
 * getUrlPath: get url location pathname
 *
 * @type {{get({param?: *, url?: *}): *, getUrlWithoutHash({url?: *}): *, getHash: urls.getHash, parseHash({param?: *, url?: *}): *, removeHash(): void, getUrlPath(): *}}
 */

let urls = {
  get ({param = '', url = ''}) {
    let data = {}
    if (url === '') {
      url = window.location.href
    }
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      data[key] = decodeURI(value)
    })
    
    if (param === '') {
      return data
    }
    if (typeof data[param] === 'undefined') {
      return null
    }
    return data[param]
  },
  
  getUrlWithoutHash ({url = ''}) {
    if (url !== '') {
      let hash = url.split('#')[0]
      if (hash) {
        return hash
      }
      else {
        return null
      }
    }
    return window.location.href.split('#')[0]
  },
  
  getHash: function ({url = ''}) {
    if (url !== '') {
      let hash = url.split('#')[1]
      if (hash) {
        return hash
      }
      else {
        return null
      }
    }
    return location.hash.replace('#', '').trim()
  },
  
  parseHash ({param = '', url = ''}) {
    let urlDATA = ''
    if (url !== '') {
      urlDATA = url
    }
    let hash = urls.getHash({url: urlDATA})
    if (hash === '') {
      return null
    }
    let pieces = hash.split('&'),
      data = {}, i, parts
    for (i = 0; i < pieces.length; i++) {
      parts = pieces[i].split('=')
      if (parts.length < 2) {
        parts.push('')
      }
      data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1])
    }
    if (param === '') {
      return data
    }
    if (typeof data[param] === 'undefined') {
      return null
    }
    return data[param]
  },
  
  removeHash () {
    window.location.replace('#')
  },
  
  getUrlPath () {
    return window.location.pathname
  }
}

//Example:
console.log(urls.get({}))
//Output: {param: "value1", q: "hey"}

console.log(urls.get({url: 'http://www.example.com?t=a&p=s'}))
//Output: {t: "a", p: "s"}

console.log(urls.parseHash({url: 'http://www.example.com#test1=var1&test2=var2'}))
//Output: {test1: "var1", test2: "var2"}

console.log(urls.getUrlPath())
//Output: '/path1/path2'

//####################################################################################################

/**
 * Sanitize html tags
 * escapes and unescapes html tags
 *
 * @param str
 * @returns {{escape: string, unescape: string}}
 */
function htmlSanitize (str = '') {
  return {
    escape: str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;'),
    
    unescape: str
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
  }
}

//Example:
console.log(htmlSanitize('<html>').escape)
//Output: &lt;html&gt;

console.log(htmlSanitize('&lt;html&gt;').unescape)
//Output: <html>

//####################################################################################################

/**
 * Checks if the device is touch enabled
 *
 * @returns {boolean}
 */
function isTouchDevice () {
  return (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0))
}

//####################################################################################################

/**
 * Checks if an iOS device
 *
 * @returns {boolean}
 */
function isiOS () {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
}

//####################################################################################################
/**
 * Checks whether the variable is a function
 *
 * @param fn
 * @returns {*|boolean}
 */
function isFunction (fn) {
  let getType = {}
  return fn && getType.toString.call(fn) ===
    '[object Function]'
}

//####################################################################################################
/**
 * Checks whether the variable is an Array
 *
 * @param arr
 * @returns {arg is Array<any>}
 */
function isArray (arr) {
  if (!Array.isArray) {
    Array.isArray = function (arg) {
      return Object.prototype.toString.call(arg) === '[object Array]'
    }
  }
  return Array.isArray(arr)
}

//####################################################################################################
/**
 * Checks whether the variable is an isObject
 *
 * @param obj
 * @returns {boolean}
 */

function isObject (obj) {
  if (obj === null) { return false}
  return ((typeof obj === 'function') || (typeof obj === 'object'))
}

//####################################################################################################
/**
 * Checks whether the variable is a JSON Object
 *
 * @param string
 * @returns {*}
 */
function isJSON (string) {
  if (typeof string !== 'string') {
    string = JSON.stringify(string)
  }
  
  try {
    let o = JSON.parse(string)
    if (o && typeof o === 'object') {
      return o
    }
  }
  catch (e) { }
  
  return false
}

//####################################################################################################

/**
 * Changes the url hash in the address bar and pushes the same in the url history
 *
 * @param param
 */
function changeURLHash (param) {
  if (param === 'undefined' || param == null) {
    param = ''
  }
  else {
    param = '#' + param
  }
  let scrollV, scrollH, loc = window.location
  if ('pushState' in history) {
    history.pushState('', document.title, loc.pathname + loc.search + param)
  }
  else {
    scrollV = document.body.scrollTop
    scrollH = document.body.scrollLeft
    loc.hash = param
    document.body.scrollTop = scrollV
    document.body.scrollLeft = scrollH
  }
}

//Example:
changeURLHash('test_param')

//Output: http://www.example.com#test_param

//####################################################################################################

/**
 * Wait until an element is loaded into the DOM
 *
 * @param selector: eg: input#id
 * @param callback, callback function to execute after element is successfully loaded
 * @param callback_beforeload
 * @param time, time interval
 * @returns {*}
 */
function waitForElementLoad ({selector, callback = () => {}, callback_beforeload = () => {}, time = 500}) {
  if (!isFunction(callback)) {
    return false
  }
  if (document.querySelector(selector) != null) {
    callback()
    return selector
  }
  else {
    setTimeout(function () {
      waitForElementLoad({selector, callback, time, callback_beforeload})
    }, time)
  }
  
  if (isFunction(callback_beforeload)) {
    callback_beforeload()
  }
}

//Example:
waitForElementLoad({
  selector: '#divID',
  callback: () => {
    console.log(`Element is loaded into the DOM`)
  },
  time: 200,
  beforeload_callback: () => {
    console.log(`Waiting for the element to load`)
  }
})

//####################################################################################################
