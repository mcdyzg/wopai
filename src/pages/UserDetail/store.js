import { createStore } from 'reflux';
import Action from './action';
import DB from '../../db/db'

export default createStore({

    listenables: [Action],

    init() {
        this.state = {
            page:0,
            showModal:false,
            userArticleList:[]
        };
    },

    onGetUserDetail(id){
        const t = this;
        DB.Wopai.getUserDetail({
            id:id
        }).then(function (data) {
            if(data){
                t.state.userDetail = data;
            }
            t.updateComponent();
        });
    },

    onGetArticle(sort,num,uid){
        const t = this;
        DB.Wopai.getArticle({
            page:sort,
            pageNum:num,
            userId:uid
        }).then(function (data) {
            if(data){
                t.state.page = sort;
                t.state.userArticleList = data;
            }
            t.updateComponent();
            
        });
    },

    onGetMoreArticle(sort,num,uid){
        const t = this;
        DB.Wopai.getArticle({
            page:sort,
            pageNum:num,
            userId:uid
        }).then(function (data) {
            if(data){
                t.state.page++;
                t.state.userArticleList = t.state.userArticleList.concat(data);
            }
            t.updateComponent();
            
        });
    },

    updateComponent() {
        this.trigger(this.state);
    }
});