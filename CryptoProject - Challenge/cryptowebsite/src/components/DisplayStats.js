import React , {Component} from 'react'
import {Table} from 'react-bootstrap'
import './DisplayStats.css';


export class DisplayStats extends Component {
  render(){
    return (

        <div className = "wrapper">
        <div className = "table-wrapper">
        <Table   >
          <thead >
            <tr>
              <th className = "dateStamp" colSpan= "4">
              Date: {this.props.dateStamp}
              </th>
            </tr>
            <tr>
              <th className = "cryptoPair" colSpan= "4">
              Currency: {this.props.currency}
              </th>
            </tr>
            <tr>
              <th className = "marketDirection" colSpan= "2">
              BUY
              </th>
              <th className = "marketDirection" colSpan= "2">
              SELL
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className= "price" colSpan= "2" > ${this.props.calcData.minValue}</td>
              <td className= "price" colSpan= "2" >${this.props.calcData.highValue}</td>
            </tr>
            <tr>
              <td className= "time" colSpan= "2">{this.props.calcData.minTimeStamp}</td>
              <td className= "time" colSpan= "2">{this.props.calcData.highTimeStamp}</td>
            </tr>
            <tr>
              <td className= "profit" colSpan="5" >Profit: ${this.props.calcData.profit}</td>
            </tr>
          </tbody>
        </Table>
        </div>
        </div>
    )};
}
