import React from 'react';
import {Component} from 'reflux';
import Action from './action'
import DB from '../../db/db'

import Store from './store';

class ArticleList extends Component {

	constructor(props,context) {
		super(props,context)
		this.state = {};
        this.store = Store;
        Action.getArticle(1,10,this.props.params.type);

        this.loadMore = this.loadMore.bind(this);
	}

	componentWillReceiveProps(nextProps){
		Action.getArticle(1,10,nextProps.params.type);
	}

	handleZan(id, ctx){
		if($(ctx.target).hasClass('zan-active')){
			return;
		}
		DB.Wopai.likeAjax({
			aid:id
		}).then(function(data){
			
		})
		$(ctx.target).addClass('zan-active')
		$(ctx.target).css('backgroundImage','url(assets/img/zan.png)')
		$(ctx.target).parent().find('.likes').html(+($(ctx.target).parent().find('.likes').html())+1)
	}

	loadMore(){
		Action.getMoreArticle(this.state.page+1,10,this.props.params.type);
	}

	getContent(){
		const t = this;
		if(t.state.articleList.length === 0){
			return <div className=''></div>
		}
		const temArr = [];
		_.map(t.state.articleList,function(item, index){
			temArr.push(
			<div key={index} className='hc-card'>
				<a href={'#/article/'+item.id}>
				<img alt={item.title ||'-'} onClick={t.handleConcern} style={{height:$('.body-wrap').width()/1.41+'px',overflow:'hidden'}} src={item.thumb} className='hi-pic' />
				</a>
				<div className='hi-bottom-wrap'>
					<a href={'#/article/'+item.id}>
					<div className='hb-title'>
						{item.title ||'-'}
					</div>
					</a>
					<div style={{height:1,background:'#e6e6e6',marginBottom:15}}>
					</div>
					
					<div className='hb-date'>
						{item.date ||'-'}
					</div>

					<div className='hb-view'>
						<div data-id={item.id} onClick={t.handleZan.bind(this,item.id)} className='hv-zan' style={{backgroundImage:'url(assets/img/not_zan.png)'}}>
						</div>
						<span className='word1 hv-num likes'>{item.likes}</span>
						<div style={{backgroundImage:'url(assets/img/view.png)'}} className='hv-zan'>
						</div>
						<span className='word1 hv-num'>{item.views}</span>
					</div>
				</div>
			</div>)
		})
		return temArr;
	}

	getPhotographersBlock(){
		const t = this;
		if(t.state.photographerList.length === 0){
			return <div className=''></div>
		}
		const temArr = [];
		_.map(t.state.photographerList,function(item, index){
			temArr.push(
				<a key={index} href={'#/userdetail/'+item.id}>
				<div key={index} className='hp-item flex-h jc-start'>
					<img src={item.pic} className='hp-avatar' />
					<div className='flex1'>
						<div className='hp-name1'>
							{item.name}
						</div>
						<div className='hp-name2'>
							<div className='hp-zan' style={{backgroundImage:'url(assets/img/zan.png)'}} ></div>
							<span className='hp-word'>{item.likes}</span>
							


						</div>
					</div>

				</div>
				</a>
				)
		})
		return temArr;
	}

	getModelsBlock(){
		const t = this;
		if(t.state.modelList.length === 0){
			return <div className=''></div>
		}
		const temArr = [];
		_.map(t.state.modelList,function(item, index){
			temArr.push(
				<a key={index} href={'#/userdetail/'+index}>
				<div key={index} className='hp-item flex-h jc-start'>
					<img src={item.pic} className='hp-avatar' />
					<div className='flex1'>
						<div className='hp-name1'>
							{item.name}
						</div>
						<div className='hp-name2 ai-center jc-start flex-h' >
							<div className='hp-zan' style={{backgroundImage:'url(assets/img/zan.png)'}} ></div>
							<span className='hp-word'>{item.likes}</span>
							


						</div>
					</div>
					

				</div>
				</a>
				)
		})
		return temArr;
	}

	yuepai(){
		alert('接口未开放')
	}

    render() {
    	const t = this;
        return (
            <div className="home">
				<div className='home-content'>
				{
					t.getContent()
				} 
				</div>
				<div onClick={t.loadMore} className='home-loadmore'>
					加载更多
				</div>
				<div style={{height:1}}></div>
				<div className='erweima-wrap' style={{display:t.state.showModal?'block':'none'}} >
					<div className='backdrop'></div>
					<img onClick={()=>this.setState({showModal:false})} className='close' src='assets/img/close.png' />
					<img className='erweima' src='assets/img/erweima.jpg' />
				</div>
            </div>
        )
    }
}
export default ArticleList

// 帖子缺少 是否已点赞 字段
// 点赞 接口 aid不知从哪里获取 点赞是否可撤回
// 获取摄影师和模特信息的接口缺少 view(浏览量)字段
// 文章缺少 文章id字段 文章详情页接口需要id
// 查看全部 指向页面不明

// 约拍
// <div className='hp-btn' onClick={t.yuepai} >
	// <span className='hp-btn-word'>约拍</span>
// </div>

// rank排名（皇冠）
// <span className='hp-word'>/</span>
// <div className='hp-rank'></div>
// <span className='hp-word'>{item.likes}</span>



// 取消摄影师模特，坐标字段
// <div className='hb-date'>
// 	{item.date ||'-'}
// </div>
// <div className='flex-h hb-people jc-start'>
// 	<div className='flex1'>
// 		<span className="grey">摄影师：</span>
// 		<span className="word1">{item.photographer ||'-'}</span>
// 	</div>
// 	<div className='flex1'>
// 		<span className="grey">模特：</span>
// 		<span className="word1">{item.model ||'-'}</span>
// 	</div>
// </div>
// <div className='hb-address'>
// 	<span className="grey">坐标：</span>
// 	<span style={{marginLeft:'10px'}} className="word1">{item.city ||'-'}</span>
// </div>