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

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

