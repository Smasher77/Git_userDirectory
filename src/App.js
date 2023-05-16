import { Routes,Route } from 'react-router-dom';

import ListPage from './ListPage/ListPage.jsx';
import DetailPage from './DetailPage/DetailPage.jsx';

const App = () => {
  return (
    

<Routes>
    <Route exact path="/" element={<ListPage/>}/>
    <Route path="/repositories/:repoId" element={<DetailPage />}/>
    
    
    
    </Routes>
    
    
    
  );
};

export default App;