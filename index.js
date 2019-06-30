import React, {Component} from 'react'
import pathToRegexp from 'path-to-regexp'

/**
 * Router routes things.
 */

export class Router extends Component {
  routes = {}

  /**
   * Initialize the router.
   */

  constructor(props) {
    super(props)
    this.addRoutes(props.children)
  }

  /**
   * Add routes.
   */

  addRoutes(routes, parent) {
    React.Children.forEach(routes, r => this.addRoute(r, parent))
  }

  /**
   * Add route.
   */

  addRoute(el, parent) {
    const {path, component, children, ...routeProps} = el.props
    assert(component, `Route ${context(el.props)}is missing the "component" property`)

    const render = (params, renderProps) => {
      const finalProps = {...this.props, ...routeProps, ...renderProps, params}
      const children = React.createElement(component, finalProps)
      return parent ? parent.render(params, {children}) : children
    }

    const route = createRoute(path, parent, render)
    this.routes[route.path] = route

    if (children) this.addRoutes(children, route)
  }

  /**
   * Render the matching route.
   */

  render() {
    const {location} = this.props
    assert(location, `Router "location" property is missing`)

    return renderMatch(this.routes, location)
  }
}

/**
 * Route does absolutely nothing :).
 */

export function Route() {
  assert(false, 'Route should not be rendered')
}

/**
 * Context string for route errors based on the props available.
 */

function context({path, component}) {
  if (path) return `with path "${path}" `
  if (component) return `with component ${component.name} `
  return ''
}

/**
 * Create route.
 */

function createRoute(path, parent, render) {
  path = cleanPath(normalizePath(path, parent))

  const route = {path, render, params: []}
  route.regexp = pathToRegexp(path, route.params)
  return route
}

/**
 * Normalize path based on the parent.
 */

function normalizePath(path, parent) {
  if (!path) return parent ? parent.path : '/'
  if (path[0] === '/') return path  // "/" signifies an absolute route
  if (parent == null) return path  // no need for a join
  return `${parent.path}/${path}` // join
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

function renderMatch(routes, location) {
  for (const path in routes) {
    const route = routes[path]
    const params = match(route, location)
    if (!params) continue

    return route.render(params, {children: null})
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
