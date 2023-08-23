import React from "react";
import { Route, Routes } from "react-router-dom";
export default function ComponentRoutes() {
  return (
 
      <Routes>
        <Route path="/" element={<div>About</div>} />
        <Route path="/videoCall" element={<div>About</div>} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
  );
}
