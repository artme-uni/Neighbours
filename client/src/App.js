import './App.css';
import Root from "./screens/Root";
import Login from "./components/authorization/Login";
import Registration from "./components/authorization/Registration";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          {/*<Root> </Root>*/}
          {/*<Login> </Login>*/}
          <Registration> </Registration>
      </header>
    </div>
  );
}

export default App;
