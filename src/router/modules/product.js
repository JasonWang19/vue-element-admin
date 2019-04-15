/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const productRouter = {
  path: '/product',
  component: Layout,
  redirect: '/product/menu',
  // alwaysShow: true, // will always show the root menu
  name: 'Product',
  meta: {
    title: 'Product',
    icon: 'clipboard'
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
