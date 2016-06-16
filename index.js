
import React, { Component } from 'react'
import enroute from 'enroute'

function assert(e, msg) {
  if (!e) throw new Error(`react-enroute: ${msg}`)
}

/**
 * Router routes things.
 */

export class Router extends Component {
  routes = {};

  /**
   * Initialize the router.
   */

  constructor(props) {
    super(props)
    this.addRoutes(props.children)
    this.router = enroute(this.routes)
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
    const { location, ...props } = this.props
    const { path, component, children } = el.props

    assert(typeof path == 'string', `Route ${context(el.props)}is missing the "path" property`)
    assert(component, `Route ${context(el.props)}is missing the "component" property`)

    function render(params, renderProps) {
      const finalProps = { ...props, ...renderProps, location, params }
      const children = React.createElement(component, finalProps)
      return parent ? parent.render(params, { children }) : children
    }

    const route = normalizeRoute(path, parent)
    if (children) this.addRoutes(children, { route, render })

    this.routes[cleanPath(route)] = render
  }

  /**
   * Render the matching route.
   */

  render() {
    const { location } = this.props
    assert(location, `Router "location" property is missing`)
    return this.router(location, { children: null })
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

function context({ path, component }) {
  if (path) return `with path "${path}" `
  if (component) return `with component ${component.name} `
  return ''
}

/**
 * Normalize route based on the parent.
 */

function normalizeRoute(path, parent) {
  if (path[0] == '/') return path  // "/" signifies an absolute route
  if (parent == null) return path  // no need for a join
  return `${parent.route}/${path}` // join
}

/**
 * Clean path by stripping subsequent "//"'s. Without this
 * the user must be careful when to use "/" or not, which leads
 * to bad UX.
 */

function cleanPath(path) {
  return path.replace(/\/\//g, '/')
}
