module.exports = function getToken(o) {
  var obj = Object.assign({}, o)
  var empty = true
  var arr = []
  var temp = ''
  var result = ''

  for (var key in obj) {
    temp = key + '=' + obj[key]
    arr.push(temp)
    empty = false
  }

  arr.sort()
  if (empty) {
    result = 'error'
  } else {
    arr.forEach(item => {
      result += item
    })
    result += 'c60de7822a0cee7d6bd152bc9c985000'
  }

  return Model.Utils.md5(result)
}