import './ProfileScreen.css';
import MainHeader from "../../components/header/MainHeader";

function ProfileScreen() {
    return (
        <div>
            <MainHeader> </MainHeader>
            <div className={"profile"}>
                <h1>Hello, it's a profile screen!</h1>
            </div>
        </div>
);
}

export default ProfileScreen;
