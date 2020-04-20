import {pathToRegexp, compile, match} from 'path-to-regexp'


/**
 * Generate location based on path and params
 * @alias loc

 * genLocation('/users/:id', {id: '42'}) => '/users/42'
 *
 * @param {string} path
 * @param {object} params
 * @param {object=} options - [path-to-regexp](https://github.com/pillarjs/path-to-regexp#usage) options
 * @return {string}
 */

export function genLocation(path, params, options) {
  if (!path) return ""
  return compile(path, options)(params)
}

export {genLocation as loc}

/**
 * Check if location matches path
 *
 * isPath('/users/:id', '/users/42') => true
 *
 * @param {string} path
 * @param {string} location
 * @param {object=} options - [path-to-regexp](https://github.com/pillarjs/path-to-regexp#usage) options
 * @return {boolean}
 */

export function isPath(path, location, options) {
  return !!pathToRegexp(path, null, options).exec(location)
}

/**
 * Search over object whose keys are paths
 *
 * findByLocation({
 *   '/users': UserListToolbar,
 *   '/users/:id': UserToolbar,
 * }, '/users/42')
 * => {
 *   path: '/users/:id',
 *   value: UserToolbar,
 *   params: {id: '42'},
 * }
 *
 * @typedef Result
 * @property {string} path
 * @property {*} value
 * @property {object} params
 *
 * @param {object} obj - keys are paths and values can be any
 * @param {string} location
 * @param {object=} options - [path-to-regexp](https://github.com/pillarjs/path-to-regexp#usage) options
 * @return {Result|undefined}
 */

export function findByLocation(obj, location, options) {
  for (const path in obj) {
    const result = match(path, options)(location)
    if (!result) continue

    const value = obj[path]
    const {params} = result

    return {path, value, params}
  }
}
