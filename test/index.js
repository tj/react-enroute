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


assert(
  "No location",

  <Router location='/s'>
    <Index/>
  </Router>,

  null,
)

assert(
  "Simple index route",

  <Router location='/'>
    <Index/>
  </Router>,

  <Index/>,
)

assert(
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

assert(
  "Route props",

  <Router location='/list'>
    <List path='/list' items={['foo', 'bar', 'baz']}/>
  </Router>,

  <List items={['foo', 'bar', 'baz']}/>,
)

assert(
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

assert(
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

assert(
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

assert(
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

assert(
  "Nested route but index route",

  <Router location='/'>
    <Index>
      <Pets path='pets'/>
    </Index>
  </Router>,

  <Index/>,
)

assert(
  "Shallow routes 1",

  <Router location='/'>
    <Index/>
    <Users path='/users'/>
  </Router>,

  <Index/>,
)

assert(
  "Shallow routes 2",

  <Router location='/users'>
    <Index/>
    <Users path='/users'/>
  </Router>,

  <Users/>,
)

assert(
  "Shallow routes 3",

  <Router location='/users/5'>
    <Index path='/'/>
    <Users path='/users'/>
    <User path='/users/:userId'/>
  </Router>,

  <User userId={5}/>,
)

assert(
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

assert(
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

assert(
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

assert(
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

assert(
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

function assert(test, actual, expected) {
  actual = renderToStaticMarkup(actual)
  expected = renderToStaticMarkup(expected)
  equal(actual, expected, test)
}
