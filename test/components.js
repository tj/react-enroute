export function Index({children}) {
  return <div>
    <h1>Index</h1>
    {children}
  </div>
}

export function Users({children}) {
  return <div>
    <h2>Users</h2>
    {children}
  </div>
}

export function User({userId, children}) {
  return <div>
    <h2>User {userId}</h2>
    {children}
  </div>
}

export function Pets({children}) {
  return <div>
    <h2>Pets</h2>
    {children}
  </div>
}

export function AllPets() {
  return <div>
    <h2>All Pets</h2>
  </div>
}

export function Pet({petId}) {
  return <div>pet {petId}</div>
}

export function NotFound() {
  return <div>Not Found</div>
}

export function List({items}) {
  return <ul>
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
}
