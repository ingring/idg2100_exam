import "./App.css";
import { Route, Routes } from "react-router-dom";
import useAuth from "./functions/useAuth";
import Players from "./routes/players";
import Matches from "./routes/matches";
import Login from "./routes/login";
import Register from "./routes/register";
import Profile from "./routes/profile";
import Landing from "./routes/landing";
import Footer from "./components/Footer/Footer";
import ShowMatch from "./routes/showmatch";
import PersistLogin from "./functions/PersistLogin";
import Logout from "./routes/logout";
import Newmatch from "./routes/newmatch";
import SocketTest from "./routes/sockettest";
import Header from "./components/Header/Header";
import Validatemail from "./components/Validatemail/Validatemail";
import Admin from "./routes/admin";
import Edituser from "./components/Editusercomp.jsx/Editusercomp";
import ProtectedRoutes from "./functions/ProtectedRoutes";
import PageNotFound from "./routes/pageNotFound";
import Unauthorized from "./routes/unauthorized";
import AdminNewMatch from "./components/Admin_components/AdminNewMatch";
import AdminUpdateMatch from "./components/Admin_components/AdminUpdateMatch";
import EditPasswordForm from "./components/Forms/EditPasswordForm";

function App() {
  const { auth } = useAuth();

  return (
    <>
      <Header />

      <Routes>
        {/* //these routes need the persistlogin, it checks whether or not a user is logged in in the cookie, and gets a new accestoken */}

        <Route element={<PersistLogin />}>
          <Route path="/" element={<Landing />} />

          <Route element={<ProtectedRoutes isAllowed={auth.accesstoken} />}>
            <Route path="/players" element={<Players />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/newmatch" element={<Newmatch />} />
            <Route path="/match/:nr" element={<ShowMatch />} />
          </Route>

          <Route
            element={
              <ProtectedRoutes
                isAllowed={auth.accesstoken && auth.role !== "Unverified"}
              />
            }
          >
            
            <Route path="/socket" element={<SocketTest />} />
          </Route>

          <Route
            element={
              <ProtectedRoutes
                isAllowed={auth.accesstoken && auth.role !== "Admin"}
              />
            }
          >
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit/:username" element={<Edituser />} />
            <Route path="/updatepassword" element={<EditPasswordForm />} />
          </Route>

          <Route
            element={
              <ProtectedRoutes
                isAllowed={auth.accesstoken && auth.role === "Admin"}
              />
            }
          >
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/edit/:username" element={<Edituser />} />
            <Route path="/admin/match" element={<AdminNewMatch />} />
            <Route
              path="/admin/match/:matchid"
              element={<AdminUpdateMatch />}
            />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Validateemail/:token" element={<Validatemail />} />

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
