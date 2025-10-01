import { useState } from 'react';

function Modal(props) {
    const [todo, setTodo] = useState('');
    const [date, setDate] = useState('');

    var user = props.user;


    function handleSubmit(e) {
        e.preventDefault();
        console.log('Nuova task:', { title: todo });
        const temp = 0;

        async function createTask(user) {
            try {
                console.log("🚀 Creating new task:", { title: todo, user: user, date: date });
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                today = dd + '-' + mm + '-' + yyyy;

                const created = today;

                const deadline = date.split('-').reverse().join('-');
                const backendUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000' : `http://${window.location.hostname}:3000`;
                const res = await fetch(`${backendUrl}/add-new-task`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ user, todo, created, deadline, temp })
                });


                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(`Errore ${res.status}: ${errorText}`);
                }

                const data = await res.json();

                console.log("✅ Task marked as completed:", data);
                window.location.reload();

            } catch (err) {
                console.error("❌ Error marking task as completed:", err);
            }
        }
        createTask(user);

        setTodo('');


        const modal = document.getElementById('modal-task');

    }

    return (
        <div className="modal fade" id="modal-task" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create new Task</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Title *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={todo}
                                    onChange={(e) => setTodo(e.target.value)}
                                    placeholder="Insert task title"
                                    required
                                />
                                <div className="form-group">
                                    <label className="active" htmlFor="dateStandard">Datepicker</label>
                                    <input className="form-control" type="date" id="dateStandard" name="dateStandard" value={date} onChange={(e) => setDate(e.target.value)} />
                                </div>
                            </div>
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                                Create Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Modal;