import './LoginScreen.css';
import MainHeader from "../../components/header/MainHeader";
import Login from "../../components/authorization/Login";

function LoginScreen() {
    return (
        <div>
            <MainHeader/>
            <div className={"authorization"}>
                <Login />
            </div>
        </div>
    );
}

export default LoginScreen;
