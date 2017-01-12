var DBF = require('./dbFactory');

// 设置全局的`url`前缀
// 开发环境
if (__LOCAL__) {   
    var urlPrefix= 
   	'//www.yihu.space:808/';
   	// './data/';
}

// 生产环境
if (__PRO__) {  
    var urlPrefix = 
    '//www.yihu.space:808/';
    // './data/';
    
}

DBF.set('urlPrefix', urlPrefix);

DBF.set('defaultParsePesp', function(resp){
    return resp;
});

DBF.create('Wopai', {
	getBanner:{
		url       :'getBanner',
		type      :'GET'
	},
	getArticle:{
		url       :'getArtic',
		type      :'GET'
	},
	getPhotographers:{
		url       :'getPhotographers',
		type      :'GET'
	},
	getModels:{
		url       :'getModels',
		type      :'GET'
	},
	getArticleDetail:{
		url       :'getArticDetail',
		type      :'GET'
	},
	getUser:{
		url       :'getUsers',
		type      :'GET'
	},
	getUserDetail:{
		url       :'getUserDetail',
		type      :'GET'
	},
	likeAjax:{
		url       :'likeAjax',
		type      :'POST'
	},
	getArticleTypes:{
		url       :'getArticleTypes',
		type      :'GET'
	},
});

module.exports = DBF.context;