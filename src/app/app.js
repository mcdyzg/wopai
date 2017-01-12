"use strict";
window.__G__ = {};
window._ = {};
import _map from 'lodash/map'
_.map = _map;

//基本组件
import React,{Component} from  'react'
import ReactDOM from 'react-dom'
import {Router,hashHistory} from 'react-router'

// 页面
import Home from '../pages/Home'
import ArticleDetail from '../pages/ArticleDetail'
import UserList from '../pages/UserList'
import UserDetail from '../pages/UserDetail'
import ArticleList from '../pages/ArticleList'
import DB from '../db/db'

// import {NavBar} from '../components/NavBar'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typelist:[]
        }
    }

    componentDidMount(){
        const t = this;
        DB.Wopai.getArticleTypes().then((data)=>{
            if(data){
                t.setState(
                {
                    typelist:data
                })
            }
        })
        $(document).on('click','.nav-word',(e)=>{
            $(e.target).parents('.top-nav').find('.nav-word').removeClass('active')
            $(e.target).addClass('active');
        })
    }

    getTitleBar(){
        const t = this;
        if(t.state.typelist.length === 0){
            return <div className=''></div>
        }
        const temTitleArr = [];
        _.map(t.state.typelist,function(item, index){
            temTitleArr.push(
            <div key={index} className='nav-item'>
                            <a className='nav-word' href={'#/articlelist/'+item.typeValue}>
                            {item.typeName}
                            </a>
                        </div>)
        })
        return temTitleArr;
    }

    render() {
        const t = this;
        return (
            <div className='body-wrap'>
                <div className='nav-wrap'>
                    <div className='top-nav flex-h jc-center'>
                        <div className='nav-item'>
                            <a className='nav-word active' href='#/'>
                            首页
                            </a>
                        </div>
                        {t.getTitleBar()}
                        
                    </div>
                </div>
                
                <div style={{height:'45px'}} >
                    
                </div>
                {this.props.children}
            </div>
        )
    }
}
const routes = {
    path: '/',
    component: App,
    indexRoute: {component: Home},
    childRoutes: [
        {path: '/home',             component: Home},
        {path: '/article/:id',      component: ArticleDetail},
        {path: '/userlist/:type',         component: UserList},
        {path: '/userdetail/:uid',       component: UserDetail},
        {path: '/articlelist/:type',       component: ArticleList},
    ]
};
ReactDOM.render(<Router history={hashHistory}  onUpdate={() => window.scrollTo(0,0)}  routes={routes}/>, document.getElementById('app'));



            // <NavBar>
            // <div className=''>
            //     111
            // </div>
            // <div className=''>
            //     222
            // </div>
            // </NavBar>

// <div className='nav-item'>
//                             <a className='nav-word active' href='#/'>
//                             首页
//                             </a>
//                         </div>
//                         <div className='nav-item'>
//                             <a className='nav-word' href='#/userlist/model'>
//                             少女
//                             </a>
//                         </div>
//                         <div className='nav-item'>
//                             <a className='nav-word' href='#/userlist/photographer'>
//                             摄影师
//                             </a>
//                         </div>
//                         <div className='nav-item'>
//                             <a className='nav-word' href='#/userlist/photographer'>
//                             访谈
//                             </a>
//                         </div>
//                         <div className='nav-item'>
//                             <a className='nav-word' href='#/userlist/photographer'>
//                             视频
//                             </a>
//                         </div>