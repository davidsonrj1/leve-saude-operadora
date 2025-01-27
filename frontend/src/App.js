import React from "react";
import AtivoForm from "./components/AtivoForm";
import AtivoList from "./components/AtivoList";
import Navbar from "./components/Navbar";

const App = () => {
    return (
        <div>
            <Navbar />
            <AtivoForm />
            <AtivoList />
        </div>
    );
};

export default App;
