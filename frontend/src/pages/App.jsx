import { Routes, Route , BrowserRouter} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}/>
        
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;