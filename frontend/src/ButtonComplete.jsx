function ButtonComplete(props) {
    var {todo, user} = props.props;


    

    return (
    <div>
        <button className="btn btn-success" onClick={
            async () => {
                try {
                    const backendUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000' : `http://${window.location.hostname}:3000`;
                    const res = await fetch(`${backendUrl}/mark-task-as-completed`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ user, todo })
                    });

                    if (!res.ok) {
                        const errorText = await res.text();
                        throw new Error(`Errore ${res.status}: ${errorText}`);
                    }

                    const data = await res.json();
                  
                    console.log("✅ Task marked as completed:", data);
                    window.location.reload();

                } catch (err) { }
            }
        }>Done</button>
    </div>
    );
}
export default ButtonComplete;