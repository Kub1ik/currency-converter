import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout";
import Home from "./pages/home";
import Rates from "./pages/rates";
import NoPage from "./pages/noPage";
import Converter from "./pages/converter";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="rates" element={<Rates />} />
                    <Route path="converter" element={<Converter />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

export default App;