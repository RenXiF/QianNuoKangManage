<template>
	<!-- 用户管理页面 -->
	<view class="index">
		<view class="index1 flex-between">
			<!-- 侧边栏 -->
			<mens :men="zumen" :showit="sorttid"></mens>
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
							<text class="">等级</text>
							<text class="">上级ID</text>
							<view class="block_noe_blck_order">
								<text>身份证号</text>
							</view>
							<text class="">58万</text>
							<text>库存</text>
							<view class="block_noe_blck_data">
								<text>进货总量</text>
							</view>
							<view class="block_noe_blck_data">
								<text>创建时间</text>
							</view>
							<view class="block_noe_blck_data">
								<text>更新时间</text>
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
												<input :disabled="disabled" type="number"  v-model="confirmuser.id"/>
											</view>
											<view class="block_noe_blck_default flex-center">
												<input :disabled="disabled" type="text" v-model="confirmuser.storeUsername"/>
											</view>
											<view class="block_noe_blck_data">
												<input :disabled="disabled" type="number" v-model="confirmuser.storePhone"/>
											</view>
											<text v-if="confirmuser.storeRole==0">直系代理</text>
											<text v-if="confirmuser.storeRole==1">总代理</text>
											<text v-if="confirmuser.storeRole==2">省代理</text>
											<text v-if="confirmuser.storeRole==3">市代理</text>
											<!-- <text class="">{{confirmuser.storeParentid}}</text> -->
											<view class="block_noe_blck_default flex-center">
												<input :disabled="disabled" type="idcard" v-model="confirmuser.storeParentid"/>
											</view>
											<view class="block_noe_blck_order flex-center">
												<input :disabled="disabled" type="idcard" v-model="confirmuser.storeIdcard"/>
											</view>
											<text v-if="confirmuser.storeMoneysum==0">没有</text>
											<text v-if="confirmuser.storeMoneysum==1">超过</text>
											<view class="block_noe_blck_default flex-center">
												<input :disabled="disabled" type="number" v-model="confirmuser.spareTwo"/>
											</view>
											<view class="block_noe_blck_data flex-center">
												<input :disabled="disabled" type="number" v-model="confirmuser.spareThree"/>
											</view>
											<view class="block_noe_blck_data">
												<text v-if="confirmuser.createTime">{{ confirmuser.createTime.substring(0,16)}}</text>
											</view>
											<view class="block_noe_blck_data">
												<text v-if="confirmuser.updatTime">{{ confirmuser.updatTime.substring(0,16)}}</text>
											</view>
											<view class="block_noe_blck_data flex_rows">
												<input :disabled="disabled" type="number" maxlength="1" v-model="confirmuser.spareOne"/>
												<text style="font-size: 5px;">1正常,0取消</text>
											</view>
											<view class="content_list_one_bl_default_user flex-center">
												<button type="default" @click="confirmusere()">修改</button>
											</view>
										</view>
										
										
										<view class="content_list_one_bl flex-center flex_rows" v-for="(item,index) in menuLists" v-if="sorttid2==0 || sorttid2==item.storeRole">
											<text>{{ index+1 }}</text>
											<view class="block_noe_blck_default flex-center">
												<text>{{item.id}}</text>
											</view>
											<view class="block_noe_blck_default flex-center">
												<text>{{item.storeUsername}}</text>
											</view>
											<view class="block_noe_blck_data">
												<text>{{item.storePhone}}</text>
											</view>
											<text v-if="item.storeRole==0">直系代理</text>
											<text v-if="item.storeRole==1">总代理</text>
											<text v-if="item.storeRole==2">省代理</text>
											<text v-if="item.storeRole==3">市代理</text>
											<text class="">{{item.storeParentid}}</text>
											<view class="block_noe_blck_order flex-center">
												<text>{{item.storeIdcard}}</text>
											</view>
											<text v-if="item.storeMoneysum==0">没有</text>
											<text v-if="item.storeMoneysum==1">超过</text>
											<view class="block_noe_blck_default flex-center">
												<text>{{item.spareTwo}}</text>
											</view>
											<view class="block_noe_blck_data flex-center">
												<text>{{item.spareThree}}</text>
											</view>
											<view class="block_noe_blck_data">
												<text v-if="item.createTime">{{ item.createTime.substring(0,16)}}</text>
											</view>
											<view class="block_noe_blck_data">
												<text v-if="item.updatTime">{{ item.updatTime.substring(0,16)}}</text>
											</view>
											<text v-if="item.spareOne==1">正常</text>
											<text v-if="item.spareOne==0">已取消</text>
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
	import mens from "../../components/mens.vue"
	import menu from '@/config/menu-config'
export default {
	components:{
		paging,
		mens
	},
	data() {
		return {
			userlist:'',//user用户
			sorttid:1,
			sorttid2:0,
			disabled:false,
			zumen: menu,
			stourname:[
				{name:'全部',id:0},
				{name:'总代理',id:1},
				{name:'省代理',id:2},
				{name:'市代理',id:3}
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
			this.confirmuser = item;
				console.log(this.confirmuser);
				this.utils.error('请在顶部输入框内输入需要修改的参数！', () => {
					
				});
			
		},
		confirmusere(){
			console.log(this.confirmuser);
			this.utils.showloading();
			this.http.getApi('/user/updateUser',this.confirmuser, 'post', this.userlist.storeOpendid).then(res => {
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
			this.http.getApi('/user/getAllUserNo', {pageNum:this.pageNum, pageSize:10}, 'get', this.userlist.storeOpendid).then(res => {
				uni.hideLoading();
				if (res.data.list.length==0) {
					this.menuLists = null;
				} else{
					// console.log('------------------------------');
					// console.log(this.mensname.id);
					// console.log('------------------------------');
					// console.log(res);
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
			font-size: 25px;
			font-weight: 700;
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
			cursor: pointer;
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
					width: 180px;
					padding: 0;
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
