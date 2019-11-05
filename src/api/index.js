import { post, get } from './request'
export const articleAboutus = (data) => post('/client/article/aboutus', data)
export const mallAddressIndex = (data) => get('/mall/address/index?token=' + data.token)
