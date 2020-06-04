import React from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const CardList = (props) =>(
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
  </div>
);

class Card extends React.Component{
  render(){
    const profile = this.props;
     return (
      <div className="github-profile"> 
        <img src={profile.avatar_url} alt="prof-pix" style={{backgroundColor: "grey"}}/>
        <div className="info">
          <div className="name">{profile.name} </div>
          <div className="company">{profile.company} </div>
        </div>
      </div>
     );
  }
};

class Form extends React.Component{
  state = {username: ""}
  handleSubmit = async (event) =>{
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.username}`);
    this.props.onSubmit(resp.data);
    this.setState({username: ""})
  };
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input 
        placeholder="Github username" 
        value = {this.state.username}
        onChange={event=> this.setState({username: event.target.value})}
        required />
        <button>Add card</button>
      </form>
    )
  }
};

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      profile: [],
    };
  };
  addNewProfile = (profileData) =>{
    this.setState(prevState => ({
      profile: [...prevState.profile, profileData]
    }))
    console.log('App', profileData);
  };  
  render () {
  return (
  <div>
    <div className="header">{this.props.title}</div>
      <Form onSubmit={this.addNewProfile} />
      <CardList profiles = {this.state.profile}/>
  </div>
    )
  }
};

export default App;