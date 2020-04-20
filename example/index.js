import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import {render} from 'react-dom'
import {Router} from '..'


const storeContext = createContext()
const Data = {
  users: {
    1: {id: '1', name: 'Bob', pets: ['1', '2', '3']},
    2: {id: '2', name: 'Joe', pets: ['4', '5']},
  },
  pets: {
    1: {id: '1', name: 'Tobi', species: 'Ferret'},
    2: {id: '2', name: 'Loki', species: 'Ferret'},
    3: {id: '3', name: 'Jane', species: 'Ferret'},
    4: {id: '4', name: 'Manny', species: 'Cat'},
    5: {id: '5', name: 'Luna', species: 'Cat'},
  },
}


function Link({to, children}) {
  const {navigate} = useContext(storeContext)

  const click = useCallback(e => {
    e.preventDefault()
    navigate(to)
  }, [])

  return <a href={to} onClick={click}>
    {children}
  </a>
}

function Index({children, location}) {
  return <div>
    <h1>Pet List</h1>
    <p>At least it is not a to-do list. Check out <Link
      to='/users'>users</Link> or <Link to='/pets'>pets</Link>.</p>
    <p>Current location is {location}</p>
    {children}
  </div>
}

function Users({children}) {
  const {users} = useContext(storeContext)

  return <div>
    <h2>Users</h2>
    <ul>
      {Object.values(users).map(user => {
        return <li key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </li>
      })}
    </ul>
    {children}
  </div>
}

function User({id}) {
  const {users, pets} = useContext(storeContext)
  const user = users[id]
  const userPets = user.pets.map(id => pets[id])

  return <div>
    <p>{user.name} has {userPets.length} pets:</p>
    <ul>
      {userPets.map(pet => {
        return <li key={pet.id}>
          <Link to={`/pets/${pet.id}`}>{pet.name}</Link>
        </li>
      })}
    </ul>
  </div>
}

function Pets({children}) {
  const {pets} = useContext(storeContext)

  return <div>
    <h2>Pets</h2>
    <ul>
      {Object.values(pets).map(pet => {
        return <li key={pet.id}>
          <Link to={`/pets/${pet.id}`}>{pet.name}</Link>
        </li>
      })}
    </ul>
    {children}
  </div>
}

function Pet({id}) {
  const {users, pets} = useContext(storeContext)
  const pet = pets[id]
  const user = Object.values(users)
    .find(user => user.pets.includes(id))

  return <p>{pet.name} is a {pet.species} and is owned by <Link
    to={`/users/${user.id}`}>{user.name}</Link>.</p>
}

function NotFound() {
  return <p>404 Not Found</p>
}

function App() {
  const [location, setLocation] = useState(window.location.pathname)

  const navigate = useCallback(path => {
    history.pushState(null, '', path)
    setLocation(path)
  }, [])

  useEffect(() => {
    window.addEventListener('popstate', () => {
      setLocation(window.location.pathname)
    })
  }, [])

  const store = useMemo(() => ({navigate, ...Data}), [])

  return (
    <storeContext.Provider value={store}>
      <Router {...{location}}>
        <Index {...{location}}>
          <Users path='users'>
            <User path=':id'/>
          </Users>

          <Pets path='pets'>
            <Pet path=':id'/>
          </Pets>
        </Index>

        <NotFound path='(.*)'/>
      </Router>
    </storeContext.Provider>
  )
}

render(<App/>, document.querySelector('#app'))
