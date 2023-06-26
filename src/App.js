import { Routes, Route } from 'react-router-dom';

import ListPage from './Pages/ListPage/ListPage.jsx';
import DetailPage from './Pages/DetailPage/DetailPage.jsx';

const App = () => {
  
  return (
    <Routes>
      <Route exact path="/" element={<ListPage />} />
      <Route path="/repositories/:repoId" element={<DetailPage />} />
    </Routes>
  );
  
};

export default App;