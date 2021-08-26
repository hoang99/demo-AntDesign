
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,

} from "react-router-dom";
import { Row, Col } from 'antd';

import './App.css';
import Staff from './components/Staff';
import Navigation from './components/Navigation';
import Department from './components/Department';
import NotFound from './components/NotFound';

function App() {
    return (
        <Router>
            <Switch>
                <Row>
                    <Col span={2} >
                        <Navigation></Navigation>
                    </Col>
                    <Route exact path="/department">
                        <Col span={19} offset={2}  >
                            <Department></Department>
                        </Col>
                    </Route>
                    <Route exact path="/staff">
                        <Col span={19} offset={2}  >
                            <Staff></Staff>
                        </Col>
                    </Route>
                    <Route exact path="/">
                        <Col span={19} offset={2}  >
                            <NotFound></NotFound>
                        </Col>
                    </Route>
                </Row>,
                <div className="App">
                </div>
            </Switch>
        </Router>
    );
}

export default App;
