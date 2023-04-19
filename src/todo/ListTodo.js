import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ActionType from '../redux/typeAction';

const ListTodo = () => {
  const [selectItem, setSelectItem] = useState(null);
  const [searchTask, setSearchTask] = useState('');
  const [selectTodoValue, setSelectTodoValue] = useState({});
  const list = useSelector((state) => state.todo) || [];

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(list));
  }, [list]);

  const dispach = useDispatch();

  const deleteTodo = (index) => {
    dispach({ type: ActionType.Delete, value: index });
  };

  const editTodo = (index) => {
    setSelectItem(index);
    setSelectTodoValue({ ...list[index], index: index });
  };

  const inputChange = (e) => {
    setSelectTodoValue({
      ...selectTodoValue,
      [e.target.name]: e.target.value,
    });
  };

  const UpdateTodo = () => {
    selectTodoValue.task && dispach({ type: ActionType.Edit, value: selectTodoValue });
    setSelectItem(null);
  };

  return (
    <div className="col-md-6">
      <h1>To-Do List</h1>
      <input
        type="text"
        className="form-control"
        value={searchTask}
        onChange={(e) => setSearchTask(e.target.value)}
        placeholder={'Search task'}
      />
      {list.length == 0 && <h2>No Todo list</h2>}
      {list
        ?.filter((res) => (res?.task.indexOf(searchTask) > -1 ? true : false)).sort((a,b)=>{

        })
        .map((todo, index) => (
          <div key={index} className="card">
            {selectItem == index ? (
              <>
                <label>Task</label>
                <input
                  type="text"
                  onChange={inputChange}
                  value={selectTodoValue?.task}
                  name="task"
                  className="form-control"
                  placeholder="Enter task"
                />
                <label>level</label>
                <input
                  onChange={inputChange}
                  value={selectTodoValue?.level}
                  type="number"
                  name="level"
                  className="form-control"
                  placeholder="Enter level"
                />
                <label>Due date</label>
                <input
                  onChange={inputChange}
                  value={selectTodoValue?.date}
                  type="date"
                  name="date"
                  className="form-control"
                />
                <label>Status</label>
                <select
                  value={selectTodoValue.status}
                  className={'form-control'}
                  name={'status'}
                  onChange={inputChange}
                >
                  <option value={''}>Select One</option>
                  <option value={'not_start'}>Not Started</option>
                  <option value={'in_progress'}>In Progress</option>
                  <option value={'completed'}>Completed</option>
                </select>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    UpdateTodo();
                  }}
                >
                  {' '}
                  Update Todo{' '}
                </button>
              </>
            ) : (
              <>
                <p>{todo?.task} </p>
                {todo?.level && <p>{todo?.level} </p>}
                {todo?.date && <p>{todo?.date} </p>}
                {todo?.status && (
                  <button className="btn btn-primary">{todo?.status}</button>
                )}
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    editTodo(index);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteTodo(index);
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default ListTodo;
