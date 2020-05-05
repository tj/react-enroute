# react-enroute

Simple React router with a small footprint for modern browsers. The lib is not
replacement for react-router, just a smaller simpler alternative.

See [path-to-regexp](https://github.com/pillarjs/path-to-regexp#usage)
for matching pattern rules and options. Check
[encode and decode](https://github.com/pillarjs/path-to-regexp#match)
if you need it.

Router size [limited](https://github.com/ai/size-limit) to **1.8 KB**
(all deps, minified and gzipped).

## Installation

```console
yarn add react-enroute
```

or

```console
npm install react-enroute
```

## Usage

No nesting:

```js
<Router location='/pets/42'>
  <Index/>
  <Users path='/users'/>
  <User path='/users/:id'/>
  <Pets path='/pets'/>
  <Pet path='/pets/:id'/>
  <NotFound path='(.*)'/>
</Router>
```

Nesting and options:

```js
const RouterOptions = {decode: decodeURIComponent}

<Router location='/users/caf%C3%A9' options={RouterOptions}>
  <Main/>                     // '/'

  <Users path='/users'>
    <AllUsers/>               // '/users'
    <User path=':id'/>        // '/users/:id'
  </Users>
    
  <Pets path='/pets'>
    <Pet path=':id'/>
    <MyPets path='/my-pets'/> // absolute path
  </Pets>

  <NotFound path='(.*)'/>
</Router>
```

Following route with the same full path overrides previous. Matching goes
from top to bottom, so more general rules coming first take precedence. You
should put more concrete rules above catch-all.

Right order:

```js
<Router>
  <Mike path='mike'/>
  <OtherPerson path=':name'/>
  <NotFound path='(.*)'/>
</Router>
```

Not found page (404) should be the last.

Paths may not start with `/`, the name-based syntax is ok:

```js
<Router location='pets'>
  <Index/>               // use '' or '/' for index location
  <Users path='users'/>
  <Pets path='pets'/>
</Router>
```

## Utils

### genLocation (alias: loc)

Generate location based on a path and params.

```js
genLocation('/users/:id', {id: '42'}) // => '/users/42'
loc('/pets/:id', {id: '123'}) // => '/pets/123'
```

### isPath

Check if location matches path.

```js
isPath('/users/:id', '/users/42') // => true
```

### findPath

Search path by location.

```js
findPath(['/users', '/users/:id'], '/users/42')
/* => {
  path: '/users/:id',
  params: {id: '42'},
} */
```

### findPathValue

Search over object whose keys are paths.

```js
findPathValue({
 '/users': UserListToolbar,
 '/users/:id': UserToolbar,
}, '/users/42')
/* => {
 path: '/users/:id',
 value: UserToolbar,
 params: {id: '42'},
} */
```

## Badges

![](https://img.shields.io/badge/license-MIT-blue.svg)
![](https://img.shields.io/badge/status-stable-green.svg)
[![](http://apex.sh/images/badge.svg)](https://apex.sh/ping/)

---

> [tjholowaychuk.com](http://tjholowaychuk.com) &nbsp;&middot;&nbsp;
> GitHub [@tj](https://github.com/tj) &nbsp;&middot;&nbsp;
> Twitter [@tjholowaychuk](https://twitter.com/tjholowaychuk)
