import { connect } from "react-redux";
import LoginScreen from "./LoginScreen";
import { login, setHostName } from "../../redux/reducers/auth-reducer";

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    fullName: state.auth.fullName,
    message: state.auth.message,
    resultCodeIt: state.auth.resultCodeIt,
    resultCodeFurniture: state.auth.resultCodeFurniture,
  };
};

let mapDispatchToProps =  {
  login,
  setHostName
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)