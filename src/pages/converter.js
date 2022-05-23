import React from "react";
import BodyLayout from "../components/bodyLayout";

const Converter = () => {
    
    const instructions = "Choose currency and its amount you want to convert and which currency you want it to convert to.";

    return (
        <BodyLayout page="Converter" instructions={instructions} />
    )
}

export default Converter;