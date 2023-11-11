import './App.css';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  //Link, 
  //useParams
} from 'react-router-dom';
import { TaskBoard } from './pages/TaskBoard';
import { CompletedList } from './pages/CompletedList';
import { Navbar } from './components/Navbar.js'
import { TaskPage } from './pages/TaskPage.js'
import { TagsList } from './pages/TagsList.js';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<TaskBoard />} />
          <Route path="/completed" element={<CompletedList />} />
          <Route path='/task/:id' element={<TaskPage/>}/>
          <Route path='/tags' element={<TagsList/>}/>
        </Routes>
      
      </div>
    </Router>
     
  );
}

export default App;
