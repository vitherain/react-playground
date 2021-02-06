import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Market from "./Market";
import Wallet from "./Wallet";
import Referral from "./Referral";
import {AppBar, Button, Toolbar} from "@material-ui/core";
import * as configcat from "configcat-js";

function createConfigCatClient(configChanged: () => void) {
  const logger = configcat.createConsoleLogger(3);
  return configcat.createClientWithAutoPoll(
    "GcrYCMnuoU2LWo79dWhcXA/DU8FyDeGXEyg58xtJPqf0g",
    {
      pollIntervalSeconds: 10,
      logger: logger,
      configChanged
    }
  );
}

function App() {
  const [referralEnabled, setReferralEnabled] = useState<boolean>(false);

  useEffect(() => {
    const configChanged = async () => {
      console.log('notified about config change event, fetching FF');
      const value = await configCatClient.getValueAsync("referralEnabled", false);
      setReferralEnabled(value);
    };

    const configCatClient = createConfigCatClient(configChanged);
  }, []);

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit"><Link to="/">Market</Link></Button>
            <Button color="inherit"><Link to="/wallet">Wallet</Link></Button>
            {referralEnabled && (<Button color="inherit"><Link to="/referral">Referral</Link></Button>)}
          </Toolbar>
        </AppBar>

        <Switch>
          <Route path="/wallet">
            <Wallet/>
          </Route>
          <Route path="/referral">
            <Referral/>
          </Route>
          <Route path="/">
            <Market/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
