import { connect } from "react-redux";
import StartInventoryScreen from "./StartInventoryScreen";

let mapStateToProps = (state) => {
  return {
    fullName: state.auth.fullName,
  };
};

let mapDispatchToProps =  {

};

export default connect(mapStateToProps, mapDispatchToProps)(StartInventoryScreen)