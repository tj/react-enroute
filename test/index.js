
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
    <h1>Users</h1>
    {children}
  </div>
}

function User({ params: { id } }) {
  return <div>user {id}</div>
}

function Pets({ children }) {
  return <div>
    <h1>Pets</h1>
    {children}
  </div>
}

function Pet({ params: { id } }) {
  return <div>pet {id}</div>
}

function NotFound() {
  return <div>Not Found</div>
}

// Simple index route
assert(<Router location="/">
  <Route path="/" component={Index} />
</Router>, <Index />)

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
      <Route path=":id" component={Pet} />
    </Route>
  </Route>
</Router>, <Index><Pets><Pet params={{ id: 12 }}></Pet></Pets></Index>)

// Many deeply nested route
assert(<Router location="/users/5">
  <Route path="/" component={Index}>
    <Route path="pets" component={Pets}>
      <Route path=":id" component={Pet} />
    </Route>

    <Route path="users" component={Users}>
      <Route path=":id" component={User} />
    </Route>
  </Route>
</Router>, <Index><Users><User params={{ id: 5 }}></User></Users></Index>)

// Catch-all
assert(<Router location="/something">
  <Route path="/" component={Index}>
    <Route path="pets" component={Pets}>
      <Route path=":id" component={Pet} />
    </Route>

    <Route path="users" component={Users}>
      <Route path=":id" component={User} />
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
  <Route path="/user/:id" component={User} />
</Router>, <User params={{ id: 5 }} />)
