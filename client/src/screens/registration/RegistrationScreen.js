import './RegistrationScreen.css';
import MainHeader from "../../components/header/MainHeader";
import Registration from "../../components/authorization/Registration";

function RegistrationScreen() {
    return (
        <div>
            <MainHeader/>

            <div className={"authorization"}>
                <Registration />
            </div>
        </div>
    );
}

export default RegistrationScreen;
