import {useEffect, useState, useCallback} from 'react'


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

export function usePush() {
  return useCallback(location => {
    history.pushState(null, "", location)
    window.dispatchEvent(new Event('pushstate')) // hack
  }, [])
}
