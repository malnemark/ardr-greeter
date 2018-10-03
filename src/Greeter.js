import React, { Component } from 'react';
import {Container,Form, FormText,FormGroup,Row,Col,Label,Input,
        Nav, NavItem, NavLink,TabContent,TabPane, Card, Button, CardTitle, CardText} from 'reactstrap';
import classnames from 'classnames';

// Unknown user: Tab to decide login / new account
//
// -> Login: Log in with Account ID and option to enter passPhrase, store and PIN protect it
// Component: RegisterPinAccount
//
// -> New Account: Create Passphrase, Account and PIN protect it.
// Component: NewPinAccount
//
// Log in with Account ID, without passPhrase, option to remember account
// Component: StandardLogin

function RegisterPin(props) {
  return(<p>Register PIN</p>);
}

function CreateAccount(props) {
  return(<p>Create Account</p>);
}

class PinLogin extends Component {
  render(){
    return(
      <Container>
        <Row><Col>
          <Form inline>
            <FormGroup>
              <Label size="lg" hidden>PIN</Label>
              <Input placeholder="Enter your PIN" bsSize="lg" />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </Col></Row>
      </Container>
    );
  }
}


class StandardLogin extends Component {
  render(){
    return(
      <Container>
        <Row><Col>
          <Form>
            <FormGroup>
              <Label>Account</Label>
              <Input  placeholder="Enter your account address" />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </Col></Row>
      </Container>
    );
  }
}


function Chooser(props){
  return(
    <Container>
      <Row>
        <Col>
          <p>You need an Ardor account to use the Tarasca wallet. You can create a new account or use an existing one.</p>
          <p>We offer to store your pass phrase encrypted on your device to make playing the game a better experience.
              Note that this is not as secure as keeping it offline.</p>
        </Col>
      </Row>
      <Row>
        <Col sm="6">
          <Card body>
            <CardTitle>New User</CardTitle>
            <CardText>You can create a new Ardor account and protect it with a PIN</CardText>
            <FormGroup>
              <input type="checkbox" name="usePin" checked={props.usePin}
                      onChange = {props.togglePinUse}
                      /> use PIN authentication
            </FormGroup>
            <Button onClick={props.createAccount}>Create account</Button>
          </Card>
        </Col>
        <Col sm="6">
          <Card body>
            <CardTitle>Returning?</CardTitle>
            <CardText>Log in with your account ID. You can choose whether you want to use our PIN protection or not (more secure).</CardText>
            <Button onClick={props.logIn}>Log In</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}


// Main page
class Greeter extends Component {
  constructor(props){
    super(props);
    this.state={
      chooserActive:true,
      newUser:false,
      usePin:false,
      rememberMe:true
    }
  }

  logIn(){
    this.setState({chooserActive:false,newUser:false});
  }
  createAccount(){
    this.setState({chooserActive:false});
  }
  togglePinUse(){
    this.setState({usePin:!this.state.usePin});
  }


  render(){
    let output;
    if (this.state.chooserActive){
      output = (<Chooser  logIn={()=>this.logIn()}
                          createAccount={()=>this.createAccount()}
                          togglePinUse={()=>this.togglePinUse()}/>);
    }
    else if (!this.state.newUser) {
      if (this.state.usePin) {
        console.log('PIN Login');
        output = (<PinLogin/>);
      }
      else {
        console.log('Standard Login');
        output = (<StandardLogin/>);
      }
    }
    else {
      if (this.state.usePin) {
        console.log('Register PIN');
        output = (<RegisterPin/>);
      }
      else {
        console.log('Create Account');
        output = (<CreateAccount/>);
      }
    }

    return(
      <div>
        <Container>
          <Row>
            <Col><h1>Greeter</h1></Col>
          </Row>

        </Container>
            {output}
      </div>
    );
  }
}


class GreeterTabs extends Component {
  constructor(props){
    super(props);
    this.state={
      activeTab:1,
    }
    this.toggle = this.toggle.bind(this);
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render(){
    return(
          <div>
          <h1>Greeter</h1>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}  >
                  Tab1
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}  >
                  Moar Tabs
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <h4>Tab 1 Contents</h4>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>Special Title Treatment</CardTitle>
                      <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                      <Button>Go somewhere</Button>
                    </Card>
                  </Col>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>Special Title Treatment</CardTitle>
                      <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                      <Button>Go somewhere</Button>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
    );
  }
}

export {Greeter};
