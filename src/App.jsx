import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import LiveScores from "./Pages/LiveScores";
import EPLTable from "./Pages/EPLTable";
import TopPlayers from "./Pages/TopAssists";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LiveScores />} />
        <Route path="/table" element={<EPLTable />} />
        <Route path="/players" element={<TopPlayers />} />
      </Routes>
    </Router>
  );
}

export default App;
