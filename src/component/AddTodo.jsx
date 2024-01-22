import React, { useState } from 'react';
import List from './List';

export default function AddTodo() {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [id, setId] = useState(0);
  const [data, setData] = useState([
    {id: 0, title: '과제 완료하기', contents: '과제 완료하고 제출하기', isDone: false},
  ]);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const onChangeContents = (e) => {
    setContents(e.target.value);
  }

  const addItem = () => {
    if(title.trim() === ''){
      alert('제목을 입력해주세요');
      document.querySelector('#title').focus();
      return;
    }
    if(contents.trim() === ''){
      alert('내용을 입력해주세요');
      document.querySelector('#contents').focus();
      return;
    }

    let newId = id;
    if(data.length > 0){
      newId = data[data.length-1].id + 1;
    }else{
      newId = newId + 1;
    }
    let newData = {id: newId, title: title, contents: contents, isDone: false}
    setData([...data, newData]);
    setTitle('');
    setContents('');
    setId(newId);
  }
  
  return (
    <>
      <div className='add-todo-area'>
        <div>
          <label>제목 <input type='text' id='title' className='input' value={title} onChange={onChangeTitle} /></label>
          <label>내용 <input type='text' id='contents' className='input' value={contents} onChange={onChangeContents} /></label>
        </div>
        <button type='button' className='btn-blue' onClick={addItem}>추가하기</button>
      </div>
      <List data={data} />
    </>
  );
}
