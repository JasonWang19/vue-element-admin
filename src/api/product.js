import request from '@/utils/request'

export function fetchMenu(menuId) {
  console.log('fetchMenu', menuId)
  return request({
    url: `/restaurant/menu/${menuId}`,
    method: 'get'
  })
}

export function updateMenu(data) {
  return request({
    url: '/restaurant/menu',
    method: 'post',
    data
  })
}
