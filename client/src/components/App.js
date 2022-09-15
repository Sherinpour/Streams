import React from "react";
import StreamList from "./streams/StreamList";
import StreamCreate from "./streams/StreamCreate";
import StreamShow from "./streams/StreamShow";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import Header from "./Header";
import {
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      <HistoryRouter history={history}>
        <Header />
        <Routes>
          <Route path="/" exact element={<StreamList />} />
          <Route path="/streams/new" exact element={<StreamCreate />} />
          <Route path="/streams/edit/:id" exact element={<StreamEdit />} />
          <Route path="/streams/delete/:id" exact element={<StreamDelete />} />
          <Route path="/streams/:id" exact element={<StreamShow />} />
        </Routes>
      </HistoryRouter>
    </div>
  );
};

export default App;
