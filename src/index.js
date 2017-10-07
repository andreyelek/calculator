import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
const buttons = []
const Button = (value, onClick, disabled, options) => <button onClick={onClick} className={options} 
disabled={disabled == 'disabled'}>{value}</button>


class Buttons extends React.Component {



  renderButton(i, disabled, options) {
      return Button(i,() => this.props.onClick(i),disabled,options)    
  }
  // сделать двойным циклом
	render() {
		return (
			<div className = 'buttons'>
				<div className="buttons-row">
		          {this.renderButton('AC')}
		          {this.renderButton('+/-')}
		          {this.renderButton('%', 'disabled')}
		          {this.renderButton('÷')}
		        </div>
		        <div className="buttons-row">
		          {this.renderButton(7)}
		          {this.renderButton(8)}
		          {this.renderButton(9)}
		          {this.renderButton('×')}
		        </div>
		        <div className="buttons-row">
		          {this.renderButton(4)}
		          {this.renderButton(5)}
		          {this.renderButton(6)}
		          {this.renderButton('-')}
		        </div>
		         <div className="buttons-row">
		          {this.renderButton(1)}
		          {this.renderButton(2)}
		          {this.renderButton(3)}
		          {this.renderButton('+')}
		        </div>
		         <div className="buttons-row">
		          {this.renderButton(0,false,'zero')}
		          {this.renderButton(',')}
		          {this.renderButton('=')}
		        </div>
			</div>
		);
	}
}


class Display extends React.Component {
	render() {
		let style = {fontSize: this.props.font + 'px'}
		return (
			<div className = 'display' style={style}>
				{this.props.value}
			</div>
		);
	}
}

class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      displayValue: 0,
      fontSize: 60
      };
  }

  handleClick(i){
  // разбить на функции
  	let value
  	let dispVal = String(this.state.displayValue)
  	if (typeof(i) === 'number') {
	  	value = dispVal.length == 40 ? dispVal:
  		((+dispVal === 0 && dispVal !== '0.')||this.reset) ? i : String(dispVal) + i;
  		this.reset = 0;
    }
	
  	switch(i) {
  case 'AC': 
   this.setState({
  			fontSize: 60,
  			displayValue: 0
  		})
   	return
    break;
  case '+': 
   this.cache = dispVal;
   this.action = '+';
   this.reset = true;
    break;

  case '-': 
   this.cache = dispVal;
   this.action = '-';
   this.reset = true;
    break;

  case '÷': 
   this.cache = dispVal;
   this.action = '÷';
   this.reset = true;
    break;

  case '×': 
   this.cache = dispVal;
   this.action = '×';
   this.reset = true;
    break;

  case '+/-': 
   value = -1 * dispVal;
   break;
  case ',':
  if (!(String(dispVal).indexOf('.') + 1)) value = dispVal + '.';
   break;
  case '=':
  	if(this.action){
  		this.cache = +this.cache
  	  	dispVal = +dispVal
  	  	switch(this.action){  		
  	  		case '+' :
  	  			value = this.cache + dispVal
  	  		break;
  	
  	  		case '-' :
  	  			value =this.cache - dispVal
  	  		break;

  	  		case '÷' :  	
  	  			value = this.cache / dispVal
  	  		break;
  	
  	  		case '×' :
  	  			value = this.cache * dispVal
  	  		break;
  	  		} 
  	  	this.reset = 0
  	  	this.action = 0	  	
  	  	this.cache = false
  	 	break;
  		}
	}
	
  	value = String(value || dispVal)
	let size =  (value.length < 12) ? 12 : value.length;
	if(!(value.indexOf('.') + 1)){
		value = +value;
		value + value.toFixed(10)
	}
	this.setState({
  			fontSize: 720 / size,
  			displayValue: value
  		})
	
}
  render() {

		return (
			<div className = 'calculator'>
				<Display 
				  value = {this.state.displayValue}
				  font = {this.state.fontSize}
				 />
				<Buttons onClick={(i) => this.handleClick(i)} />
			</div>
		);
	}
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);