import React, { useState } from 'react';

interface PasswordInputProps {
    passwordValue: string;
    setter: (value: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ passwordValue, setter }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="mb-4 flex flex-col items-center">
            <div className="relative w-full">
                <input
                    type={isVisible ? "text" : "password"}
                    className="form-control w-full p-2"
                    onChange={(e) => setter(e.target.value)}
                    value={passwordValue}
                    placeholder="Zadejte heslo"
                />
                <button
                    onClick={() => setIsVisible(!isVisible)}
                    className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y"
                >
                    {isVisible ? '👁️' : '🔒'}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;