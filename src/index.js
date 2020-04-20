import {cloneElement, Children} from 'react'
import {match} from 'path-to-regexp'


export function Router({
  location,
  options,
  children,
}) {
  const routes = addRoutes(children)
  return renderMatch(routes, location, options)
}

function addRoutes(elements, parent, routes = {}) {
  Children.forEach(elements, element => {
    const route = createRoute(element, parent)
    routes[route.path] = route

    const {children} = element.props
    addRoutes(children, route, routes)
  })

  return routes
}

function createRoute(element, parent) {
  let path = fullPath(element.props.path, parent)
  path = cleanPath(path)
  return {path, parent, element}
}

function fullPath(path, parent) {
  if (!path) return parent ? parent.path : '/' // index route
  if (path[0] === '/') return path // absolute
  if (!parent) return path // root
  return `${parent.path}/${path}`
}

function cleanPath(path) {
  return path.replace(/\/\//g, '/')
}

function renderMatch(routes, location, options) {
  for (const path in routes) {
    const result = match(path, options)(location)
    if (!result) continue

    const route = routes[path]
    return render(route, result.params)
  }

  return null
}

function render(route, params, children) {
  const {element, parent} = route
  const node = cloneElement(element, params, children)

  return parent ? render(parent, params, node) : node
}
