import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header.tsx";
import LoadingSpinner from "./components/loading-spinner.tsx";

const Home = React.lazy(() => import("./pages/home.tsx"));
const CreateCertificates = React.lazy(
  () => import("./pages/create-cerficates.tsx")
);

function App() {
  return (
    <>
      <Header />
      <div className="w-9/12 mx-auto">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/create-certificates"
              element={<CreateCertificates />}
            />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
