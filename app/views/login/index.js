import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  AsyncStorage,
  TouchableWithoutFeedback
} from "react-native";

import { StackActions, NavigationActions } from "react-navigation";

import { bindActionCreators } from "redux"
import { connect } from "react-redux";

import { userSetState } from "../../redux/actions/Users";

import { LinearGradient, Font } from "expo";
import { navigationAppAction } from "../../router/actions/App";
import { requestLoginIn, requestRegister } from "../../redux/actions/Users/request";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const navigationActions = NavigationActions.navigate({
  routeName: "Home",
  params: {},
  action: NavigationActions.navigate({ routeName: "Home" })
});

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "App" })]
});

class Login extends React.Component {

  inputs = {};

  constructor(state) {
    super(state);
    this.state = {
      activeLoginIn : true,
      view : "login",
      views : [
        {
          name : "login"
        },
        {
          name : "register"
        }
      ],
      user: {
        username : "",
        email: "",
        password: "",
      }
    };

    console.warn(this.props);
  }

  componentWillUpdate(){
    
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("../../assets/fonts/roboto/Roboto-Medium.ttf")
    });
  }

  componentWillReceiveProps() {
    console.warn("sim");
  }

  onUpdateInputs = () =>{
    console.log(this.state)
    const { view } = this.state
    const { email, password , username } = this.state.user
    if(( email.length > 0 && password.length > 0) || (email.length > 0 && password.length > 0 && username.length > 0 && view === "register") ){
      this.onActriveLoginIn(false) 
    }else{
      this.onActriveLoginIn(true) 
    }
  }

  dispatchView = (view) => {
    this.setState((state) => {
      return{
        view,
        user : {
          ...state.user,
          username : "",
          email : "",
          password : ""
        }
      }
    },() => {
      this.onUpdateInputs()
    })
  }

  onActriveLoginIn(value){
    this.setState((state) => {
      return{
        activeLoginIn : value
      }
    })
  }

  async onLogin() {
    const { view , user } = this.state
    const { userSetState } = this.props
    if(view === "login"){
      await requestLoginIn(user).then(({ response }) => {
        // console.log(response)
        const { id } = response
        userSetState(response)
        AsyncStorage.setItem("user", JSON.stringify(id)).then(() => {
          this.props.navigation.dispatch(navigationAppAction);
        });
      }).catch((errors) => {
        console.log(errors)
      })
    }else if(view === "register"){
      await requestRegister(user).then(({ response }) => {
        const { id } = response
        userSetState(response)
        AsyncStorage.setItem("user", JSON.stringify(id)).then(() => {
          this.props.navigation.dispatch(navigationAppAction);
        });

      }).catch((errors) => {
        console.log(errors)
      })
    }
    // await AsyncStorage.setItem("user", JSON.stringify(this.state.user));

  }

  focusTheField = (id) => {
    this.inputs[id].focus();

  }

  render() {
    const { activeLoginIn , views , view } = this.state
    const { username , email , password } = this.state.user

    var buttonName = view

    return (
      <View style={styles.container}>
      <ScrollView contentContainerStyle={{
            flex : 1,
             }} showsVerticalScrollIndicator={false} >
        <LinearGradient
          colors={["#330838", "#1e0421"]}
          style={{
            flex: 1,
            width, 
            alignItems: "center",
            justifyContent: "center"
          }}
        >
        <Image
            style={styles.logo}
            source={require("../../assets/img/main-logo.png")}
          />
          <View style={{ height : 230 , alignItems : "center" , justifyContent : 'center' }} >

         {
          view == "register" ? (
            <View>
             <View style={styles.inputLogin}>
              <TextInput
               style={styles.inputTextLogin}
               ref={input => { this.inputs["field1"] = input }}
               placeholder="Nome"
               label={"field1"}
               blurOnSubmit={false}
               returnKeyType="next"
               onSubmitEditing={() => { this.focusTheField('field2') }}
               value={username}
               underlineColorAndroid="#3e0644"
               onChangeText={text =>{ 
                  this.setState({ user: { ...this.state.user, username: text } },() => {
                    this.onUpdateInputs()
                  })
                }}
              />
              </View>
            </View>
          ) : null
        }
           <View style={styles.inputLogin}>
             <TextInput
               style={styles.inputTextLogin}
               ref={input => { this.inputs["field2"] = input }}
               placeholder="E-mail"
               label={"field2"}
               returnKeyType="next"
               onSubmitEditing={() => { this.focusTheField('field3') }}
               value={email}
               underlineColorAndroid="#3e0644"
               onChangeText={text =>{ 
                  this.setState({ user: { ...this.state.user, email: text } },() => {
                    this.onUpdateInputs()
                  })
                }}
              />
            </View>
            <View style={styles.inputLogin}>
                <TextInput
                  style={styles.inputTextLogin}
                  ref={input => this.inputs["field3"] = input}
                  placeholder="Senha"
                  label="field3"
                  returnKeyType="done"
                  blurOnSubmit={false}
                  onSubmitEditing={this.onLogin.bind(this)}
                  value={password}
                  underlineColorAndroid="#3e0644"
                  secureTextEntry={true}
                  onChangeText={text =>{
                    this.setState({ user: { ...this.state.user, password: text } },() => {
                      this.onUpdateInputs()
                    })
                  }}
                />
            </View>
            </View>
          <View
            style={{
              width: width * 0.8,
              height: 60,
              textTransform: "capitalize"
            }}
          >
            <Button
              onPress={this.onLogin.bind(this)}
              style={styles.buttonlogin}
              color="#65ff70"
              disabled={activeLoginIn}
              title={ buttonName }
            />

            <View style={{ flexDirection : "row" , justifyContent : "space-between" , alignItems : "center" , marginVertical : 15 }} >
              <TouchableOpacity onPress={() => this.dispatchView("register")} >
                <Text style={{ color:"white" , fontWeight : '500' ,  }} >Cadastrar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.dispatchView("login")} >
                 <Text style={{ color:"white" , fontWeight : '500' ,  }} >Esqueci a senha</Text>
              </TouchableOpacity>
            </View>

          </View>
          
        </LinearGradient>
        </ScrollView>

      </View>
    );
  }
}

let mapStateProps = (state) => ({
  user : state.User
})

let mapDispatchProps = (dispatch) => bindActionCreators({ userSetState },dispatch)

export default connect(mapStateProps,mapDispatchProps)(Login)

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  logo: {
    width: 100,
    height: 90
  },
  inputLogin: {
    width: width * 0.8,
    marginBottom: 5
  },
  inputTextLogin: {
    color: "white",
    height: 60,
    fontFamily: "Roboto"
  },
  buttonlogin: {
    flex: 1,
    textTransform: "capitalize",
    fontFamily: "Roboto",
    height: 60
  },
});
