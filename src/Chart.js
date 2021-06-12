import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import "./App.css";
const Chart = ({cases}) => {
    return (
        <div className="chart">
            <Card className="chart_card">
                <CardContent>
            <div className="chart_header">
              <h4> <Typography>Live Cases By Specific Country</Typography></h4> 
            </div>
            <div className="chart_data">
     
                {cases.map(({country,cases})=>
                       <td>
              <tr className="country_tr"> { country}</tr>
              <tr>{cases}</tr>
            </td>
                )}
               
            </div>
            </CardContent>
            </Card>
        </div>
    )
}

export default Chart
