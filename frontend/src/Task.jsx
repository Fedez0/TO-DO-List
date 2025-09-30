import ButtonComplete from "./ButtonComplete";
import ButtonDelete from "./ButtonDelete";

function Task({ props }) {
    var todo = props.todo;
    var created = props.created;
    var deadline = props.deadline;
    var stare = props.stare;
    var user = props.user;
    
    


    return (
        <div className="card mb-3">
            <div className="card-body">
                <h3 className="alert alert-secondary"><strong>{todo}</strong></h3>
                <br />
                <div >
                    <p className="card-text "><strong>Created:</strong> {created}</p>
                    {deadline && (
                        <p className="card-text" style={{ color: 'red' }}><strong>Deadline:</strong> {deadline}</p>
                    )}
                    <div className="d-flex justify-content-between align-items-center">
                        <div><strong>Status:</strong> {stare === 0 ? 'Pending' : 'Done'}</div>
                        {stare === 0 && <ButtonComplete props={{todo, user}} />}
                        {stare === 1 && <ButtonDelete props={{todo, user}} />}
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Task;