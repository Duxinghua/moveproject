import { get, post } from './request'
export const activityListApi = (data) => post('/client/Activity/activityList', data)
export const activityCateApi = (data) => post('/client/Activity/activityCate', data)
export const activeDetailApi = (data) => post('/client/Activity/detail', data)
export const orderLisApi = (data) => get(`/mall/order/orderLis?status=${data}`)
