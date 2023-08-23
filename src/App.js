import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "./store/peerStore";
import Routes from "./Routes";
import Init from "./Init";
import Sidenav from "./views/Sidenav/Sidenav";
import { BrowserRouter as Router } from "react-router-dom";
// import theme from './theme';
function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={{}}>
          <Init />
          <Router>
          <Sidenav >
            <Routes />
          </Sidenav>
          </Router>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
