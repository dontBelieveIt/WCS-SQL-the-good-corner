import { Route, Routes } from 'react-router';
import './App.css'; 
import RecentAds from './components/RecentAds';
import Layout from './pages/Layout';
import About from './pages/About';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RecentAds/>} />
        <Route path='about' element={<About />} />
      </Route>
    </Routes>   
  )
}
export default App