import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/Home";
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Profile/Profile";
import Chat from "./pages/Chat/Chat";
import "./App.css";
import { BACKEND_SERVER } from "./config";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const getUser = () => {
      const REQUEST_URL =
        process.env.NODE_ENV === "production"
          ? `${BACKEND_SERVER}/auth/login/success`
          : "http://localhost:5000/auth/login/success";

      fetch(REQUEST_URL, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((data) => {
          dispatch({ type: "AUTH_SUCCESS", data: { user: data.user } });
          console.log("data from login success", data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <div
      className="App"
      style={{
        height:
          window.location.href === "http://localhost:3000/chat"
            ? "calc(100vh - 2rem)"
            : "auto",
      }}
    >
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />

        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="../auth" />}
        />
      </Routes>
    </div>
  );
}

export default App;
