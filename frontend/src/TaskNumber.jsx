import { useEffect, useState } from 'react';
import Loader from './Loader.jsx';
function TaskNumber(props) {
    const [taskCount, setTaskCount] = useState(0);
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
            const protocol = window.location.protocol; // 'http:' o 'https:'
            const hostname = window.location.hostname;
            const backendUrl = hostname === 'localhost' ? 'http://localhost:3000' : `${protocol}//${hostname}:3000`;
            const res = await fetch(`${backendUrl}/get-number-of-tasks`, {
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
            setTaskCount(data.number || 0);

        } catch (err) {
            console.error("❌ Problema:", err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }




    var res;
    if (taskCount === 0) {
        res = "No tasks left! 🎉";
    } else if (taskCount === 1) {
        res = "There is 1 task pending. 📝";
    } else {
        res = `There are ${taskCount} tasks pending. 📝`;
    }

    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <h2 className="text-danger">Errore: {error}</h2>
            ) : (
                <div>
                    <p className="lead">{res}</p>
                </div>
            )}
        </div>
    );
}
export default TaskNumber;