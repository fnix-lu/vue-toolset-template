import Cookies from 'js-cookie'

const TOKEN = 'token'

// cookies
export function setToken (token) {
  Cookies.set(TOKEN, token)
}

export function getToken () {
  return Cookies.get(TOKEN)
}

export function removeToken () {
  Cookies.remove(TOKEN)
}

// local storage

// session storage
