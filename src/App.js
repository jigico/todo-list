import './App.css';
import AddTodo from './component/AddTodo';
import Header from './component/Header';

function App() {
  return (
    <div className="layout-1200">
      <Header></Header>
      <AddTodo></AddTodo>      
    </div>
  );
}

export default App;
