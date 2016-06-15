
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from '..'

function Link({ to, children }) {
  function click(e) {
    e.preventDefault()
    navigate(to)
  }

  return <a href={to} onClick={click}>
    {children}
  </a>
}

class Index extends Component {
  render() {
    const { children } = this.props
    return <div>
      <h1>Pet List</h1>
      <p>At least it is not a to-do list. Check out <Link to="/users">users</Link> or <Link to="/pets">pets</Link>.</p>
      {children}
    </div>
  }
}

// function Index({ children }) {
//   return <div>
//     <h1>Pet List</h1>
//     <p>At least it is not a to-do list. Check out <Link to="/users">users</Link> or <Link to="/pets">pets</Link>.</p>
//     {children}
//   </div>
// }

class Users extends Component {
  render() {
    const { users, children } = this.props
    return <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => {
          return <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        })}
      </ul>
      {children}
    </div>
  }
}

// function Users({ users, children }) {
//   return <div>
//     <h2>Users</h2>
//     <ul>
//       {users.map(user => {
//         return <li key={user.id}>
//           <Link to={`/users/${user.id}`}>{user.name}</Link>
//         </li>
//       })}
//     </ul>
//     {children}
//   </div>
// }

function User({ user, pets }) {
  return <div>
    <p>{user.name} has {pets.length} pets:</p>
    <ul>
      {pets.map(pet => {
        return <li key={pet.id}>
          <Link to={`/pets/${pet.id}`}>{pet.name}</Link>
        </li>
      })}
    </ul>
  </div>
}

User = (fn => {
  return ({ users, pets, params: { id } }) => {
    return fn({
      user: users.filter(u => u.id == id)[0],
      pets: pets.filter(p => p.user_id == id)
    })
  }
})(User)

function Pets({ pets, children }) {
  return <div>
    <h2>Pets</h2>
    <ul>
      {pets.map(pet => {
        return <li key={pet.id}>
          <Link to={`/pets/${pet.id}`}>{pet.name}</Link>
        </li>
      })}
    </ul>
    {children}
  </div>
}

function Pet({ user, pet }) {
  return <p>{pet.name} is a {pet.species} and is owned by <Link to={`/users/${user.id}`}>{user.name}</Link>.</p>
}

Pet = (fn => {
  return ({ users, pets, params: { id } }) => {
    const pet = pets.filter(p => p.id == id)[0]
    const user = users.filter(u => u.id == pet.user_id)[0]
    return fn({ user, pet })
  }
})(Pet)

function NotFound() {
  return <p>404 Not Found</p>
}

function navigate(path) {
  history.pushState(null, "", path)
  render({
    ...state,
    location: path
  })
}

window.addEventListener('popstate', e => {
  render({
    ...state,
    location: window.location.pathname
  })
})

// function render(state) {
  // ReactDOM.render(<Router {...state}>
  //   <Route path="/" component={Index} />
  //
  //   <Route path="/users" component={Users}>
  //     <Route path=":id" component={User} />
  //   </Route>
  //
  //   <Route path="/pets" component={Pets}>
  //     <Route path=":id" component={Pet} />
  //   </Route>
  //
  //   <Route path="*" component={NotFound} />
  // </Router>, document.querySelector('#app'))
// }

// function render(state) {
//   ReactDOM.render(<Router {...state}>
//     <Route path="/" component={Index}>
//       <Route path="users" component={Users}>
//         <Route path=":id" component={User} />
//       </Route>
//
//       <Route path="pets" component={Pets}>
//         <Route path=":id" component={Pet} />
//       </Route>
//     </Route>
//
//     <Route path="*" component={NotFound} />
//   </Router>, document.querySelector('#app'))
// }

function render(state) {
  ReactDOM.render(<Router {...state}>
    <Route path="/" component={Index} />
    <Route path="/users" component={Users} />
    <Route path="/users/:id" component={User} />
    <Route path="/pets" component={Pets} />
    <Route path="/pets/:id" component={Pet} />
    <Route path="*" component={NotFound} />
  </Router>, document.querySelector('#app'))
}


// TODO: update readme examples
// TODO: index / redirect
// TODO: tests
// TODO: server example

const state = {
  location: window.location.pathname,
  users: [
    { id: 1, name: 'Bob' },
    { id: 2, name: 'Joe' },
  ],
  pets: [
    { id: 1, user_id: 1, name: 'Tobi', species: 'Ferret' },
    { id: 2, user_id: 1, name: 'Loki', species: 'Ferret' },
    { id: 3, user_id: 1, name: 'Jane', species: 'Ferret' },
    { id: 4, user_id: 2, name: 'Manny', species: 'Cat' },
    { id: 5, user_id: 2, name: 'Luna', species: 'Cat' }
  ]
}

render(state)
