import { Routes, Route , BrowserRouter} from 'react-router-dom';
import styles from './App.module.css';
import LoginPage from './pages/Login/Login';
import Home from './pages/Homepage/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />}/>
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;