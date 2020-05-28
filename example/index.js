import React, {useCallback} from 'react'
import {useLocation, usePush} from './use-location'
import {render} from 'react-dom'
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

function Link({to, ...props}) {
  const push = usePush()

  const click = useCallback(e => {
    e.preventDefault()
    push(to)
  }, [to])

  return (
    <a href={to} onClick={click} {...props}/>
  )
}

function Index({location, children}) {
  return (
    <>
      <h1>Pet List</h1>
      <p>
        At least it is not a to-do list.
        Check out <Link to='/users'>users</Link> or <Link to='/pets'>pets</Link>.
      </p>
      <p>Current location is {location}</p>
      {children}
      <Link to='/something-not-exists'>Something non-existent</Link>
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
            <Link to={loc('/users/:id', {id})}>{name}</Link>
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
            <Link to={loc('/pets/:id', {id})}>{name}</Link>
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
            <Link to={loc('/pets/:id', {id})}>{name}</Link>
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
      {pet.name} is a {pet.species} and is owned
      by <Link to={'/users/' + user.id}>{user.name}</Link>.
    </p>
  )
}

function NotFound() {
  return <p>404 Not Found</p>
}

function App() {
  const location = useLocation()

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
