import React from 'react';
import Axios from 'axios';
import {apiUrl} from '../../App';

class Popup extends React.Component {
    constructor(props){
        super(props);
        this.logIn = this.logIn.bind(this);
        this.state = {name: '', password: {value:''}};
    }

    logIn(){
        Axios.post(`${apiUrl}/login`, {
            name: this.state.name,
            password: this.state.password.value
        },{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res=> document.cookie = `token=${res.data.token}; SameSite=None; Secure;`)
        .then(()=>{window.location.reload()})
        .catch(err=>{
            document.cookie = `badReq=${err};`;
            window.location.replace('/badreq');
            console.log(err);
        });
    }
    
    render() {
        const popUpStyle = {
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            margin: 'auto',
            backgroundColor: 'rgba(0,0,0, 0.5)'
        };
        
        const popUpInnerStyle = {
            topSpaceVal: window.innerWidth < '1920' ? 20 : 25,
            defVal: window.innerWidth < '1920' ? 12 : 25,
            position: 'absolute',
            left: '',
            right: '',
            top: '',
            bottom: '',
            margin: 'auto',
            background: 'white',
            padding: '3rem',
            borderRadius: '5px',
            boxShadow: '0px 0px 50px rgba(0,0,0, .5)'
        };
        popUpInnerStyle.left = `${popUpInnerStyle.defVal}%`;
        popUpInnerStyle.right = `${popUpInnerStyle.defVal}%`;
        popUpInnerStyle.top = `${popUpInnerStyle.topSpaceVal}%`;
        popUpInnerStyle.bottom = `${popUpInnerStyle.defVal}%`;

        const formStyle = {
			width: '345px',
			height: '55px',
			fontSize: '2rem',
			border: '3px solid lightgrey',
			borderRadius: '3px',
			backgroundColor: '#29374f',
			color: 'white',
			boxShadow: '1px 3px 5px 1px rgba(0,0,0, .5)'
		}
        const closeBtnStyle = {
            border:'none', 
            background:'none', 
            cursor: 'pointer', 
            position: 'absolute', 
            top:'1rem', 
            right: '1.5rem', 
            color:'grey'
        }
      return (
          <div style={popUpStyle}>
              <div style={popUpInnerStyle}>
              <button style={closeBtnStyle} onClick={this.props.closePopup}><svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 24 24" width="30" height="30" preserveAspectRatio="xMinYMin" className="icon__icon"><path d="M7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z"></path></svg></button>
                <div style={{marginTop: '20px', margin:'auto', textAlign: 'left', width:'40%'}}>
                    <h3 style={{textAlign: 'center'}}>Autorizzazione Admin</h3>

                    <label>Name</label>
                    <input style={{marginBottom: '1rem'}} type='text' name='name' value={this.state.name} onChange={(e)=>this.setState({name: e.target.value})}/>
                    
                    <label>Password</label><br />
                    <input style={formStyle} type='password' name='password' value={this.state.password.value} onChange={(e)=>this.setState({password: {value: e.target.value}})}/>
                    
                    <input className='btn-default' style={{width:'100%', marginTop: '1.5rem'}} type='submit' value='Invia' onClick={this.logIn} />
                </div>
                <p style={{marginTop:'1.5rem'}}>Attenzione, dopo l'invio se le credenziali sono corrette, verrà mostrata nuovamente la pagina del registro in qui sarà possibile eseguire le operazioni protette. 
                    <br/><br/><strong>NB: Una volta ottenuta l'autorizzazione di eseguire le operazioni protette, il programma fornirà una finestra di 30 secondi dopo i quali l'autorizzazione sarà di nuovo negata!</strong>
                </p>
              </div>
          </div>
      );
    }
  }

  export default Popup;