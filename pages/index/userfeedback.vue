<template>
	<!-- 意见反馈页面 -->
	<view class="index">
		<view class="index1 flex-between">
			<!-- 侧边栏 -->
			<view class="mens flex_columns ">
				<view class="mens_block flex_columns" v-for="(item, index) in zumen">
					<view class="mens_one flex-between flex-center" @click="doUrl(item.http)" :class="item.id == sorttid ? 'mens_one_active' : ''">
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
			<!-- end -->
			<view class="index_block flex_columns">
				<view class="user_index flex-between flex-center">
					<text>查询全部代理</text>
					<view class=" flex-center flex_row_reverse">
						<text @click="loginout()">退出登录</text>
						<text>{{userlist.storeUsername}}</text>
					</view>
				</view>
				<!-- 搜索标题 -->
				<view class="block_noe_tit flex_rows">
					<input type="text" value="" v-model="querySearch" placeholder="请输入需要查询的用户电话号码" />
					<text class="text_c flex-center" @click="userquery()">搜索</text>
				</view>
				<!-- 小标题栏 -->
				<view class="block_noe_blck flex_columns">
					<view class="block_noe_blck_tit flex-center flex_rows">
						<text :class="item.id == sorttid2 ? 'block_noe_blck_hover' : ''" v-for="(item,index) in stourname" @click="sorttid2ck(item.id)">{{item.name}}</text>
					</view>
						<!-- 表格 -->
					<view class="block_noe_blck_bk flex_columns">
						<view class="block_noe_blck_bk_tit flex-center flex_rows">
							<text>序号</text>
							<text>ID</text>
							<text>名字</text>
							<view class="block_noe_blck_data">
								<text>电话号码</text>
							</view>
							<view class="block_noe_blck_textarea">
								<text>内容</text>
							</view>
							<view class="block_noe_blck_data">
								<text>创建时间</text>
							</view>
							<text>状态</text>
						</view>

						<view class="block_noe_blck_bk_two">
								<!-- 多个复选框，带全选 -->
								<view class="content_list_one">
									<view class="flex_columns" v-if="menuLists">
										<view class="content_list_one_bl boderck flex-center flex_rows" v-if="confirmuser">
											<text>修改项</text>
											<view class="block_noe_blck_default flex-center">
												<text>{{confirmuser.storeId}}</text>
											</view>
											<view class="block_noe_blck_default flex-center">
												<text>{{confirmuser.storeName}}</text>
											</view>
											<view class="block_noe_blck_data">
												<text>{{confirmuser.storePhone}}</text>
											</view>
											<view class="block_noe_blck_textarea flex-center">
												<textarea :value="confirmuser.question" :disabled="disabled" placeholder="" />
											</view>
											<view class="block_noe_blck_data">
												<text v-if="confirmuser.createTime">{{ confirmuser.createTime.substring(0,16)}}</text>
											</view>
											<view class="block_noe_blck_data flex_rows">
												<input :disabled="disabled" type="number" maxlength="1" v-model="confirmuser.status"/>
												<text style="font-size: 5px;">1正常,0取消</text>
											</view>
											<view class="content_list_one_bl_default_user flex-center">
												<button type="default" @click="confirmusere()">修改</button>
											</view>
										</view>
										
										
										<view class="content_list_one_bl flex-center flex_rows" v-for="(item,index) in menuLists" v-if="sorttid2==0 || sorttid2!=item.status">
											<text>{{ index+1 }}</text>
											<view class="block_noe_blck_default flex-center">
												<text>{{item.storeId}}</text>
											</view>
											<view class="block_noe_blck_default flex-center">
												<text>{{item.storeName}}</text>
											</view>
											<view class="block_noe_blck_data">
												<text>{{item.storePhone}}</text>
											</view>
											<view class="block_noe_blck_textarea flex-center">
												<textarea :value="item.question" :disabled="disabled" placeholder="" />
											</view>
											<view class="block_noe_blck_data">
												<text v-if="item.createTime">{{ item.createTime.substring(0,16)}}</text>
											</view>
											<text v-if="item.status==1">已处理</text>
											<text v-if="item.status==0">未处理</text>
											<view class="content_list_one_bl_default_user flex-center">
												<button type="default" @click="modifyuser(item)">修改</button>
											</view>
										</view>
										
									</view>
									<view style="height: 100%; width: 100%; text-align: center; font-size: 30px;" v-else>
										<text>暂无信息</text>
									</view>
								</view>
								<view class="pages flex-center" v-if="menuLists">
									<view class="pages_number flex-center flex-around">
										<paging :pageSize="pageSize" :total="total" activecolor="#FFFFFF" activebackground="#DD524D" :footer="true" :current="1" @changes="add"></paging>
									</view>
								</view>
						</view>
					</view>
					
					
				</view>
				
				
				
			</view>
		</view>
	</view>
