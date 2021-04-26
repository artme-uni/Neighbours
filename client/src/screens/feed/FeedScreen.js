import './FeedScreen.css';
import MainHeader from "../../components/header/MainHeader";

function FeedScreen() {
    return (
        <div>
            <MainHeader/>

            <div className={"feed"}>
                <h1>Hello, it's a feed screen!</h1>
            </div>
        </div>
    );
}

export default FeedScreen;
