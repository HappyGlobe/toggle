
import { Switch, Route } from "wouter";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import HappinessMap from "./pages/HappinessMap";
import HappinessEntries from "./pages/HappinessEntries";
import Trends from "./pages/Trends";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserRegistered from "./pages/UserRegistered";
import UserList from "./pages/UserList";
import Location from "./pages/Location";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/happiness-map" component={HappinessMap} />
        <Route path="/happiness-entries" component={HappinessEntries} />
        <Route path="/trends" component={Trends} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/user-registered/:id" component={UserRegistered} />
        <Route path="/users" component={UserList} />
        <Route path="/location" component={Location} />
      </Switch>
    </Layout>
  );
}

export default App;
