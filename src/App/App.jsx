import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import {
  RegistrationPage,
  AuthorizationPage,
  MainPage,
  ErrorPage,
} from "../pages";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import style from "./app.module.scss";

function App() {
  const [auth, setAuth] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [regdata, setRegdata] = useState({ data: [], status: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/authorization");
    }
  }, []);
  return (
    <div className={style.app}>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<MainPage dataAuth={regdata.data} />} />
        <Route
          path="/authorization"
          element={
            <AuthorizationPage
              setShowHeader={setShowHeader}
              dataAuth={regdata.data}
            />
          }
        ></Route>
        <Route
          path="/registration/*"
          element={
            <RegistrationPage
              setShowHeader={setShowHeader}
              regdata={regdata}
              setRegdata={setRegdata}
            />
          }
        ></Route>
        <Route
          path="*"
          element={<ErrorPage setShowHeader={setShowHeader} />}
        ></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