</template>

<script>
	import paging from '@/components/yang-paging/fy.vue'
export default {
	components:{
		paging
	},
	data() {
		return {
			userlist:'',//user用户
			sorttid:5,
			sorttid2:0,
			disabled:true,
			zumen: [
				{
					name: '查询全部代理',
					id: 1,
					sortt:0,
					http:'/pages/index/userlist'
				},
				{
					name: '查询审核订单',
					id: 2,
					sortt:1,
					http:'/pages/index/index'
				},
				{
					name: '查询所有订单',
					id: 3,
					sortt:2,
					http:'/pages/index/index'
				},
				{
					name: '查询所有云进订单',
					id: 4,
					sortt:3,
					http:'/pages/index/yunOrder'
				},
				{
					name: '查询所有云提货单',
					id: 6,
					sortt:3,
					http:'/pages/index/yunOrderdelivery'
				},
				{
					name: '查询信息反馈',
					id: 5,
					sortt:4,
					http:'/pages/index/userfeedback'
				}
			],
			stourname:[
				{name:'全部',id:0},
				{name:'未处理',id:1}
			],
			menuLists:[],
			querySearch:null,//用户输入内容
			navigatepageNums:null,
			pageNum:1,//第几页
			pages:0,//总页数
			pageSize:0,//每页数
			total:0,//数据总条数
			confirmuser:null
		};
	},
	onLoad() {
		this.userlistdata();
	},
	onShow() {
		this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
		console.log(this.userlist);
		if (this.userlist=='') {
			this.utils.error('账号未登录！', () => {
				// this.doUrl('/pages/index/index');
				// this.utils.navback();
				this.doUrl('/pages/user/login');
			});
		}
	},
	methods: {

		//退出登录
		loginout(){
			uni.removeStorageSync('userlist');
			this.userlist = '';
			this.utils.success('退出成功！', () => {
				this.doUrl('/pages/user/login');
				// this.utils.navback();
			});
		},
		userquery(){
			if (this.querySearch != null) {
				this.sorttid2 = 0;
				this.utils.showloading();
				this.http.getApi('/user/SelectByphone',{status:this.querySearch}, 'get', this.userlist.storeOpendid).then(res => {
					uni.hideLoading();
					console.log(res);
					// this.confirmuser = null;
					this.menuLists = [res.data];
					this.utils.success('查询成功！', () => {
					});
				})
				.catch(err => {
					console.log(err);
					uni.hideLoading();
					this.utils.success(err.msg, () => {
						// this.doUrl('/pages/user/login');
						// this.utils.navback();
					});
				});
			} else{
				this.utils.alert('请输入查询的参数',()=>{
					return;
				});
			}
		},
		sorttid2ck(item) {
			//点击其中一个选项
			if (this.sorttid2 == item) {
				return false;
			} else {
				this.sorttid2 = item;
				this.pageNum = 1;
				// this.judgeOrder(this.status);
			}
		},
		modifyuser(item){
			if (this.disabled == true) {
				this.disabled = false;
				this.confirmuser = item;
				console.log(this.confirmuser);
				this.utils.error('请在顶部输入框内输入需要修改的参数！', () => {
					
				});
			} else{
				this.disabled = true;
			}
			
			
		},
		confirmusere(){
			console.log(this.confirmuser);
			this.utils.showloading();
			this.http.getApi('/tickling/update',{ticklingId:this.confirmuser.id}, 'get', this.userlist.storeOpendid).then(res => {
				uni.hideLoading();
				console.log(res);
				this.confirmuser = null;
				this.utils.success('修改成功！', () => {
					// this.doUrl('/pages/user/login');
					// this.utils.navback();
				});
			})
			.catch(err => {
				console.log(err);
				uni.hideLoading();
			});
		},
		//页码渲染
		add(index) {
			// console.log(index);
			this.pageNum = index;
			this.userlistdata(this.pageNum);
		},
		
		userlistdata(){
			this.utils.showloading();
			this.http.getApi('/tickling/getAll', {pageNum:this.pageNum, pageSize:10}, 'get', this.userlist.storeOpendid).then(res => {
				uni.hideLoading();
				if (res.data.list.length==0) {
					this.menuLists = null;
				} else{
					// console.log('------------------------------');
					// console.log(this.mensname.id);
					// console.log('------------------------------');
					console.log(res);
					this.menuLists = res.data.list;
					this.pageNum = res.data.pageNum;
					this.navigatepageNums = res.data.navigatepageNums;
					this.total = res.data.total;
					this.pageSize = res.data.pageSize;
				}
			})
			.catch(err => {
				console.log(err);
				uni.hideLoading();
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.index1 {
	width: 100%;
	min-height: 1080px;
	padding-right: 30px;
	background-color: #F3F3F3;
}
.mens {
	width: 13%;
	min-height: 100%;
	background-color: #304156;
	text {
		color: #bfcbd9;
	}
	.mens_block {
		width: 100%;
		
		.mens_one {
			width: 100%;
			height: 50px;
			border-bottom: #273445 1px solid;
			// background-color: #00152a;
			text {
				padding: 0 10px;
				font-size: 20px;
			}
			image {
				width: 30px;
			}
		}
		.mens_one_active {
			background-color: #00152a;
			// -webkit-transform: scale(1.2);
			// transform: scale(1.1);
		}
		.mens_one:hover {
			// background-color: #273445;
			background-color: #1f2d3d;
			// background-color: #00152a;
		}
	}
}

// 右块
.index_block{
	width: 87%;
	height: 100%;
	// border: #007AFF 1px solid;
	padding:  10px 40px;
	text {
		font-size: 20px;
		color: #333333;
	}
	//用户快
	.user_index{
		min-height: 70px;
		
		text{
			font-size: 20px;
			margin-left: 30px;
		}
	}
	//end
	//搜索栏
	.block_noe_tit {
		width: 100%;
		padding: 10px 0;
		height: 60px;
		input {
			height: 90%;
			width: 300px;
			box-shadow: 1px 2px 6px #c8c7cc;
			border-radius: 15px;
			padding-left: 15px;
		}
		.text_c {
			padding: 0 20px;
			margin-left: 30px;
			// color: #FF5733;
			color: #ffffff;
			box-shadow: 1px 2px 6px #f55866;
			background: linear-gradient(0deg, rgba(246, 62, 100, 1), rgba(244, 106, 103, 1));
			border-radius: 15px;
		}
	}
	//end
	// 表格块
	.block_noe_blck{
		width: 100%;
		// min-height: 700px;
		margin-top: 20px;
		padding-bottom: 10px;
		border-radius: 15px;
		box-shadow: 1px 1px 20px #999999;
		// 小标题
		.block_noe_blck_tit {
			width: 100%;
			height: 60px;
			border-radius: 15px 15px 0 0;
			// border: #4cd964 1px solid;
		
			text {
				height: 100%;
				font-size: 25px;
				display: flex;
				align-items: center;
				// border-radius: 15px 15px 0 0;
				padding-left: 10px;
				padding-right: 10px;
				border-right: #C0C0C0 1px solid;
			}
			text:nth-child(1){
				border-radius:15px 0  0 0;
			}
			text:hover{
				color: #FFFFFF;
				background-color: #3F536E;
			}
			.block_noe_blck_hover{
				color: #FFFFFF;
				background-color: #DD524D;
			}
		}
		// end
		.block_noe_blck_bk{
				// padding: 10px 0;
				// border: #999999 1px solid;
				//特殊表格订单宽度
				.block_noe_blck_order{
					min-width: 180px;
					padding: 5px 0;
					border: #4CD964 1px solid;
					text{
						width: 180px;
						border-right: #999999 1px solid;
					}
					input{
						width: 180px;
						padding: 3px 10px;
						text-align: center;
						margin: 0 5px;
						color: #333333;
					}
					textarea{
						max-height: 60px;
						padding: 5px;
						margin: 0;
						border-radius: 5px;
						font-size: 10px;
						// border: #007AFF 1px solid;
					}
				}
				.block_noe_blck_textarea{
					width: 350px;
					padding: 5px 0;
					// border: #4CD964 1px solid;
					textarea{
						max-height: 60px;
						padding: 5px;
						// margin: 0;
						margin-left: 15px;
						border-radius: 5px;
						font-size: 10px;
						// border: #007AFF 1px solid;
					}
				}
				.block_noe_blck_data{
					width: 150px;
					text{
						width: 150px;
					}
					input{
						width: 130px;
						padding: 3px 10px;
						text-align: center;
					}
					
				}

				.block_noe_blck_default{
					width: 80px;
					// border-radius: 5px;
					
					border-right: #999999 1px solid;
					input{
						padding: 3px 10px;
						margin: 0 5px;
						text-align: center;
						color: #333333;
					}
					// box-shadow: 1px 2px 6px #c8c7cc;
				}
				.block_noe_blck_bk_tit{
					font-weight: 900;
					padding: 5px 0;
					border-top: #999999 1px solid;
					background-color: #C8C7CC;
					text{
						font-size: 20px;
						padding: 0 5px;
						// border: #007AFF 1px solid;
					}
				}
				.content_list_one_bluser{
					background-color: #DD524D;
					// border: #000000 1px solid;
					
				}
				.boderck{
					background-color: #DD524D;
					color: #333333;
					text{
						color: #FFFFFF;
					}
					input{
						border-radius: 5px;
						// color: #333333;
						background-color: #FFFFFF;
						box-shadow: 1px 2px 6px #c8c7cc;
					}
				}
				.content_list_one_bl{
					// padding: 0 0;
					min-width: 70px;
					text{
						font-size: 15px;
						padding: 0 5px;
						// border: #007AFF 1px solid;
					}
					
				}
				.content_list_one_bl_default_user{
					min-width: 70px;
					padding: 5px 0;
					justify-content: flex-start;
					button{
					// padding: 5px;
					border-radius: 5px;
					font-size: 15px;
					color: #FFFFFF;
					background-color: #DD524D;
					}
				}
				.content_list_one_bl:nth-child(odd){
						// background-color: #F1F1F1;
						border-top: #999999 1px solid;
						border-bottom: #999999 1px solid;
					}
				.content_list_one_bl:hover{
					background-color: #DD524D;
					text{
						color: #FFFFFF;
					}
					input{
						border-radius: 5px;
						// color: #333333;
						background-color: #FFFFFF;
						box-shadow: 1px 2px 6px #c8c7cc;
					}
					textarea{
						border-radius: 5px;
						// color: #333333;
						background-color: #FFFFFF;
						box-shadow: 1px 2px 6px #c8c7cc;
					}
				}
				.block_noe_blck_bk_tit,
				.content_list_one_bl{
					text{
						min-width: 70px;
						// padding: 0 5px;
						border-right: #999999 1px solid;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
				.block_noe_blck_bk_two{
					// padding: 10px 0;
					// border: #007AFF 1px solid;
					.content_list_one{
						border-bottom: #999999 1px solid;
					}
					.pages{
						justify-content: center;
						.pages_tit{
							padding: 5px 10px;
							font-size: 20px;
							border-radius: 10px;
							border: #999999 1px solid;
							justify-content: center;
						}
						.pages_number{
							padding: 10px 20px;
							// min-width: 100%;
							text{
								border: #999999 1px solid;
								padding: 5px 15px;
								font-size: 20px;
								margin-right: 10px;
								border-radius: 10px;
							}
							text:hover{
								background-color: #DD524D;
								color: #FFFFFF;
							}
						}
						.pages_tit:hover{
							background-color: #DD524D;
							color: #FFFFFF;
						}
					}
				}
			
		}
		
	}
	
	
}

</style>
