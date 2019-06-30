
# react-enroute

 Simple React router with a small footprint for modern browsers. This package is not meant to be a drop-in replacement for react-router, just a smaller simpler alternative.

 See [path-to-regexp](https://github.com/pillarjs/path-to-regexp) for path matching, this is the same library used by Express.

## Installation

 ```
 $ npm install react-enroute
 ```

## Examples

No nesting:

```js
ReactDOM.render(<Router {...state}>
  <Route path="/" component={Index} />
  <Route path="/users" component={Users} />
  <Route path="/users/:id" component={User} />
  <Route path="/pets" component={Pets} />
  <Route path="/pets/:id" component={Pet} />
  <Route path="(.*)" component={NotFound} />
</Router>, document.querySelector('#app'))
```

Some nesting:

```js
ReactDOM.render(<Router {...state}>
  <Route component={Index} />

  <Route path="/users" component={Users}>
    <Route path=":id" component={User} />
  </Route>

  <Route path="/pets" component={PetsContainer}>
    <Route component={Pets} />
    <Route path=":id" component={Pet} />
  </Route>

  <Route path="(.*)" component={NotFound} />
</Router>, document.querySelector('#app'))
```

Moar nesting:

```js
ReactDOM.render(<Router {...state}>
  <Route path="/" component={Index}>
    <Route path="users" component={Users}>
      <Route path=":id" component={User} />
    </Route>

    <Route path="pets" component={Pets}>
      <Route path=":id" component={Pet} />
    </Route>
  </Route>

  <Route path="(.*)" component={NotFound} />
</Router>, document.querySelector('#app'))
```

## Badges

![](https://img.shields.io/badge/license-MIT-blue.svg)
![](https://img.shields.io/badge/status-stable-green.svg)
[![](http://apex.sh/images/badge.svg)](https://apex.sh/ping/)

---

> [tjholowaychuk.com](http://tjholowaychuk.com) &nbsp;&middot;&nbsp;
> GitHub [@tj](https://github.com/tj) &nbsp;&middot;&nbsp;
> Twitter [@tjholowaychuk](https://twitter.com/tjholowaychuk)
