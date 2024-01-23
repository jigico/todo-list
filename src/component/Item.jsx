import React from 'react';

export default function Item({id, title, contents, isDone, completeItem, cancelItem, deleteItem}) {
  return (
    <li className={isDone === true ? 'item done' : 'item'}>
      <span className='title'>{title}</span>
      <p className='contents'>{contents}</p>
      <input type='hidden' className='target-id' value={id} />
      <div className='btn-box'>
        <button type='button' className='btn-red' onClick={deleteItem}>삭제</button>
        {
          isDone === true ? <button type='button' className='btn-green' onClick={cancelItem}>취소</button> : <button type='button' className='btn-green' onClick={completeItem}>완료</button>
        }
        
      </div>
    </li>
  );
}
