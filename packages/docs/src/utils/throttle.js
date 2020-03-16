/**
 * Adapted from @makotot on Github
 * via: https://github.com/makotot/react-reading-progress
 */
const throttle = (fn, threshold = 100) => {
  let last
  let timer

  return () => {
    const now = +new Date()
    const timePassed = !!last && now < last + threshold

    if (timePassed) {
      clearTimeout(timer)

      timer = setTimeout(() => {
        last = now
        fn()
      }, threshold)
    } else {
      last = now
      fn()
    }
  }
}

export default throttle
