import request from '@/utils/request'

// @JsonProperty("userId")
// private String userId = null;
// @JsonProperty("tableId")
// private String tableId = null;
// @JsonProperty("items")
// @Valid
// private List<Pair<String, Integer>> items = new ArrayList<>();
// @JsonProperty("subtotal")
// private BigDecimal subtotal = null;
// @JsonProperty("couponId")
// private String couponId = null;
// @JsonProperty("save")
// private BigDecimal save = null;
// @JsonProperty("tax")
// private BigDecimal tax = null;
// @JsonProperty("tips")
// private BigDecimal tips = null;
// @JsonProperty("total")
// private BigDecimal total = null;
// @JsonProperty("notes")
// private String notes = null;

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

