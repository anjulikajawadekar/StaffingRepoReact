import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import base_url from '../api/bootapi';
import axios from 'axios';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Chart1GFG extends Component {
	constructor(props) {
        super(props);
        this.state = {
            input: {},
            errors: {},
            hover: false,
        };

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFetchedData = this.handleFetchedData(this);
        // this.keyUpHandler = this.keyUpHandler.bind(this);
    }

    handleFetchedData() {

        let empID = localStorage.getItem('empID');

        axios.get(`${base_url}/get_EmpById?empid=${empID}`).then((json) => {
            console.log(json.data[0].username)
            this.setState({
                input: json.data[0],
            });
            console.log("input: " + JSON.stringify(json.data[0]));
        })
    }
	
	render() {
		const options = {
			title: {
				text: "Column Chart"
			},
			data: [
			{
				// Change type to "doughnut", "line", "splineArea", etc.
				type: "column",
				dataPoints: [
					{ label: "Apple",  y: 10  },
					{ label: "Orange", y: 15  },
					{ label: "Banana", y: 25  },
					{ label: "Mango",  y: 30  },
					{ label: "Grape",  y: 28  },
				]
			}
			]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
		
				/* onRef={ref => this.chart = ref} */
			/>
			{console.log(options)}
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
// module.exports = App;  
export default Chart1GFG;