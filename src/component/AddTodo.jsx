import React, { useState } from 'react';
import List from './List';

export default function AddTodo() {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [id, setId] = useState(0);
  const [data, setData] = useState([
    {id: 0, title: 'erg', contents: 'ghfg', isDone: false},
    {id: 1, title: 'title', contents: 'fgh', isDone: true},
    {id: 2, title: 'tyt', contents: 'drtdr', isDone: false}
  ]);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const onChangeContents = (e) => {
    setContents(e.target.value);
  }

  const addItem = () => {
    let newData = {id: id, title: title, contents: contents, isDone: false}
    // data.push(newData);
    setData([...data, newData]);
    setTitle('');
    setContents('');
    setId(id + 1);
  }
  
  return (
    <>
      <div className='add-todo-area'>
        <div>
          <label>제목 <input type='text' className='input' value={title} onChange={onChangeTitle} /></label>
          <label>내용 <input type='text' className='input' value={contents} onChange={onChangeContents} /></label>
        </div>
        <button type='button' className='btn-blue' onClick={addItem}>추가하기</button>
      </div>
      <List data={data} />
    </>
  );
}
