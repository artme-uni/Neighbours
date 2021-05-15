import './FeedScreen.css';
import MainHeader from "../../components/header/MainHeader";
import FeedContainer from "../../components/feed/FeedContainer";
import HeaderStub from "../../components/header/HeaderStub";
import AuthorizationChecker from "../../components/authorization/AuthorizationChecker";
import React from 'react'


function FeedScreen() {

    const posts = [
        {
            author: 'Ваши счастливые соседи',
            date: '1 hour ago',
            title: 'Восхитительные колонки',
            text: 'Уважаемый сосед! Ваша звуковая система просто потресающая, она такая громкая, ' +
                'а басы настолько сильные, что стены в доме срясуться. Мы просто в восторге!' +
                'И даже не думайте сделать звук потише, это будет удар прямо в сердце.',
        },
        {
            author: 'Даниил Коваль',
            date: '6 hours ago',
            title: 'Пропали ключи',
            text: 'Кто-нибудь видел мои ключи? ',
        },
        {
            author: 'Вы',
            date: '12 часов назад',
            title: 'Срочный ремонт',
            text: 'Приносим искренние извинения за шум и неудобства связанные с' +
                 'ремонтом в кв. №46. Постараемся шуметь как можно меньше и закончить всё как' +
                'можно быстрее. Работать будем с 9-00 до 13-00 часов и с 15-00 до 19-00.',
            isEditable: true
        },
        {
            author: 'ТСЖ ',
            date: '2 days ago',
            title: 'Уборка снега',
            text: 'Завтра с утра 27 ноября с 9-00 во дворе будет работать снегоуборочная техеника. ' +
                'Убедительная просьба всем автомобилистам — уберите пожалуйста свои машины с территории ' +
                'двора на время уборки и помогите в расчистке снега. Приглашаются все желающие ' +
                'поучаствовать в расчистке. Давайте сделаем наш двор удобнее!',
        },
        {
            author: 'Валентин ',
            date: '7 days ago',
            title: 'Выброшенный диван',
            text: 'Хозяин выброшенного дивана, клопы пытаются занести его братно, сделайте что-нибудь!',
        }
    ];

    return (
        <div>
            <MainHeader/>
            <HeaderStub/>
            <AuthorizationChecker/>
            <div>
                <FeedContainer posts={posts}/>
            </div>
        </div>
    );
}

export default FeedScreen;
