import React from "react";

interface CharacterSequenceValidatorProps {
    password: string | null;
}

const CharacterSequenceValidator: React.FC<CharacterSequenceValidatorProps> = ({ password }) => {
    const errorArray: Array<string> = [];
    if (password === null) return <p></p>;
    if (password.search(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])(?=.*[😀-🙏]).{5,}/u) === -1) {
        errorArray.push("Heslo musí obsahovat velké písmeno, malé písmeno, číslici, speciální znak a emoji");
    }

    return (
        <>
            {errorArray.map((value, index) => (
                <p className="text-danger" key={index}>
                    {value}
                </p>
            ))}
        </>
    );
};

export default CharacterSequenceValidator;