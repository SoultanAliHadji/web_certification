import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="https://SoultanAliHadji.github.io/web_certification" component={Navbar} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
