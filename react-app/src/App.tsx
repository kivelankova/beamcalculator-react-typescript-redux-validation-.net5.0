import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Test from "./containers/ExampleCasePage";
import Navbar from "./containers/Navbar";
import Beam from "./components/input/index";
import Result from "./components/result";
import ComparisonResults from "./containers/ComparisonResults";

function App() {
  return (
    <div className="App">
      <Suspense fallback={null}>
        <Router>
          {/* <Header /> */}
          <Navbar />
          <Switch>
            <Route path="/" exact component={Beam} />
            <Route path="/result" component={Result} />
            <Route path="/test" component={Test} />
            <Route path="/comparisonresults" component={ComparisonResults} />
            <Route>404 Not Found!</Route>
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
