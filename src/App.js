import './App.css';
import Post from './Post';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Home';
import Header from './Header';
import ReactPost from './ReactPost';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element = {<Home/>} />
            <Route path="react-query"  element = {<Post/>} />
            <Route path="react"  element = {<ReactPost/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
