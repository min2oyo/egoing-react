import logo from './logo.svg';
import './App.css';

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
          props.onChangeMode(event.target.id);
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
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ]

  return (
    <div>
      <Header title="Web" onChangeMode={() => {
        alert("Header");
      }} />
      <Nav topics={topics} onChangeMode={id => {
        alert(id);
      }} />
      <Article title="Welcome" body="Hello, WEB" />
    </div>
  );
}

export default App;
