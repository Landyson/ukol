import React, { useState, useEffect } from 'react';
import PasswordInput from './PasswordInput';
import PasswordStrength from './PasswordStrength';
import CharacterSequenceValidator from './CharacterSequenceValidator';
import PasswordTimeValidator from './PasswordTimeValidator';

const App: React.FC = () => {
    const [password, setPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');  // Stav pro sílu hesla
    const [passwordCreatedAt, setPasswordCreatedAt] = useState<Date>(new Date());  // Uchováváme Date objekt místo timestampu

    const handlePasswordChange = (newPassword: string) => {
        setPassword(newPassword);
        setPasswordCreatedAt(new Date());  // Nastavení aktuálního času jako Date objekt
    };

    // Funkce pro vyhodnocení síly hesla
    const evaluatePassword = (password: string): string => {
        if (password.length < 8) return 'Slabé';
        if (!/[A-Z]/.test(password)) return 'Slabé';
        if (!/[0-9]/.test(password)) return 'Slabé';
        if (!/[!@#$%^&*]/.test(password)) return 'Slabé';
        if (!/[😀-🙏]/u.test(password)) return 'Slabé';
        return 'Silné';
    };

    // useEffect pro automatické vyhodnocení síly hesla při každé změně
    useEffect(() => {
        const strength = evaluatePassword(password);
        setPasswordStrength(strength);
    }, [password]);  // Efekt se spustí při změně hesla

    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Zjištění síly hesla</h2>
                <PasswordInput passwordValue={password} setter={handlePasswordChange} />
                {/* Zobrazíme sílu hesla */}
                <PasswordStrength password={password} />
                <p className="mt-2">Síla hesla: {passwordStrength}</p>  {/* Zobrazení síly hesla */}
                <CharacterSequenceValidator password={password} />
                <PasswordTimeValidator passwordCreatedAt={passwordCreatedAt} /> {/* Opraveno předání Date objektu */}
            </div>
        </div>
    );
};

export default App;