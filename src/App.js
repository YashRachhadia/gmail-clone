import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mail from "./components/Mail/Mail";
import EmailList from "./components/EmailList/EmailList";
import SendMail from "./components/SendMail/SendMail";
import { useSelector } from "react-redux";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import { login, selectUser } from "./features/userSlice";
import Login from "./components/Login/Login";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const App = () => {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      }
    });
  }, []);

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="App">
          <Header />
          <div className="app__body">
            <Sidebar />

            <Routes>
              <Route path="/mail" element={<Mail />} />
              <Route path="/" element={<EmailList />} />
            </Routes>
          </div>

          {sendMessageIsOpen && <SendMail />}
        </div>
      )}
    </Router>
  );
};

export default App;
