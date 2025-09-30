

function Title(props) {
    var nome = props.nome;
    return <div className="container text-center mt-4"> 
        <h1 className="display-1 apple-font-semibold ">{nome} <small className="text-muted apple-font-light">'s To-Do List</small></h1>
        
    </div>
}

export default Title;