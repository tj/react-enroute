import {equal} from 'assert'
import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {Router} from '..'


function Index({children}) {
  return <div>
    <h1>Index</h1>
    {children}
  </div>
}

function Users({children}) {
  return <div>
    <h2>Users</h2>
    {children}
  </div>
}

function User({userId, children}) {
  return <div>
    <h2>User {userId}</h2>
    {children}
  </div>
}

function Pets({children}) {
  return <div>
    <h2>Pets</h2>
    {children}
  </div>
}

function Pet({petId}) {
  return <div>pet {petId}</div>
}

function NotFound() {
  return <div>Not Found</div>
}

function List({items}) {
  return <ul>
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
}


assertJSX(
  "Not found",

  <Router location='/s'>
    <Index/>
  </Router>,

  null,
)

assertJSX(
  "Simple index route",

  <Router location='/'>
    <Index/>
  </Router>,

  <Index/>,
)

assertJSX(
  "Nested route",

  <Router location='/pets'>
    <Index>
      <Pets path='pets'/>
    </Index>
  </Router>,

  <Index>
    <Pets/>
  </Index>,
)

assertJSX(
  "Route props",

  <Router location='/list'>
    <List path='/list' items={['foo', 'bar', 'baz']}/>
  </Router>,

  <List items={['foo', 'bar', 'baz']}/>,
)

assertJSX(
  "Deeply nested route",

  <Router location='/pets/12'>
    <Index>
      <Pets path='pets'>
        <Pet path=':petId'/>
      </Pets>
    </Index>
  </Router>,

  <Index>
    <Pets>
      <Pet petId={12}/>
    </Pets>
  </Index>,
)

assertJSX(
  "Deeply nested route with path part ends with '/'",

  <Router location='/pets/12'>
    <Index>
      <Pets path='pets/'>
        <Pet path=':petId'/>
      </Pets>
    </Index>
  </Router>,

  <Index>
    <Pets>
      <Pet petId={12}/>
    </Pets>
  </Index>,
)

assertJSX(
  "Many deeply nested route",

  <Router location='/users/5'>
    <Index>
      <Pets path='pets'>
        <Pet path=':petId'/>
      </Pets>
      <Users path='users'>
        <User path=':userId'/>
      </Users>
    </Index>
  </Router>,

  <Index>
    <Users>
      <User userId={5}/>
    </Users>
  </Index>,
)

assertJSX(
  "Catch-all",

  <Router location='/something'>
    <Index>
      <Pets path='pets'>
        <Pet path=':petId'/>
      </Pets>

      <Users path='users'>
        <User path=':userId'/>
      </Users>
    </Index>

    <NotFound path='(.*)'/>
  </Router>,

  <NotFound/>,
)

assertJSX(
  "Nested route but index route",

  <Router location='/'>
    <Index>
      <Pets path='pets'/>
    </Index>
  </Router>,

  <Index/>,
)

assertJSX(
  "Shallow routes 1",

  <Router location='/'>
    <Index/>
    <Users path='/users'/>
  </Router>,

  <Index/>,
)

assertJSX(
  "Shallow routes 2",

  <Router location='/users'>
    <Index/>
    <Users path='/users'/>
  </Router>,

  <Users/>,
)

assertJSX(
  "Shallow routes 3",

  <Router location='/users/5'>
    <Index path='/'/>
    <Users path='/users'/>
    <User path='/users/:userId'/>
  </Router>,

  <User userId={5}/>,
)

assertJSX(
  "Many nested routes and params",

  <Router location='/users/5/pets/2'>
    <Index>
      <Users path='users'>
        <User path=':userId'>
          <Pets path='pets'>
            <Pet path=':petId'/>
          </Pets>
        </User>
      </Users>
    </Index>
  </Router>,

  <Index>
    <Users>
      <User userId={5}>
        <Pets>
          <Pet petId={2}/>
        </Pets>
      </User>
    </Users>
  </Index>,
)

assertJSX(
  "Nested index route with path '/'",

  <Router location='/'>
    <Index path='/'>
      <Pets/>
    </Index>
  </Router>,

  <Index>
    <Pets/>
  </Index>,
)

assertJSX(
  "Several nested index routes",

  <Router location='/'>
    <Index>
      <Pets/>
    </Index>
  </Router>,

  <Index>
    <Pets/>
  </Index>,
)

assertJSX(
  "Param overrides route property",

  <Router location='/pets/12'>
    <Index>
      <Pets path='pets'>
        <Pet path=':petId' petId={123}/>
      </Pets>
    </Index>
  </Router>,

  <Index>
    <Pets>
      <Pet petId={12}/>
    </Pets>
  </Index>,
)

assertJSX(
  "Options",

  <Router location='/pets/12/' options={{strict: true}}>
    <Index>
      <Pets path='pets'>
        <Pet path=':petId'/>
      </Pets>
    </Index>
    <NotFound path='(.*)'/>
  </Router>,

  <NotFound/>,
)

assertJSX(
  "decode option",

  <Router location='/users/caf%C3%A9' options={{decode: decodeURIComponent}}>
    <User path='/users/:userId'/>
  </Router>,

  <User userId='café'/>,
)

assertJSX(
  "encode option",

  <Router location='/us%C3%A9rs/42' options={{encode: encodeURI}}>
    <User path='/usérs/:userId'/>
  </Router>,

  <User userId='42'/>,
)

assertJSX(
  "Empty and not defined location should render null",

  <Router>
    <NotFound path='(.*)'/>
  </Router>,

  null,
)

function assertJSX(test, actual, expected) {
  actual = renderToStaticMarkup(actual)
  expected = renderToStaticMarkup(expected)
  equal(actual, expected, test)
}
