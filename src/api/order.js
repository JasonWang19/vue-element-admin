import request from '@/utils/request'

// "userId"
// "tableId"
// "items"
// "subtotal"
// "couponId"
// "save"
// "tax"
// "tips"
// "total"
// "notes"

export function getRestaurantOrder({ restaurantId, status }) {
  console.log('get restaurant order in api: ', restaurantId, status)
  return request({
    url: `/restaurant/order/restaurant/${restaurantId}/status/${status}`,
    method: 'get'
  })
}

export function getRestaurantOrderFull({ restaurantId, status, start, end, page, size }) {
  console.log('get restaurant order full in api: ', restaurantId, status, start, end, page, size)
  const params = {}
  if (status) { params['status'] = status }
  if (start) { params['start'] = start }
  if (end) { params['end'] = end }
  if (page) { params['page'] = page }
  if (size) { params['size'] = size }
  return request({
    url: `/restaurant/order/restaurant/${restaurantId}`,
    method: 'get',
    params
  })
}

export function getOrderById({ orderId }) {
  console.log('get order by id', orderId)
  return request({
    url: `/restaurant/order/${orderId}`,
    method: 'get'
  })
}

