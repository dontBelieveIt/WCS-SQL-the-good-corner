import { Route, Routes } from 'react-router';
import './App.css'; 
import RecentAds from './components/RecentAds';
import Layout from './pages/Layout';
import About from './pages/AboutPage';
import AdDetails from './pages/AdDetailsPage';
import NoPageFound from './pages/NoPageFound';
import PublishNewAdd from './pages/PublishNewAdd';
import PublishNewTagsCategories from './pages/PublishNewTagsCategories';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RecentAds/>} />
        <Route path="about" element={<About />} />
        <Route path="ads/:id" element={<AdDetails />} />
        <Route path="ads/new" element={<PublishNewAdd />} />
        <Route path="ads/new/categories-and-tags" element={<PublishNewTagsCategories />} />
        <Route path="*" element={<NoPageFound />} />
      </Route>
    </Routes>   
  )
}
export default App