import logo from './logo.svg';
import './App.css';
import { useState } from "react"; //{}는 hook. hook은 리액트에서 기본적으로 제공하는 함수

function Header(props) {
  console.log("props", props, props.title);

  return (
    <header>
      <h1><a href='/' onClick={event => {
        event.preventDefault(); //이벤트 실행 방지
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  )
}

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a href={"/read/" + t.id} id={t.id} onClick={event => {
          event.preventDefault();
          props.onChangeMode(Number(event.target.id));
        }}>{t.title}</a>
      </li>
    );
  }
  console.log("lis: " + lis);

  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={event => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title, body);
      }}>
        <p><input type='text' name='title' placeholder='title' /></p>
        <p><textarea name='body' placeholder='body' /></p>
        <p><input type='submit' value='Create' /></p>
      </form>
    </article >
  )
}

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

  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, WEB" />
  } else if (mode === "READ") {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      console.log(topics[i].id, id);
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body} />
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
  }


  return (
    <div>
      <Header title="Web" onChangeMode={() => {
        setMode("WELCOME");
      }} />
      <Nav topics={topics} onChangeMode={_id => {
        setMode("READ");
        setId(_id)
      }} />
      {content}
      <a href="/create" onClick={event => {
        event.preventDefault(); //<a>를 동작 못하게 함
        setMode("CREATE");

      }}>Create</a>
    </div>
  );
}

export default App;
