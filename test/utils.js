import {deepEqual} from 'assert'
import {loc, isPath, findPath, findPathValue} from '..'


assert(
  "genLocation",
  loc('/users/:id', {id: '42'}),
  '/users/42',
)

assert(
  "isPath",
  isPath('/users/:id', '/users/42'),
  true,
)

assert(
  "findPath",
  findPath(['/users', '/users/:id'], '/users/42'),
  {
    path: '/users/:id',
    params: {id: '42'},
  }
)

assert(
  "findPathValue",
  findPathValue({
    '/users': 'user-list',
    '/users/:id': 'user',
  }, '/users/42'),
  {
    path: '/users/:id',
    value: 'user',
    params: {id: '42'},
  }
)

function assert(test, actual, expected) {
  deepEqual(actual, expected, test)
}
