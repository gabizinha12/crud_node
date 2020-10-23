import axios from 'axios';

const PERSON_API_BASE_URL = "http://localhost:3000/api";

class PersonService {

    getPerson(people){
        return axios.get(PERSON_API_BASE_URL + '/people/' + people);
    }

    createPerson(person){
        return axios.post(PERSON_API_BASE_URL + '/' + person);
    }

    updatePerson (person, id){
        return axios.put(PERSON_API_BASE_URL + '/' + person + '/' + id);
    }

    deletePerson(folk, id){
        return axios.delete(PERSON_API_BASE_URL + '/' + folk + '/' + id);
    }
}

export default new PersonService()