import React, {Component} from 'react';
import PersonService from '../services/PersonService';

class ListPersonComponent extends Component{
    constructor(props) {
        super(props)
        this.state = {
            people: []
        }
        this.addPerson = this.addPerson.bind(this)
        this.editPerson = this.editPerson.bind(this)
        this.deletePerson = this.deletePerson.bind(this)
    }

    deletePerson(id) {
        PersonService.deletePerson(id).then(res => {
            this.setState({person: this.state.people.filter(person => person.id !== id)})
        })
    }
    viewPerson(id){
        this.props.history.push(`/people/${id}`);
    }
    editPerson(id){
        this.props.history.push(`/person/${id}`);
    }
    componentDidMount(){
        PersonService.getPerson().then((res) => {
            this.setState({ people: res.data});
        });
    }

    addPerson(){
        this.props.history.push('/person');
    }
    render() {
        return(
            <div>
            <h2 className="text-center">People List</h2>
            <div className = "row">
               <button className="btn btn-primary" onClick={this.addPerson}> Add Person</button>
            </div>
            <br></br>
            <div className = "row">
                   <table className = "table table-striped table-bordered">

                       <thead>
                           <tr>
                               <th> Person Name</th>
                               <th> Person Age</th>
                               <th>Person  Civil status</th>
                               <th>Person CPF</th>
                               <th>Person City</th>
                               <th>Person State</th>
                               <th> Actions</th>
                           </tr>
                       </thead>
                       <tbody>
                           {
                               this.state.people.map(
                                   person => 
                                   <tr key = {person._id}>
                                        <td> {person.name} </td>   
                                        <td> {person.age}</td>
                                        <td> {person.civil_status}</td>
                                        <td> {person.cpf}</td>
                                        <td> {person.city}</td>
                                        <td> {person.state}</td>
                                        <td>
                                            <button onClick={ () => this.editPerson(person.id)} className="btn btn-info">Update </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deletePerson(person.id)} className="btn btn-danger">Delete </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.viewPerson(person.id)} className="btn btn-info">View </button>
                                        </td>
                                   </tr>
                               )
                           }
                       </tbody>
                   </table>

            </div>

       </div>
        )
    }


}
export default ListPersonComponent