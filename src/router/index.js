import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Produce from '../pages/produce.vue'
import Detail from '../pages/producedetail.vue'
import Payorder from '../pages/payorder.vue'
import Activitylist from '../pages/activitylist.vue'
import Activitydetail from '../pages/activitydetail.vue'
import Ticket from '../pages/ticket.vue'
import Ticketdetail from '../pages/ticketdetail.vue'
import Ticketpay from '../pages/ticketpay.vue'
import Ticketpaydetail from '../pages/ticketpaydetail.vue'
import Sale from '../pages/sale.vue'
import Join from '../pages/join.vue'
import Mysy from '../pages/mysy.vue'
import Myaddress from '../pages/myaddress.vue'
import AddressList from '../pages/addresslist.vue'
import Mycenter from '../pages/mycenter.vue'
import Company from '../pages/company.vue'
import TickOrderList from '@/pages/tickOrderList'
// import Ticketpay from '../pages/ticketpay.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: 'xbr'
      },
      component: Home
    },
    {
      path: '/produce',
      name: 'product',
      component: Produce
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/payorder',
      name: 'payorder',
      component: Payorder
    },
    {
      path: '/activity',
      name: 'activity',
      meta: {
        title: '活动'
      },
      component: Activitylist
    },
    {
      path: '/activitydetail',
      name: 'activitydetail',
      meta: {
        title: '活动详情'
      },
      component: Activitydetail
    },
    {
      path: '/ticket',
      name: 'ticket',
      meta: {
        title: '门票'
      },
      component: Ticket
    },
    {
      path: '/ticketdetail',
      name: 'ticketdetail',
      meta: {
        title: '门票详情'
      },
      component: Ticketdetail
    },
    {
      path: '/ticketpay',
      name: 'ticketpay',
      component: Ticketpay
    },
    {
      path: '/ticketpaydetail',
      name: 'ticketpaydetail',
      meta: {
        title: '门票订单详情'
      },
      component: Ticketpaydetail
    },
    {
      path: '/sale',
      name: 'sale',
      component: Sale
    },
    {
      path: '/join',
      name: 'join',
      component: Join
    },
    {
      path: '/mysy',
      name: 'mysy',
      component: Mysy
    },
    {
      path: '/myaddress',
      name: 'myaddress',
      component: Myaddress
    },
    {
      path: '/addresslist',
      name: 'addresslsit',
      component: AddressList
    },
    {
      path: '/mycenter',
      name: 'mycenter',
      component: Mycenter
    },
    {
      path: '/company',
      name: 'company',
      component: Company
    },
    {
      path: '/tickOrderList',
      name: 'tickOrderList',
      meta: {
        title: '门票订单'
      },
      component: TickOrderList
    }
    // {
    //   path: '/ticketpay',
    //   name: 'ticketpay',
    //   component: Ticketpay
    // }
  ]
})
