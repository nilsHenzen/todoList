import './App.css';
import TodoList from './Components/Contentsite/TodoList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/LoginSite/Login';
import SinglePage from './Components/SinglePage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/TodoList' element={<TodoList />} />
        <Route path='/TodoList/:id' element={<SinglePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
