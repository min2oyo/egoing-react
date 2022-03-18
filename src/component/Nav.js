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

export default Nav;