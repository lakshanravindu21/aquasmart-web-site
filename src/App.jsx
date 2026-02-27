import React from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home.jsx";
import Problem from "./pages/Problem.jsx";
import Solution from "./pages/Solution.jsx";
import Architecture from "./pages/Architecture.jsx";
import AIModels from "./pages/AIModels.jsx";
import Results from "./pages/Results.jsx";
import UIScreens from "./pages/UIScreens.jsx";
import TechStack from "./pages/TechStack.jsx";
import Team from "./pages/Team.jsx";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/problem" element={<Problem />} />
        <Route path="/solution" element={<Solution />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/ai-models" element={<AIModels />} />
        <Route path="/results" element={<Results />} />
        <Route path="/ui-screens" element={<UIScreens />} />
        <Route path="/tech" element={<TechStack />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AnimatedRoutes />
    </HashRouter>
  );
}