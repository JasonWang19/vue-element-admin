import request from '@/utils/request'

export function login(data) {
  const bodyFormData = new FormData()
  bodyFormData.set('username', data.username)
  bodyFormData.set('password', data.password)
  bodyFormData.set('grant_type', 'password')
  const headers = {
    'Authorization': 'Basic SU9yZGVyV2ViQ2xpZW50SWQ6NnhzdmxuaTNjMG50Yng0YzA3bmQ3YnZ4Z2Z0ZXkxa2w='
  }
  return request({
    url: '/oauth/token',
    method: 'post',
    data: bodyFormData,
    headers
  })
}
export function getInfo(info) {
  console.log('get info in api: ', info)
  return request({
    url: '/user/' + info.username,
    method: 'get'
  })
}

export function signup(info) {
  console.log('sign up info', info)
  return request({
    url: '/user/signup',
    method: 'post',
    data: info
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function linkStore({ username, shopType, shopId }) {
  console.log('api call to link store: ', username, shopType, shopId)
  return request({
    url: `/user/hack/${username}/${shopType}/${shopId}/owner`,
    method: 'put'
  })
}

export function checkUsername(username) {
  console.log('check if username still available', username)
  return request({
    url: `/user/check/username/${username}`,
    method: 'get'
  })
}

export function assignPermission({
  username,
  data
}) {
  return request({
    url: `/${username}/permission`,
    method: 'put',
    data
  })
}
