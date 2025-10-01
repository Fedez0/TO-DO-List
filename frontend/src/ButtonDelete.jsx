function ButtonDelete(props) {
    var { todo, user } = props.props;
    async function handleClick() {
        try {
            const backendUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000' : `http://${window.location.hostname}:3000`;
            const res = await fetch(`${backendUrl}/delete-task`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user, todo })
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Errore ${res.status}: ${errorText}`);
            }

            const data = await res.json();

            console.log("✅ Task deleted:", data);
            window.location.reload();

        } catch (err) { }




    }
    return (
        <button type="button" className="btn btn-outline-danger" onClick={handleClick}>🗑️</button>
    )
}
export default ButtonDelete;