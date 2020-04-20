### 4.0.0

**Major changes:**

- new syntax to make route structure more clean and simple

```js
<Router location='/users/42'>
  <Index>
    <Users path='users'>
      <User path=':id'/>
    </Users>
  </Index>
<Router/>
```

If you have a good use case when the new syntax is inconvenient please let me
know. It's not hard to add old behaviour as option, but it will make the code
less simple and increase the size of the library.  

- router props will not be passed to components anymore  
- path params are direct properties now  
They were in `params` object before. In most cases things like id preferably
to be direct properties. This is more expected, less error prone and makes code
a bit cleaner. Sometimes it can help in optimization pure and memo components
too. Please be care with possible property conflicts while updating to 4.0.0.
- `path-to-regexp` upgraded to 6.1.0  
Check [releases page](https://github.com/pillarjs/path-to-regexp/releases)
to know major changes in a path regexp's. Tree shaking should work better with
this lib now!
- location and params will not be automatically URI-decoded anymore  
You can use `decode` and `encode` in options (see
[path-to-regexp readme](https://github.com/pillarjs/path-to-regexp#match))

**Others**

- TypeScript definitions
- `genLocation` (alias: `loc`), `isPath`, `findPath`, `findPathValue` utils
- matching [options](https://github.com/pillarjs/path-to-regexp#usage)
- `@babel/runtime` removed from dependencies, lib deps on path-to-regexp only now
- simplify, reduce generated code size
- router components can be changed between renders
- fix bug router used old component properties during next renders
- undefined location will not throw error anymore
- react-native package field
- add source files to package
- control library size with [Size Limit](https://github.com/ai/size-limit)

### 3.0.2

- pass `location` property to component

### 3.0.1

- back to old behaviour with static routes to prevent reinitialization at
any router render
- fix old router props passed to render
- example update

### 3.0.0

**Major changes:**
- react-enroute uses hooks from this version. Min supported React version is **16.8** now.
- depending on `path-to-regexp` directly instead of outdated enroute.
Check [path-to-regexp changelog](https://github.com/pillarjs/path-to-regexp/blob/master/History.md)
for update details (2.x and 3.x). One noticeable change is removed wildcard
asterisk (`*`) -- use `(.*)` instead.

**Others:**
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
