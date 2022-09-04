export default function createElement (type, props, ...children) {
  // 解决...剩余参数，收集完后中间有数据的情况[[], []]
  const newChildren = flat([...children])
  const childrenvDom = newChildren.reduce((result, item) => {
    if (item !== false && item !== true && item !== null) {
      if (item instanceof Object) {
        result.push(item)
      } else if (typeof item ) {
        result.push(createElement('text', { textContent: item }))
      }
    }
    return result
  }, [])
  return {
    type,
    props: Object.assign({ children: childrenvDom }, props),
    children: childrenvDom
  }
}

const flat = (arr) => {
  const newArr = []
  function getItem (arr) {
    arr.forEach(item => {
      if (Array.isArray(item)) {
        getItem(item)
      } else {
        newArr.push(item)
      }
    })
  }
  getItem(arr)
  return newArr
}