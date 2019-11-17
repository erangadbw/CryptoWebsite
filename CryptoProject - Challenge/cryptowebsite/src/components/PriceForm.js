import React, {Component} from 'react';
import {Form,Button} from 'react-bootstrap'
import fetch from 'cross-fetch'
import './PriceForm.css'

export class PriceForm extends Component {

    constructor(props) {
      super(props);
      this.state = {
        Currency:'',
        Date:'',
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
     const target = event.target;
     const name = target.name;
     const value = target.value
     this.setState({
       [name]:value
     })
   }


   verifiSubmit(){
    var disableSubmit = false;

    if(this.state.Currency === ''){
      disableSubmit = true;
    }
    if(this.state.Date === ''){
      disableSubmit = true;
    }
    return disableSubmit
   }



   handleSubmit = async event => {
     event.preventDefault();
     console.log(JSON.stringify({"currency":this.state.Currency, "timestamp":this.state.Date}));

     //Sends a post request to the Amazon API - which in turn runs a lambda function ,
     //this request will recieve the calculated lowest and highest prices and profit.
     const response = await fetch('https://f1qrz44wh9.execute-api.ap-southeast-2.amazonaws.com/api/crypto', {
       method:'POST',
       headers:{
         'Accept':'application/json',
         'Content-Type': 'application/json'
       },
       body:JSON.stringify({"currency":this.state.Currency,"timestamp":this.state.Date})
     })

     const body =  await response.json();

     //We than return the recieved data back to the App component to display the data through the Display Stats Component
     this.props.returnFormData(body)
     this.setState({
      Currency:'',
      Date:''
    })
  }

  render(){
    console.log(this.state);
    return (
  <div className ="wrapper">
    <div className ="form-wrapper">
              <Form data-cy-submit-button className = "form" onSubmit = {this.handleSubmit}  >
                  <div className = "typical" >
                    <Form.Label>Currency</Form.Label>
                    <Form.Control  data-cy-currecy-select className = "inputwrap"  as="select" name = "Currency" onChange = {this.handleChange} value={this.state.Currency}>
                      <option>Choose..</option>
                      <option value = "BTC">Bitcoin</option>
                      <option value = "LTC">Litecoin</option>
                      <option value = "ETH">Ethereum</option>
                      <option value = "ETC">Ethereum Classic</option>
                    </Form.Control>
                </div>
                  <div className ="typical">
                    <Form.Label>Date</Form.Label>
                    <Form.Control data-cy-date-select className = "inputwrap"  type="date" name="Date" onChange = {this.handleChange} value={this.state.Date}>
                    </Form.Control>
                    <span data-cy-errorfuturemessage style = {{display:this.props.showFutureError}} className="errorMessage">Please enter a date before today</span>
                    <span data-cy-errorolddatemessage style = {{display:this.props.showOldDateError}} className="errorMessage">Please enter a date after 2018</span>
                    <span data-cy-errorunkownmessage style = {{display:this.props.showUnknownError}} className="errorMessage">Unkown error Please try again</span>
                  </div>
                <div className = "submitButton">
                  <Button className = "submitButton-button" variant="primary" type="submit"  disabled = {this.verifiSubmit()}>
                    Submit
                  </Button>
                </div>
             </Form>
    </div>
  </div>
)};
}
