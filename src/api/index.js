import { post } from './request'
export const getArticleListApi = (data) => post('/getArticleList', data)
export const activityListApi = (data) => post('/client/Activity/activityList', data)
export const activityCateApi = (data) => post('/client/Activity/activityCate', data)
export const activeDetailApi = (data) => post('/client/Activity/detail', data)
