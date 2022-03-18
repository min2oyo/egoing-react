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

export default Header;