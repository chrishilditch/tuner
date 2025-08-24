import "./App.css";
import Layout from "./components/layout";
import { Pitch } from "./components/pages/tuner/page";
import { Route, Routes } from "react-router";
import HowToUse from "./components/pages/howToUse/page";
import About from "./components/pages/about/page";

function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Pitch />} />
        <Route path="how-to-use" element={<HowToUse />} />
        <Route path="about" element={<About />} />
      </Routes>
    </Layout>
  );
}

export default App;
