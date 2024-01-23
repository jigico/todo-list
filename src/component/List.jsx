import React, { useState } from 'react';
import Item from './Item';

export default function List({data}) {
  const [currData, setCurrData] = useState(data);
  
  //완료 데이터
  const completeData = data.filter((el) => {
    return el.isDone === true;
  });

  //미완료 데이터
  const incompleteData = data.filter((el) => {
    return el.isDone === false;
  });

  //완료 기능 - 함수를 만들어서 전달
  const completeItem = () => {
    //data 에서 해당 id 찾아서 값 변경
    return function(e){ //함수를 props로 전달하기 위해 리턴문에 함수를 만들었다.
      const parent = e.target.parentElement.parentElement; //event target 의 조상 요소를 찾는다
      const id = parent.querySelector('.target-id').value; //찾은 조상 요소의 자식중에 id 값을 가지고 있는 input 의 value 를 가져온다.
      
      let findData = data.find((el) => { //현재 데이터와 같은 id를 가진 데이터를 가져온다.
        return el.id === Number(id); //id 가 string 으로 가져와져서 number로 형변환.
      });
      findData.isDone = true; //상태를 완료로 변경한다.
      setCurrData([findData]); //업데이트를 해준다.
    }
  }

  //취소 기능
  const cancelItem = () => {
    //data 에서 해당 id 찾아서 값 변경
    return function(e){
      const parent = e.target.parentElement.parentElement;
      const id = parent.querySelector('.target-id').value;
      
      let findData = data.find((el) => {
        return el.id === Number(id);
      });
      findData.isDone = false;
      setCurrData([findData]);
      console.log(findData);
    }
  }

  //삭제 기능
  const deleteItem = () => {
    return function(e){
      const parent = e.target.parentElement.parentElement;
      const id = parent.querySelector('.target-id').value;
      console.log(data)
      let findIdx = data.findIndex((el) => { //삭제할 아이템의 index를 구하고
        return el.id === Number(id);
      });
      let newData = data.splice(findIdx,1); //splice로 삭제한다.
      setCurrData(newData); //업데이트를 해준다.
    }
  }

  return (
    <>
      <h2 className='page-title'>🔥 Working</h2>
      <ul className='todo-list'>
        {
          incompleteData.map((el) => {
            return <Item id={el.id} title={el.title} contents={el.contents} isDone={el.isDone} key={el.id} completeItem={completeItem()} deleteItem={deleteItem()} />
          })
        }
      </ul>
      <h2 className='page-title'>🎉 Done</h2>
      <ul className='todo-list'>
      {
        completeData.map((el) => {
          return <Item id={el.id} title={el.title} contents={el.contents} isDone={el.isDone} key={el.id} cancelItem={cancelItem()} deleteItem={deleteItem()} />
        })
      }
      </ul>
    </>
  );
}
