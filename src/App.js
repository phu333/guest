import React from 'react';

import './App.css';
import 'antd/dist/antd.css'
import  SearchContractByCode  from "./SearchContract";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Result, Button } from 'antd';
import ContractForGuest from './ContractForGuest'
import { Offline, Online } from "react-detect-offline";

class App extends React.Component {

  render() {

    return (
      <div style={{ backgroundColor: "white", height: "100%", width: "80%", marginLeft: "10%" }} >

        <Online>

          

            <Router basename='/'>

              <Route exact path="/Search" component={SearchContractByCode} />
              <Route exact path="/Contract/:id" component={ContractForGuest} />


            </Router>

            {/* {information} */}
         
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
