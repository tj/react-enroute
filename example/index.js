import React, {createContext, useState, useEffect, useCallback, useContext} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route} from '../index'

// note this is just an example, this package does not provide
// a Link equivalent found in react-router, nor does it provide
// bindings for tools like Redux. You'll need to wire these up
// as desired.

const navigateContext = createContext()

function Link({to, children}) {
  const navigate = useContext(navigateContext)

  const click = useCallback(e => {
    e.preventDefault()
    navigate(to)
  }, [])

  return <a href={to} onClick={click}>
    {children}
  </a>
}

function Index({children}) {
  return <div>
    <h1>Pet List</h1>
    <p>At least it is not a to-do list. Check out <Link
      to="/users">users</Link> or <Link to="/pets">pets</Link>.</p>
    {children}
  </div>
}

function Users({users, children}) {
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

function User({user, pets}) {
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
  return ({users, pets, params: {id}}) => {
    return fn({
      user: users.filter(u => u.id === id)[0],
      pets: pets.filter(p => p.user_id === id),
    })
  }
})(User)

function Pets({pets, children}) {
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

function Pet({user, pet}) {
  return <p>{pet.name} is a {pet.species} and is owned by <Link
    to={`/users/${user.id}`}>{user.name}</Link>.</p>
}

Pet = (fn => {
  return ({users, pets, params: {id}}) => {
    const pet = pets.filter(p => p.id === id)[0]
    const user = users.filter(u => u.id === pet.user_id)[0]
    return fn({user, pet})
  }
})(Pet)

function NotFound() {
  return <p>404 Not Found</p>
}

const Data = {
  users: [
    {id: '1', name: 'Bob'},
    {id: '2', name: 'Joe'},
  ],
  pets: [
    {id: '1', user_id: '1', name: 'Tobi', species: 'Ferret'},
    {id: '2', user_id: '1', name: 'Loki', species: 'Ferret'},
    {id: '3', user_id: '1', name: 'Jane', species: 'Ferret'},
    {id: '4', user_id: '2', name: 'Manny', species: 'Cat'},
    {id: '5', user_id: '2', name: 'Luna', species: 'Cat'},
  ],
}

function App() {
  const [location, setLocation] = useState(window.location.pathname)
  const navigate = useCallback(path => {
    history.pushState(null, "", path)
    setLocation(path)
  }, [])
  useEffect(() => {
    window.addEventListener('popstate', () => {
      setLocation(window.location.pathname)
    })
  }, [])

  return (
    <navigateContext.Provider value={navigate}>
      <Router {...{location}} {...Data}>
        <Route path="/" component={Index}>
          <Route path="users" component={Users}>
            <Route path=":id" component={User}/>
          </Route>

          <Route path="pets" component={Pets}>
            <Route path=":id" component={Pet}/>
          </Route>
        </Route>

        <Route path="(.*)" component={NotFound}/>
      </Router>
    </navigateContext.Provider>
  )
}

ReactDOM.render(<App/>, document.querySelector('#app'))
