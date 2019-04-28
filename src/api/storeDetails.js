import request from '@/utils/request'

export function create(data) {
  console.log('prepare create restaurant: ', data)
  return request({
    url: '/restaurant',
    method: 'post',
    data
  })
}

export function update(data) {
  console.log('prepare update restaurant: ', data)
  return request({
    url: `/restaurant/${data.id}`,
    method: 'put',
    data
  })
}

export function getStoreInfo(id) {
  console.log('get store id in api: ', id)
  return request({
    url: `/restaurant/${id}`,
    method: 'get'
  })
}

// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post'
//   })
// }

