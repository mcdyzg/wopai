import { createStore } from 'reflux';
import Action from './action';
import DB from '../../db/db'

export default createStore({

    listenables: [Action],

    init() {
        this.state = {
            articleList:[],
            photographerList:[],
            modelList:[],
            page:0,
            showDropdown:false,
            showModal:false
        };
    },

    onGetArticle(sort,num,type){
        const t = this;
        DB.Wopai.getArticle({
            page:sort,
            pageNum:num,
            type:type
        }).then(function (data) {
            if(data){
                t.state.page = sort;
                t.state.articleList = data;
            }
            t.updateComponent();
        });
    },

    onGetMoreArticle(sort,num,type){
        const t = this;
        DB.Wopai.getArticle({
            page:sort,
            pageNum:num,
            type:type
        }).then(function (data) {
            if(data){
                t.state.page++;
                t.state.articleList = t.state.articleList.concat(data);
            }
            t.updateComponent();
        });
    },

    updateComponent() {
        this.trigger(this.state);
    }
});