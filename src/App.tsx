import React from "react";
import { useAuth } from "contexts/AuthContext";
import AuthModal from "components/AuthModal";
import AgentList from "components/AgentList";
import LoggedOutView from "components/LoggedOutView";
import Header from "components/Header";

const App = () => {
  const { isLoggedIn, account } = useAuth();

  return (
    <div className="App">
      <Header />
      {isLoggedIn && account ? <AgentList /> : <LoggedOutView />}
      <AuthModal />
    </div>
  );
};

export default App;
