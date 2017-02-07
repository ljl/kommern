export default {
  // TODO: Add browser check for sessionStorage availability
  get (name) {
    const data = window.sessionStorage.getItem(name)
    let item
    try {
      item = JSON.parse(data)
    } catch (e) {
      return data
    }
    return item
  },
  set (name, data) {
    let item = data
    if (typeof data === 'object') {
      item = JSON.stringify(data)
    }
    window.sessionStorage.setItem(name, item)
  }
}
