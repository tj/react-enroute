import {useEffect} from 'react'
import {render} from 'react-dom'
import {useLocation, setLinksHandler} from './use-location'
import {Router, loc} from '../src'


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

function Index({location, children}) {
  return (
    <>
      <h1>Pet List</h1>
      <p>
        At least it is not a to-do list.
        Check out <a href='/users'>users</a> or <a href='/pets'>pets</a>.
      </p>
      <p>Current location is <b>{location}</b></p>
      {children}
      <a href='/something-not-exists'>Something non-existent</a>
    </>
  )
}

function Users({children}) {
  const {users} = Data

  return (
    <>
      <h2>Users</h2>
      <ul>
        {Object.values(users).map(({id, name}) => (
          <li key={id}>
            <a href={loc('/users/:id', {id})}>{name}</a>
          </li>
        ))}
      </ul>
      {children}
    </>
  )
}

function User({id}) {
  const {users, pets} = Data
  const user = users[id]
  const userPets = user.pets.map(id => pets[id])

  return (
    <>
      <p>{user.name} has {userPets.length} pets:</p>
      <ul>
        {userPets.map(({id, name}) => (
          <li key={id}>
            <a href={loc('/pets/:id', {id})}>{name}</a>
          </li>
        ))}
      </ul>
    </>
  )
}

function Pets({children}) {
  const {pets} = Data

  return(
    <>
      <h2>Pets</h2>
      <ul>
        {Object.values(pets).map(({id, name}) => (
          <li key={id}>
            <a href={loc('/pets/:id', {id})}>{name}</a>
          </li>
        ))}
      </ul>
      {children}
    </>
  )
}

function Pet({id}) {
  const {users, pets} = Data
  const pet = pets[id]
  const user = Object.values(users)
    .find(user => user.pets.includes(id))

  return (
    <p>
      <b>{pet.name}</b> is a <b>{pet.species}</b> and is owned
      by <a href={'/users/' + user.id}><b>{user.name}</b></a>.
    </p>
  )
}

function NotFound() {
  return <p>404 Not Found</p>
}

function App() {
  const location = useLocation()

  useEffect(setLinksHandler, [])

  return (
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
  )
}

render(<App/>, document.querySelector('#app'))
