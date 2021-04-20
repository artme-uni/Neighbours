import './Main.css';
import MainHeader from "../../components/header/MainHeader";

function Main() {
    return (
        <div>
            <MainHeader> </MainHeader>
            <div className={"main"}>
                <h1>Hello, it's a main screen!</h1>
            </div>
        </div>
    );
}

export default Main;
