import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ActionType from '../redux/typeAction';

const AddTodo = () => {
  const [fromValue, setFromValue] = useState({});
  const [fromError, setFromError] = useState({});
  const dispach = useDispatch();

  const inputChange = (e) => {
    setFromValue({
      ...fromValue,
      [e.target.name]: e.target.value,
    });
  };

  const AddNewTodo = () => {
    if (fromValue?.task) {
      dispach({ type: ActionType.AddNew, value: fromValue });
      setFromValue({
        task: '',
        level: '',
        date: '',
        status: '',
      });
    }
    setFromError({
      ...fromError,
      task: fromValue?.task ? '' : 'Enter Task , This Filed Required',
    });
  };

  return (
    <div className="col-md-6">
      <label>Task</label>
      <input
        type="text"
        onChange={inputChange}
        value={fromValue?.task}
        name="task"
        className="form-control"
        placeholder="Enter task"
      />
      {fromError?.task && <p className="form-error">{fromError?.task}</p>}
      <label>level</label>
      <input
        onChange={inputChange}
        value={fromValue?.level}
        type="number"
        name="level"
        className="form-control"
        placeholder="Enter level"
      />
      <label>Due date</label>
      <input
        onChange={inputChange}
        value={fromValue?.date}
        type="date"
        name="date"
        className="form-control"
      />
      <label>Status</label>
      <select
        value={fromValue?.status}
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
          AddNewTodo();
        }}
      >
        {' '}
        Add New{' '}
      </button>
    </div>
  );
};

export default AddTodo;
