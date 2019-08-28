const storage = {
  setObj (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  getObj (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  setStr (key, value) {
    localStorage.setItem(key, value)
  },
  getStr (key) {
    return localStorage.getItem(key)
  },
  remove (key) {
    localStorage.removeItem(key)
  }
}
export default storage
