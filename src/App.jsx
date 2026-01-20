import { Page1 } from "./components/templatesPages/index.jsx";
import { Mata } from "./components/mata-mata/index.jsx";
import { MataLog } from "./components/mataLog/index.jsx";
import { QuartasFinal } from "./components/final4/index.jsx";
import { Semifinal } from "./components/semifinal/index.jsx";
import { Final } from "./components/final/index.jsx";
import { HallDaFama } from "./components/hall/index.jsx";
import { Routes, Route } from "react-router-dom";
import "./styles/globalStyle.scss";


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Page1 />} />
      <Route path="/mata" element={<Mata />} />
      <Route path="/mataLog" element={<MataLog />} />
      <Route path="/quartas" element={<QuartasFinal />} />
      <Route path="/semifinal" element={<Semifinal />} />
      <Route path="/final" element={<Final />} />
      <Route path="/hall" element={<HallDaFama />} />
    </Routes>
    </>
  )
}

export default App
