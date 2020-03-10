const formatTime = timestamp => {
  let time = new Date(timestamp)
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
  let hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
  let minute = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
  return `${year}/${month}/${date} ${hour}:${minute}`
}

module.exports = {
  formatTime: formatTime
}
