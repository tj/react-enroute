
import React, { Component } from 'react'
import { Router, Route } from '..'
import assert from './assert'

function Index({ children }) {
  return <div>
    <h1>Index</h1>
    {children}
  </div>
}

function Users({ children }) {
  return <div>
    <h2>Users</h2>
    {children}
  </div>
}

function User({ children, params: { userId } }) {
  return <div>
    <h2>User {userId}</h2>
    {children}
  </div>
}

function Pets({ children }) {
  return <div>
    <h2>Pets</h2>
    {children}
  </div>
}

function Pet({ params: { petId } }) {
  return <div>pet {petId}</div>
}

function NotFound() {
  return <div>Not Found</div>
}

function List({ items }) {
  return <ul>{items.map((item, i) => <li key={i}>{item}</li>)}</ul>
}

// Simple index route
assert(<Router location="/">
  <Route path="/" component={Index} />
</Router>, <Index />)

// Props
assert(<Router location="/list" items={["foo", "bar", "baz"]}>
  <Route path="/" component={Index}>
    <Route path="list" component={List} />
  </Route>
</Router>, <Index>
  <List items={["foo", "bar", "baz"]} />
</Index>)

// Nested route
assert(<Router location="/pets">
  <Route path="/" component={Index}>
    <Route path="pets" component={Pets} />
  </Route>
</Router>, <Index><Pets /></Index>)

// Deeply nested route
assert(<Router location="/pets/12">
  <Route path="/" component={Index}>
    <Route path="pets" component={Pets}>
      <Route path=":petId" component={Pet} />
    </Route>
  </Route>
</Router>, <Index><Pets><Pet params={{ petId: 12 }}></Pet></Pets></Index>)

// Many deeply nested route
assert(<Router location="/users/5">
  <Route path="/" component={Index}>
    <Route path="pets" component={Pets}>
      <Route path=":petId" component={Pet} />
    </Route>

    <Route path="users" component={Users}>
      <Route path=":userId" component={User} />
    </Route>
  </Route>
</Router>, <Index><Users><User params={{ userId: 5 }}></User></Users></Index>)

// Catch-all
assert(<Router location="/something">
  <Route path="/" component={Index}>
    <Route path="pets" component={Pets}>
      <Route path=":petId" component={Pet} />
    </Route>

    <Route path="users" component={Users}>
      <Route path=":userId" component={User} />
    </Route>
  </Route>

  <Route path="*" component={NotFound} />
</Router>, <NotFound />)

// Nested route but index route
assert(<Router location="/">
  <Route path="/" component={Index}>
    <Route path="pets" component={Pets} />
  </Route>
</Router>, <Index />)

// Shallow routes
assert(<Router location="/">
  <Route path="/" component={Index} />
  <Route path="/users" component={Users} />
</Router>, <Index />)

assert(<Router location="/users">
  <Route path="/" component={Index} />
  <Route path="/users" component={Users} />
</Router>, <Users />)

assert(<Router location="/user/5">
  <Route path="/" component={Index} />
  <Route path="/users" component={Users} />
  <Route path="/user/:userId" component={User} />
</Router>, <User params={{ userId: 5 }} />)

// Many nested routes and params
assert(<Router location="/users/5/pets/2">
  <Route path="/" component={Index}>
    <Route path="users" component={Users}>
      <Route path=":userId" component={User}>
        <Route path="pets" component={Pets}>
          <Route path=":petId" component={Pet} />
        </Route>
      </Route>
    </Route>
  </Route>
</Router>, <Index>
  <Users>
    <User params={{ userId: 5 }}>
      <Pets>
        <Pet params={{ petId: 2 }}>
        </Pet>
      </Pets>
    </User>
  </Users>
</Index>)
