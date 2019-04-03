/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const productRouter = {
  path: '/product',
  component: Layout,
  redirect: '/product/menu',
  name: 'Product',
  meta: {
    title: 'Product',
    icon: 'table'
  },
  children: [
    {
      path: 'menu',
      component: () => import('@/views/product/menu'),
      name: 'menu',
      meta: { title: 'menu' }
    }
  ]
}
export default productRouter
