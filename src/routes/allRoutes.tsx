import { Redirect } from "react-router-dom";


//Authentication pages
import InputPage from "../pages/InputPage";
import MyDeal from "../pages/MyDeal";
import Calender from "../pages/Calendar";
// import ForgetPwd from "../pages/Authentication/ForgetPassword"




const userRoutes = [
  //dashboard
  { path: "/home", component: InputPage },
  { path: "/mydeals", component: MyDeal },
  { path: "/calendar", component: Calender },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/home" /> }
];



export { userRoutes };
