import './ProfileScreen.css';
import MainHeader from "../../components/header/MainHeader";
import HeaderStub from "../../components/header/HeaderStub";

function ProfileScreen() {
    return (
        <div>
            <MainHeader/>
            <HeaderStub/>
            <div className={"profile"}>
                <h1>Hello, it's a profile screen!</h1>
            </div>
        </div>
    );
}

export default ProfileScreen;
