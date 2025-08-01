import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import CoinsDetail from './pages/CoinsDetail';


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/:id' element={<CoinsDetail/>}/>
         <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
