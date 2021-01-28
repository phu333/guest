import React from 'react';

import './App.css';
import 'antd/dist/antd.css'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Result, Button } from 'antd';
import ContractForGuest from './ContractForGuest'
import { Offline, Online } from "react-detect-offline";

class App extends React.Component {

  render() {

    return (
      <div style={{backgroundColor:"white",height: "100%", width:"80%", marginLeft:"10%"}} >
        
          <Online>

          <Router>

            <Router>

          
              <Route exact path="/guest/Contract/:id" component={ContractForGuest} />


            </Router>

            {/* {information} */}
          </Router>
          </Online>
          <Offline><Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."

          /></Offline>

       



      </div>
    );
  }
}

export default App;
