import MainHeader from "../../components/header/MainHeader";
import HeaderStub from "../../components/header/HeaderStub";
import PostForm from "../../components/feed/PostForm";

function PostCreationScreen() {
    return (
        <div>
            <MainHeader/>
            <HeaderStub/>
            <div>
                <PostForm />
            </div>
        </div>
    );
}

export default PostCreationScreen;
