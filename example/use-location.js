import {useEffect, useState} from 'react'


const on = (obj, ...args) => obj.addEventListener(...args)
const off = (obj, ...args) => obj.removeEventListener(...args)


// very basic example, do not use
export function useLocation() {
  const [location, setLocation] = useState(window.location.pathname)

  useEffect(() => {
    const updateLocation = () => setLocation(window.location.pathname)

    on(window, 'popstate', updateLocation)
    on(window, 'pushstate', updateLocation)
    on(window, 'replacestate', updateLocation)

    return () => {
      off(window, 'popstate', updateLocation)
      off(window, 'pushstate', updateLocation)
      off(window, 'replacestate', updateLocation)
    }
  }, [])

  return location
}

export function setLinksHandler() {
  const push = e => {
    if (
      e.defaultPrevented ||
      e.button ||
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
    ) return

    const a = e.target.closest('a')
    if (!a || a.target === '_blank') return

    const {origin} = window.location
    if (a.href.indexOf(origin)) return

    e.preventDefault()

    const url = a.href.slice(origin.length)
    history.pushState(null, "", url)
    window.dispatchEvent(new Event('pushstate')) // hack to notify
  }

  on(document.documentElement, 'click', push)
  return () => off(document.documentElement, 'click', push)
}
