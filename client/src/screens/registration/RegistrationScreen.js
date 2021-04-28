import './RegistrationScreen.css';
import MainHeader from "../../components/header/MainHeader";
import Registration from "../../components/authorization/Registration";
import HeaderStub from "../../components/header/HeaderStub";

function RegistrationScreen() {
    return (
        <div>
            <MainHeader/>
            <HeaderStub/>
            <div className={"authorization"}>
                <Registration />
            </div>
        </div>
    );
}

export default RegistrationScreen;
