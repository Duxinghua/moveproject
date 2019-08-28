import axios from 'axios'
import qs from 'qs'

const post = function (url, data = null) {
  return new Promise((resolve, reject) => {
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

const get = function (url, data = null) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url + '?token=' + data.token
    }).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
export { post, get }
