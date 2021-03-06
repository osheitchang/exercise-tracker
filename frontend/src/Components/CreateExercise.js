import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import serverUrl from '../configServer.js'


class CreateExercise extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


    this.state ={
        username:'',
        description:'',
        duration:0,
        date: new Date(),
        users: []
    }

    // ${serverUrl}
}
        componentDidMount() {
            console.log(this.state.users)

            console.log(`${serverUrl}/users`)
            axios.get(`${serverUrl}/users`)
            .then((response)=>{
                console.log("Hello")
                console.log(response)
                if(response.data.length > 0){
                    this.setState({
                        users: response.data.map(user=>user.username),
                        username:response.data[0].username
                    })
                    console.log("this is the response>>>>>",response.date)
                }
            })
            console.log(this.state.users)

        }
            // this.state.users =  response.username)
            // console.log(users))
            // .catch(err =>console.log(err))
            // this.setState({
                //     users: this.state.users,
                //     username: 'test User'
                // })
            //}

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        })
    }

    onChangeDuration(e) {
        this.setState({
        duration: e.target.value,
        })
    }
    
    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration:this.state.duration,
            date: this.state.date,
            users:this.state.users
        }

        axios.post(`${serverUrl}/exercises/add`, exercise)
        .then(res=> console.log(res.data))

        console.log(exercise)
        
        window.location ='/';
    }

    render() {
        console.log(this.state.username)
        return (
            <div>
                <h3>Create New Emotions Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className= "form-group">
                        <label> Username:</label>
                        <select ref = "userInput" required className="form-control" value={this.state.username} onChange={this.onChangeUsername}>
                        {
                            this.state.users.map(user=>{
                                return(
                                    <option key={user} value={user}> {user}</option>
                                )
                            })
                        }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <input type="text" required className="form-control" value={this.state.description} onChange={this.onChangeDescription} />
                    </div>
                    <div className="form-group">
                        <label>Intensity (1-10):</label>
                        <input type="text" required className="form-control" value={this.state.duration} onChange={this.onChangeDuration} />
                    </div>
                    <div className="form-group">
                        <label>Date:</label>
                        <div>
                            <DatePicker 
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                            />
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Create Exercise Log" className="btn btn-primary"/>
                        </div>
                </form>
            </div>
        );
    }
}


export default CreateExercise;