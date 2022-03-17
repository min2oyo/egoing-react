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

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ]
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
    </div>
  );
}

export default App;
