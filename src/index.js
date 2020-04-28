import {cloneElement, Children} from 'react'
import {findPathValue} from './utils'
import {warnNotFound} from './debug'


export {genLocation, loc, isPath, findPath, findPathValue} from './utils'

export function Router({
  location,
  options,
  children,
}) {
  if (location == null) return null

  const routes = addRoutes(children, {})
  return renderMatch(routes, location, options)
}

function addRoutes(elements, routes, parent) {
  Children.forEach(elements, element => {
    const route = createRoute(element, parent)
    routes[route.path] = route

    const {children} = element.props
    addRoutes(children, routes, route)
  })

  return routes
}

function createRoute(element, parent) {
  const path = fullPath(element.props.path, parent)
    .replace(/\/$/, '') // remove trailing slash

  return {path, parent, element}
}

function fullPath(path, parent) {
  if (!path) return parent ? parent.path : '' // index route
  if (!parent || path[0] === '/') return path // root or absolute
  return parent.path + '/' + path
}

function renderMatch(routes, location, options) {
  const result = findPathValue(routes, location, options)
  if (result) return render(result.value, result.params)

  warnNotFound(routes, location)
  return null
}

function render(route, params, children) {
  const {element, parent} = route
  const node = cloneElement(element, params, children)

  return parent ? render(parent, params, node) : node
}
