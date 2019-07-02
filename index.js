import {createElement, useMemo, Children} from 'react'
import pathToRegexp from 'path-to-regexp'

/**
 * Router routes things.
 */

export function Router({children, location, ...props}) {
  assert(location, 'Router "location" property is missing')

  const routes = useMemo(() => addRoutes(children), [children])
  return renderMatch(routes, location, props)
}

/**
 * Route does absolutely nothing :).
 */

export function Route() {
  assert(false, 'Route should not be rendered')
}

function addRoutes(nested, parentRoute, routes = {}) {
  Children.forEach(nested, el => {
    const {path, component, children, ...routeProps} = el.props
    assert(component, `Route "component" property is missing for path "${path}"`)

    const render = (params, routerProps, children) => {
      const finalProps = {...routerProps, ...routeProps, children, params}
      const node = createElement(component, finalProps)

      return parentRoute
        ? parentRoute.render(params, routerProps, node)
        : node
    }

    const route = createRoute(path, parentRoute, render)
    routes[route.path] = route

    if (!children) return
    addRoutes(children, route, routes)
  })

  return routes
}

/**
 * Create route.
 */

function createRoute(path, parentRoute, render) {
  path = cleanPath(normalizePath(path, parentRoute))

  const route = {path, render, params: []}
  route.regexp = pathToRegexp(path, route.params)
  return route
}

/**
 * Normalize path based on the parent.
 */

function normalizePath(path, parentRoute) {
  if (!path) return parentRoute ? parentRoute.path : '/'
  if (path[0] === '/') return path  // "/" signifies an absolute route
  if (parentRoute == null) return path  // no need for a join
  return `${parentRoute.path}/${path}` // join
}

/**
 * Clean path by stripping subsequent "//"'s. Without this
 * the user must be careful when to use "/" or not, which leads
 * to bad UX.
 */

function cleanPath(path) {
  return path.replace(/\/\//g, '/')
}

/**
 * Render match route.
 */

function renderMatch(routes, location, routerProps) {
  for (const path in routes) {
    const route = routes[path]
    const params = match(route, location)
    if (!params) continue

    return route.render(params, routerProps)
  }

  return null
}

/**
 * Check route match location.
 * Returns params if match.
 */

function match(route, location) {
  const res = route.regexp.exec(location)
  if (!res) return

  return route.params.reduce((params, p, i) => {
    const val = res[i + 1]
    params[p.name] = isString(val) ? decodeURIComponent(val) : val
    return params
  }, {})
}

function isString(s) {
  return typeof s === 'string'
}

function assert(e, msg) {
  if (!e) throw new Error(`react-enroute: ${msg}`)
}
