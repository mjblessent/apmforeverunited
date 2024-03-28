import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import { AuthProvider } from "./context/auth"
import PublicRoute from "./routes/PublicRoutes"
import PrivateRoute from "./routes/PrivateRoutes"
import Signin from "./pages/Signin"
import ImageCollection from "./pages/ImageCollection"
import AdminRoute from "./routes/AdminRoutes"
import Profile from "./pages/Profile"
import EventRegister from "./pages/EventRegister"
import EventResults from "./pages/EventResults"
import UploadMissionInfo from "./pages/UploadMissionInfo"
import SearchMissionInfo from "./pages/SearchMissionInfo"
import ManageAccounts from "./pages/ManageAccounts"
import ManageHome from "./pages/ManageHome"



function App() {

  return (
      <AuthProvider>
      <Routes>
        <Route path="/imagecollection" element={
        <AdminRoute>
          <ImageCollection />
        </AdminRoute>
        } />
        <Route path="/manageaccounts" element={
        <AdminRoute>
          <ManageAccounts />
        </AdminRoute>
        } />
        <Route path="/managehome" element={
        <AdminRoute>
          <ManageHome />
        </AdminRoute>
        } />
        <Route path="/uploadmissioninfo" element={
        <AdminRoute>
          <UploadMissionInfo />
        </AdminRoute>
        } />
        <Route path="/searchmissioninfo" element={
        <AdminRoute>
          <SearchMissionInfo />
        </AdminRoute>
        } />
        <Route path="/eventresults" element={
        <AdminRoute>
          <EventResults />
        </AdminRoute>
        } />
        <Route path="/signup" element={
        <PublicRoute>
          <Signup />
        </PublicRoute>

        } />
        <Route path="/profile" element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>

        } />
        <Route path="/signin" element={
        <PublicRoute>
          <Signin />
        </PublicRoute>
        
        } />
        <Route path="/" element={<Home />} />
        <Route path="/eventregister" element={<EventRegister />} />
      </Routes>
      </AuthProvider>
  );
}

export default App
