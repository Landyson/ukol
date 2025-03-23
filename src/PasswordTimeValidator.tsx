import React, { useState, useEffect } from "react";
import { evaluatePassword } from "./PasswordStrength";

// Definice typu pro vlastnosti komponenty
interface PasswordTimeValidatorProps {
    password: string | null;
    passwordCreatedAt: Date; // Očekáváme Date objekt místo timestampu
    validationWindow?: number; // Volitelný parametr pro časovou validaci (default 5000ms)
}

const PasswordTimeValidator: React.FC<PasswordTimeValidatorProps> = ({
                                                                         password,
                                                                         passwordCreatedAt,
                                                                         validationWindow = 5000
                                                                     }) => {
    const [isValid, setIsValid] = useState<boolean | null>(null);

    useEffect(() => {
        // Pokud není heslo zadáno, nastavíme validitu na null
        if (!password) {
            setIsValid(null);
            return;
        }

        // Provedeme kontrolu validnosti hesla
        const { errors } = evaluatePassword(password);
        if (errors.length > 0) {
            setIsValid(null);
            return;
        }

        // Výpočet uplynulého času od vytvoření hesla
        const timeElapsed = Date.now() - passwordCreatedAt.getTime();
        setIsValid(timeElapsed >= validationWindow); // Pokud je uplynulý čas větší než validační okno, heslo je platné
    }, [password, passwordCreatedAt, validationWindow]); // Efekt se spustí, když se změní heslo nebo čas

    return (
        <div>
            {/* Zobrazení výsledku validace hesla */}
            {isValid === null ? (
                <p></p> // Pokud není validováno, neukazujeme žádný text
            ) : (
                <p className={isValid ? "text-success" : "text-danger"}>
                    Časová validace hesla: {isValid ? "Platné" : "Neplatné (zadáno příliš rychle)"}
                </p>
            )}
        </div>
    );
};

export default PasswordTimeValidator;