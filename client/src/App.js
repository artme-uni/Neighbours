import './App.css';
import Root from "./screens/Rout";
import Authorization from "./components/authorization/Authorization";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          {/*<Root> </Root>*/}
          <Authorization> </Authorization>
      </header>
    </div>
  );
}

export default App;
