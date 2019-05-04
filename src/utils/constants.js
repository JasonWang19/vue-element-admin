'use strict'

export const MODE = {
  EDIT: 'edit',
  CREATE: 'create'
}

export const SHOP_TYPE = {
  RESTAURANT: 'restaurant',
  STORE: 'store'
}

export const SHOP_ROLES = {
  owner: { text: 'Owner', value: 'shop_owner' },
  admin: { text: 'Administrator', value: 'shop_admin' },
  user: { text: 'User', value: 'shop_worker' }
}

export const RESTAURANT_TYPE = {
  single: { key: 'single', value: 'single' },
  chain: { key: 'chain', value: 'chain' }
}

export const SUPPORT_COUNTRIES = {
  cn: { key: 'cn', value: 'cn', phoneCode: '86' },
  sg: { key: 'sg', value: 'sg', phoneCode: '65' }
}
