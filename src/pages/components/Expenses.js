import React from 'react';
import Axios from 'axios';
import {apiUrl} from '../../App';

class Expenses extends React.Component{
	constructor(props){
		super(props);
		this.state = {onErr: 'none'};
	}
	
	deleteExpense(Id){
		Axios.delete(`${apiUrl}/expenses/${Id}`,{
			headers:{
				'Authorization': `Bearer ${document.cookie.split('token=')[1]}`
			}
		})
		.then((res)=>{
			console.log(res);
			window.location.reload();
		})
		.catch(err=>{this.setState({onErr:'inline'}); console.log(err)});
	}

	render(){
		const forbStyle = {
			color: '#f00',
			fontWeight: 'bolder',
			fontSize: '12px',
			marginLeft: '20px',
			display: this.state.onErr
		};

		return(
			<div className='regView__content__expenses'>
				<table>
					<tbody>
						<tr>
							<th>Uscite giustificate</th>
							<th>Tipo/tag</th>
						</tr>
						{
							this.props.exps.map(exp=>(							
							<tr key={exp._id}>
								<td style={{display:'flex', alignItems:'center'}}><strong style={{marginRight:'10px'}}>{exp.expenses}€</strong> {exp.name} <button style={{background:'none', border: 'none', cursor:'pointer'}} onClick={()=>this.deleteExpense(exp._id)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" height="24" fill='#ff2121' preserveAspectRatio="xMinYMin" className="icon__icon"><path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path><path d="M11.414 10l2.829 2.828a1 1 0 0 1-1.415 1.415L10 11.414l-2.828 2.829a1 1 0 1 1-1.415-1.415L8.586 10 5.757 7.172a1 1 0 0 1 1.415-1.415L10 8.586l2.828-2.829a1 1 0 0 1 1.415 1.415L11.414 10z"></path></svg></button>
								<p style={forbStyle}>NON AUTORIZZATO</p>
								</td>
								{(()=>{
									switch(exp.tag){
										case "ordinaria": return <td className='tag tag--low'>{exp.tag}</td>;
										case "straordinaria": return <td className='tag tag--mid'>{exp.tag}</td>;
										case "imperativa": return <td className='tag tag--high'>{exp.tag}</td>;
										default: return "invalid";
									}
								})()}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	};
}

export default Expenses;