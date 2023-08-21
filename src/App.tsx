import { useContext, useEffect } from 'react'
import { Routes , Route, useNavigate } from 'react-router-dom' 
import { AuthContext } from './context/auth-context'
import RequireAuth from './components/require-auth'
import SignIn from './routes/SignIn'
import Profile from './routes/profile'
import Loading from './routes/Loading'
import OrderView from './routes/OrderView'

function App() {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  // NOTE: console log for testing purposes
  console.log('User:', !!currentUser);

  // Check if currentUser exists on initial render
    
  return (
    <Routes>
      <Route index element={<Loading />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="profile" element={
        <RequireAuth>
          <Profile />
        </RequireAuth>}
      />
      <Route path="OrderView/:orderId" element={
        <RequireAuth>
          <OrderView />
        </RequireAuth>}
      />
    </Routes>
  )
}

export default App