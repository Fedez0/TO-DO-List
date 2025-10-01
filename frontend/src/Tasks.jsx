import { useState, useEffect } from 'react';
import Loader from './Loader.jsx';
import Task from './Task.jsx';

function Tasks(props) {
    const [risposta, setRisposta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        testDocker("rico");
    }, []);

    async function testDocker(user) {
        try {
            setLoading(true);
            setError(null);

            // Test connessione backend
            console.log('🔍 Testando connessione backend...');


            // Ora fai la richiesta principale
            const backendUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000' : `http://${window.location.hostname}:3000`;
            const res = await fetch(`${backendUrl}/get-all-tasks-for-user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user })
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Errore ${res.status}: ${errorText}`);
            }

            const data = await res.json();
          
            console.log("✅ Risultato dal Docker:", data);
            setRisposta(data);

        } catch (err) {
            console.error("❌ Problema:", err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    



    
    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <h2 className="text-danger">Errore: {error}</h2>
            ) : (
                <div>
                    {risposta?.map((task) => (
                        <Task props={task} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Tasks;