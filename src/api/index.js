import { post } from './request'
export const activityListApi = (data) => post('/client/Activity/activityList', data)
export const activityCateApi = (data) => post('/client/Activity/activityCate', data)
export const activeDetailApi = (data) => post('/client/Activity/detail', data)
export const ticketListApi = (data) => post('/mall/Ticket/index', data)
export const ticketCateApi = (data) => post('/mall/Ticket/ticketCate', data)
export const ticketDetailApi = (data) => post('/mall/Ticket/detail', data)
