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
import Sale from '../pages/sale.vue'
import Join from '../pages/join.vue'
import Mysy from '../pages/mysy.vue'
import Myaddress from '../pages/myaddress.vue'
import AddressList from '../pages/addresslist.vue'
import Mycenter from '../pages/mycenter.vue'
import Company from '../pages/company.vue'
// import Ticketpay from '../pages/ticketpay.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
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
      component: Activitylist
    },
    {
      path: '/activitydetail',
      name: 'activitydetail',
      component: Activitydetail
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: Ticket
    },
    {
      path: '/ticketdetail',
      name: 'ticketdetail',
      component: Ticketdetail
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
    }
    // {
    //   path: '/ticketpay',
    //   name: 'ticketpay',
    //   component: Ticketpay
    // }
  ]
})
