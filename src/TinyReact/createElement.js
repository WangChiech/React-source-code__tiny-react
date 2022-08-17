export default function createElement (type, props, ...children) {
  const childrenvDom = [...children].reduce((result, item) => {
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