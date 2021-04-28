import MainHeader from "../../components/header/MainHeader";
import HeaderStub from "../../components/header/HeaderStub";
import PostForm from "../../components/feed/PostForm";
import React from "react";

function PostEditingScreen() {
    return (
        <div>
            <MainHeader createIsVisible={false}/>
            <HeaderStub/>
            <div>
                <PostForm titleName={'Редактирование объявления'} buttonName={'Обновить'}/>
            </div>
        </div>
    );
}

export default PostEditingScreen;
