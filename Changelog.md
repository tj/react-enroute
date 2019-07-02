### 3.0.1

- back to old behaviour with static routes to prevent reinitialization at
any router render
- fix old router props passed to render
- example update

### 3.0.0

Major changes:
- react-enroute uses hooks from this version. Min supported React version is **16.8** now.
- depending on `path-to-regexp` directly instead of outdated enroute.
Check [path-to-regexp changelog](https://github.com/pillarjs/path-to-regexp/blob/master/History.md)
for update details (2.x and 3.x). One noticeable change is removed wildcard
asterisk (`*`) -- use `(.*)` instead.

Others:
- esm module build added
- `@babel/runtime` instead of built-in helper functions 
- building with `babel@7` and `preset-env`
- speed up route matching by pre-creating regexp's

### 2.0.0

- React 16 fixes
- Extra route props are passed to component now
- Index route

Child route with the same path has higher priority now. In very rare cases it can be backward incompatible so major version was bumped.   

### 1.0.0

- Initial release
