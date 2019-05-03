import Cookies from 'js-cookie'

const TokenKey = 'Token'
const UsernameKey = 'Username'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUsername() {
  return Cookies.get(UsernameKey)
}

export function getAuth() {
  return {
    token: Cookies.get(TokenKey),
    username: Cookies.get(UsernameKey)
  }
}

export function setAuth(token, username) {
  return Cookies.set(TokenKey, token) && Cookies.set(UsernameKey, username)
}

export function removeAuth() {
  return Cookies.remove(TokenKey) && Cookies.remove(UsernameKey)
}
