import React from 'react';
import Item from './Item';

export default function List({data}) {
  console.log(data)
  return (
    <>
      <h2>Working</h2>
      <ul className='todo-list'>
        {
          data.map((el) => {
            return !el.isDone && <Item data={el} key={el.id} />
          })
        }
      </ul>
      <h2>Done</h2>
      <ul className='todo-list'>
      {
        data.map((el) => {
          return el.isDone && <Item data={el} key={el.id} />
        })
      }
      </ul>
    </>
  );
}
