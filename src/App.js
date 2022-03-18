import logo from './logo.svg';
import './App.css';
import { useState } from "react"; //{}는 hook. hook은 리액트에서 기본적으로 제공하는 함수

import Header from './component/Header';
import Nav from './component/Nav';
import Article from './component/Article';
import Create from './component/Create';
import Update from './component/Update';
import UseState from './component/UseState';
import UseReducer1 from './component/UseReducer1';
import UseReducer2 from './component/UseReducer2';

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." }
  ])
  let content = null;
  let contextControl = null;

  //홈으로
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, WEB" />

    //Read
  } else if (mode === "READ") {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body} />
    contextControl =
      <>
        <li>
          <a href={'/update' + id} onClick={event => {
            event.preventDefault();
            setMode('UPDATE');
          }}>Update</a>
        </li>
        <li>
          <input type='button' value='Delete' onClick={() => {
            const newTopics = []
            for (let i = 0; i < topics.length; i++) {
              if (topics[i].id !== id) {
                newTopics.push(topics[i]);
              }
            }
            setTopics(newTopics);
            setMode("WELCOME");
          }} />
        </li>
      </>

    //Create    
  } else if (mode === "CREATE") {
    content = <Create onCreate={(_title, _body) => {
      const newTopic = { id: nextId, title: _title, body: _body }  //{property:parameter}
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode("READ");
      setId(nextId);
      setNextId(nextId + 1);
    }} />

    //Update
  } else if (mode === 'UPDATE') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body) => {
      console.log(title, body);
      const newTopics = [...topics]
      const updatedTopic = {
        id: id,
        title: title,
        body: body
      }
      for (let i = 0; i < newTopics.length; i++) {
        if (newTopics[i].id === id) {
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode("READ");
    }} />
  }

  return (
    <>
      <div>
        <Header title="Web" onChangeMode={() => {
          setMode("WELCOME");
        }} />
        <Nav topics={topics} onChangeMode={_id => {
          setMode("READ");
          setId(_id)
        }} />
        {content}
        <ul>
          <li>
            <a href="/create" onClick={event => {
              event.preventDefault(); //<a>를 동작 못하게 함
              setMode("CREATE");
            }}>Create</a>
          </li>
          {contextControl}
        </ul>
      </div>
      <p>useState<UseState /></p>
      <p>useReducer1<UseReducer1 /></p>
      <p>UseReducer2<UseReducer2 /></p>
    </>
  );
}

export default App;
