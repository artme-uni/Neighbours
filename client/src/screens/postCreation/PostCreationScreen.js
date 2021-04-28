import MainHeader from "../../components/header/MainHeader";
import HeaderStub from "../../components/header/HeaderStub";
import PostForm from "../../components/feed/PostForm";
import React from "react";

function PostCreationScreen() {
    return (
        <div>
            <MainHeader createIsVisible={false}/>
            <HeaderStub/>
            <div>
                <PostForm />
            </div>
        </div>
    );
}

export default PostCreationScreen;
