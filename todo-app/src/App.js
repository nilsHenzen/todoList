import './App.css';
import TodoList from './Components/TodoList';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/TodoList' element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
