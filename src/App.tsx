import "./App.css";
import Layout from "./components/layout";
import Tuner from "./components/pages/tuner/page";
import { Route, Routes } from "react-router";
import HowToUse from "./components/pages/howToUse/page";
import About from "./components/pages/about/page";
import NotFound from "./components/pages/notFound/page";

function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Tuner />} />
        <Route path="how-to-use" element={<HowToUse />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
