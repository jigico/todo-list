# [react] todo-list

## 프로젝트 소개
- react를 활용한 나만의 todo list 구현
- url : https://todo-list-six-chi-85.vercel.app/

## 개발 기간
2024.01.22 - 2024.01.23 (2일)

## 프로젝트 요구사항 및 기능
- todo list 항목 추가 기능
  - 추가 완료 시 제목, 내용은 빈칸으로 변경
- todo list 항목 삭제 기능
- todo의 상태가 true 일 경우 취소버튼, false 일 경우 완료 버튼으로 조건 부 렌더링
- todo 의 상태에 따른 알맞는 리스트에 노출
- layout의 최대 넓이는 1200px, 최소 넓이는 800px 제한
- 컴포넌트 구조는 자유롭게 구현 및 분리한 컴포넌트 기재



## 컴포넌트 분리
- Item.jsx : todo list 의 항목이 되는 컴포넌트를 분리
```js
import React from 'react';

export default function Item({id, title, contents, isDone, completeItem, cancelItem, deleteItem}) {
  return (
    <li className='item'>
      <span className='title'>{title}</span>
      <p className='contents'>{contents}</p>
      <input type='hidden' className='target-id' value={id} />
      <div className='btn-box'>
        <button type='button' className='btn-red' onClick={deleteItem}>삭제</button>
        {
          isDone === true 
            ? <button type='button' className='btn-green' onClick={cancelItem}>취소</button> 
            : <button type='button' className='btn-green' onClick={completeItem}>완료</button>
        }
      </div>
    </li>
  );
}
```
<br>

- List.jsx : list 영역의 컴포넌트
```js
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
      <h2>Working</h2>
      <ul className='todo-list'>
        {
          incompleteData.map((el) => {
            return <Item id={el.id} title={el.title} contents={el.contents} isDone={el.isDone} key={el.id} completeItem={completeItem()} deleteItem={deleteItem()} />
          })
        }
      </ul>
      <h2>Done</h2>
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

```
<br>

- AddTodo.jsx : 항목 추가 영역 컴포넌트
```js
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

```


## 프로젝트 구조
```
todo-list
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  ├─ ORIG_HEAD
│  └─ refs
│     ├─ heads
│     │  ├─ dev
│     │  ├─ main
│     │  └─ master
│     ├─ remotes
│     │  └─ origin
│     │     ├─ dev
│     │     ├─ main
│     │     └─ master
│     └─ tags
├─ .gitignore
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  ├─ reset.css
│  └─ robots.txt
├─ README.md
└─ src
   ├─ App.css
   ├─ App.js
   ├─ App.test.js
   ├─ component
   │  ├─ AddTodo.jsx
   │  ├─ Header.jsx
   │  ├─ Item.jsx
   │  └─ List.jsx
   ├─ index.css
   ├─ index.js
   ├─ logo.svg
   ├─ reportWebVitals.js
   └─ setupTests.js

```

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)