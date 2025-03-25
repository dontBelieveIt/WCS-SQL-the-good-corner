import { Route, Routes } from 'react-router';
import './App.css'; 
import RecentAds from './components/RecentAds';
import Layout from './pages/Layout';
import About from './pages/About';
import AdDetails from './pages/AdDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RecentAds/>} />
        <Route path="about" element={<About />} />
        <Route path="ads/:id" element={<AdDetails />} />
      </Route>
    </Routes>   
  )
}
export default App