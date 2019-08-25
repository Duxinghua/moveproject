import { post } from './request'
export const activityListApi = (data) => post('/client/Activity/activityList', data)
export const activityCateApi = (data) => post('/client/Activity/activityCate', data)
