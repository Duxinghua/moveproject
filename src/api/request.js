import axios from 'axios'
import qs from 'qs'
import getSitem from '@/utils/storage'
const post = function (url, data = null) {
  return new Promise((resolve, reject) => {
    if (!data.token) {
      data.token = getSitem.getStr('token')
    }
    axios({
      method: 'post',
      url: url,
      data: qs.stringify(data)
    }).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

const get = function (url) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url
    }).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
export { post, get }
