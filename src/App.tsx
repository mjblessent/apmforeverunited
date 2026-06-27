import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/auth"
import PublicRoute from "./routes/PublicRoutes"
import PrivateRoute from "./routes/PrivateRoutes"
import AdminRoute from "./routes/AdminRoutes"

const Home = lazy(() => import("./pages/Home"))
const Signup = lazy(() => import("./pages/Signup"))
const Signin = lazy(() => import("./pages/Signin"))
const ImageCollection = lazy(() => import("./pages/ImageCollection"))
const Profile = lazy(() => import("./pages/Profile"))
const EventRegister = lazy(() => import("./pages/EventRegister"))
const EventResults = lazy(() => import("./pages/EventResults"))
const UploadMissionInfo = lazy(() => import("./pages/UploadMissionInfo"))
const SearchMissionInfo = lazy(() => import("./pages/SearchMissionInfo"))
const ManageAccounts = lazy(() => import("./pages/ManageAccounts"))
const ManageHome = lazy(() => import("./pages/ManageHome"))
const MissionHistory = lazy(() => import("./pages/MissionHistory"))



function App() {

  return (
      <AuthProvider>
      <Suspense fallback={<div className="flex h-screen items-center justify-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>}>
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
        <Route path="/missionhistory" element={
        <PrivateRoute>
          <MissionHistory />
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
      </Suspense>
      </AuthProvider>
  );
}

export default App
