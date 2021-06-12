import React from 'react';
import {Card,CardContent, Typography } from '@material-ui/core';
import "./App.css";
const Infobox = ({title,total}) => {
    return (
        <div className="main_infobox">
            <Card>
                <CardContent>
                <h3>     <Typography>{title}</Typography></h3>   
               <Typography>{total>=1000000?total/1000000 +" M":total>=1000?total/1000 +" K":total} Total</Typography> 
                </CardContent>
            </Card>
        </div>
    )
}

export default Infobox
