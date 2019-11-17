import React, {Component,} from 'react';
import {Container} from 'react-bootstrap'
import {NavigationBar} from './components/NavigationBar';
import {Jumbotron} from './components/Jumbotron';
import {PriceForm} from './components/PriceForm';
import {DisplayStats} from './components/DisplayStats';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Currency:'',
      Date:'',
      showDisplayStats:'none',
      calcData:'',
      modalShow:false,
      showFutureError:'none',
      showOldDateError:'none',
      showUnknownError:'none'

    };
  }

  //receives form data from the PriceForm component
  getFormData = (priceData) => {
    if(!priceData.errorMessage){
      this.setState({
        Currency:priceData.currency,
        Date:priceData.date,
        showDisplayStats:'',
        calcData:priceData.calcData,
        showFutureError:'none',
        showOldDateError:'none',
        showUnknownError:'none'
      })
    } else {

      // Displays a errorMessage if the entered date value into the form is before 2018.
      // Assumes that we can only access data from 2018 and upwards
      if(priceData.errorMessage === 'dateIsBefore2018'){
          this.setState({
              showOldDateError:'',
              showFutureError:'none',
              showUnknownError:'none'
          })
        //Displays a errorMesage if the date entered is greater than today
      } else if(priceData.errorMessage === 'dateisGreaterThanToday') {
        this.setState({
            showFutureError:'',
            showOldDateError:'none',
            showUnknownError:'none'
        })
      } else {
          //catch all which covers all unknown errors from the Exchange API
          this.setState({
              showFutureError:'none',
              showOldDateError:'none',
              showUnknownError:''
          })
        }
      }
    }


  render(){
    console.log(this.state)
    let modalClose = () => this.setState({modalShow:false})

    return (
      <React.Fragment>
        <NavigationBar />
        <Jumbotron/>
        <PriceForm
         returnFormData ={this.getFormData}
         showFutureError = {this.state.showFutureError}
         showOldDateError = {this.state.showOldDateError}
         showUnknownError = {this.state.showUnknownError}
         />
        <DisplayStats calcData = {this.state.calcData} dateStamp = {this.state.Date} currency = {this.state.Currency}  />
      </React.Fragment>

    )};
}

export default App;
