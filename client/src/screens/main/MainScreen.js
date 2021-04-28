import './MainScreen.css';
import MainHeader from "../../components/header/MainHeader";
import HeaderStub from "../../components/header/HeaderStub";

function MainScreen() {
    return (
        <div>
            <MainHeader/>
            <HeaderStub/>
            <div className={"main"}>
                <h1>Hello, it's a main screen!</h1>
            </div>
        </div>
    );
}

export default MainScreen;
