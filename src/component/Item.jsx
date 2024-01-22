import React, { useState } from 'react';

export default function Item({data}) {
  const [isDone, setIsDone] = useState(data.isDone);
  const deleteItem = () => {

  };

  const cancelItem = () => {
    setIsDone(false);
    console.log(isDone)
  };

  const successItem = () => {
    console.log(typeof isDone)
    setIsDone(true);
    console.log(typeof isDone)
  }

  return (
    <li className='item'>
      <span className='title'>{data.title}</span>
      <p className='contents'>{data.contents}</p>
      <div className='btn-box'>
        <button type='button' className='btn-red' onClick={deleteItem}>삭제</button>
        {
          isDone === true ? <button type='button' className='btn-green' onClick={cancelItem}>취소</button> : <button type='button' className='btn-green' onClick={successItem}>완료</button>
        }
        
      </div>
    </li>
  );
}
