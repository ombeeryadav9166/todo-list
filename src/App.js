import './App.css';
import AddTodo from './todo/AddTodo';
import ListTodo from './todo/ListTodo';

function App() {
  return (
    <div className="container">
      <div className="row">
        <ListTodo />
        <AddTodo />
      </div>
    </div>
  );
}

export default App;
