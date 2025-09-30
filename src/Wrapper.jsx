import Title from './Title.jsx';
import TaskNumber  from './TaskNumber.jsx';
import ButtonTODO from './ButtonTODO.jsx';
import Tasks from './Tasks.jsx';

function Wrapper(props) {
    const style = {
        backgroundColor: '#DBE2EF',
        borderColor: '#3F72AF',
        border: '3px solid #3F72AF',
        minHeight: '400px',
        width: '60%',
        maxWidth: '800px'
    };
    
    return (
        <div className="d-flex justify-content-center mt-4">
            <div className='rounded p-4 shadow-lg' style={style}>
                <Title nome="Rico" />
                <TaskNumber numero={3} />
                <Tasks />
                <ButtonTODO user="rico"/>
            </div>
        </div>
    );
}

export default Wrapper;