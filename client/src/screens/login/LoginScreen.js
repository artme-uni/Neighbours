import './LoginScreen.css';
import MainHeader from "../../components/header/MainHeader";
import Login from "../../components/authorization/Login";
import HeaderStub from "../../components/header/HeaderStub";

function LoginScreen() {
    return (
        <div>
            <MainHeader/>
            <HeaderStub/>
            <div className={"authorization"}>
                <Login />
            </div>
        </div>
    );
}

export default LoginScreen;
