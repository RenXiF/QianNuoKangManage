<template>
	<!-- 普通订单页面 -->
	<view class="index">
		<view class="index1 flex-between">
			<!-- 侧边栏 -->
			<mens :men="zumen" :showit="sorttid"></mens>
			<!-- end -->
			<view class="index_block flex_columns">
				<view class="user_index flex-between flex-center">
					<text>查询普通订单</text>
					<view class=" flex-center flex_row_reverse">
						<text @click="loginout()">退出登录</text>
						<text>{{userlist.storeUsername}}</text>
					</view>
				</view>
				<!-- 搜索标题 -->
				<view class="block_noe_tit flex_rows">
					<input type="text" value="" v-model="querySearch" placeholder="请输入需要查询的订单号" />
					<text class="text_c flex-center" @click="userquery()">搜索</text>
				</view>
				<!-- 小标题栏 -->
				<view class="block_noe_blck flex_columns">
					<view class="block_noe_blck_tit flex-center flex_rows">
						<text :class="item.id == sorttid2 ? 'block_noe_blck_hover' : ''" v-for="(item,index) in stourname" :key='index' @click="sorttid2ck(item.id)">{{item.name}}</text>
					</view>
						<!-- 表格 -->
					<view class="block_noe_blck_bk flex_columns">
						<view class="block_noe_blck_bk_tit flex-center flex_rows">
							<text>序号</text>
							<text>ID</text>
							<text>名字</text>
							<text class="block_noe_blck_data">电话号码</text>
							<text>数量</text>
							<text>金额</text>
							<text class="block_noe_blck_order">订单号</text>
							<text class="block_noe_blck_order" v-if="sorttid2!=0">物流号</text>
							<text class="block_noe_blck_data">创建时间</text>
							<text class="block_noe_blck_data">更新时间</text>
							<text>状态</text>
						</view>

						<view class="block_noe_blck_bk_two">
								<view class="content_list_one">
									<view class="flex_columns" v-if="menuLists">
										<view class="content_list_one_bl flex-center flex_rows" v-for="(item,index) in menuLists" :key='index'>
											<text>{{ index+1 }}</text>
											<text>{{ item.id }}</text>
											<!-- <text>{{ item.spareThree }}</text> -->
											<text v-if="item.spareThree!=null">{{ item.spareThree }}</text>
											<text class="block_noe_blck_data">{{ item.storePhone }}</text>
											<text>{{item.quantity}}</text>
											<text class="block_noe_blck_payment">￥{{item.payment}}</text>
											<text class="block_noe_blck_order">{{ item.orderNo }}</text>
											<!-- <text class="block_noe_blck_order" v-if="item.logistics!=null && item.status!=0">{{ item.logistics }}</text>
											<text class="block_noe_blck_order" v-if="item.logistics==null && item.status!=0">暂无物流号</text> -->
											<text class="block_noe_blck_data" v-if="item.createTime">{{ item.createTime.substring(0,16)}}</text>
											<text class="block_noe_blck_data" v-if="item.updateTime">{{ item.updateTime.substring(0,16)}}</text>
											<text v-if="item.status==0">未发货</text>
											<text v-if="item.status==1">已发货</text>
											<text v-if="item.status==2">已收货</text>
											<view class="content_list_one_bl_default_user flex-center">
												<button type="default" @click="deliverdizhi(item.spareTwo)">查询</button>
												<!-- <button type="default" @click="confirmusere(item.orderNo)" v-if="item.status==0">发货</button> -->
												<!-- <input type="text" value="" v-model="wuliuNo" placeholder="请输入物流单号" v-show="inputshow==item.orderNo"/> -->
												
											</view>

										</view>
										
									</view>
									<view style="height: 100%; width: 100%; text-align: center; font-size: 30px;" v-else>
										<text>暂无订单</text>
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
		<!-- 弹窗 -->
		<popup :show="showSpecifications" posNum="bottom: 0;width:50%;margin: 25%; border-radius: 20px;" @showClose="SpecificationsClose">
			<view class="server_pop" v-if="listdazhi">
				<view class="pop_tit flex_rows">
					<view class=""></view>
					<view class="">收件人详细信息</view>
					<view class="" @click="SpecificationsClose">×</view>
				</view>
				<view class="pop_cont flex_columns">
					<view class=" flex-center flex-around">
						<text>姓名：</text><textarea :value="listdazhi.receiverName" auto-height="true" placeholder="" />
					</view>
					<view class=" flex-center flex-around">
						<text>电话：</text><textarea :value="listdazhi.receiverMobile" auto-height="true" placeholder="" />
					</view>
					<view class=" flex-center flex-around">
						<text>地址：</text><textarea :value="listdazhi.receiverAddress" auto-height="true" placeholder="" />
					</view>
					<view class=" flex-center flex-around">
						<text>编码：</text><textarea :value="listdazhi.receiverZip" auto-height="true" placeholder="" />
					</view>
				</view>
			</view>
			<!-- <view class="pop_button" @click="serverButton">确定</view> -->
			<!-- <view class="pop_button">确定</view> -->
		</popup>
	</view>
</template>

<script>
	import paging from '@/components/yang-paging/fy.vue'
	import popup from '@/components/basis/popup.vue';
	import mens from "../../components/mens.vue"
	import menu from '@/config/menu-config'
export default {
	components:{
		paging,
		popup,
		mens
	},
	data() {
		return {
			userlist:'',//user用户
			sorttid:3,
			sorttid2:0,
			disabled:false,
			zumen: menu,
			stourname:[
				{name:'全部',id:0}
			],
			menuLists:[],
			querySearch:null,//用户输入内容
			navigatepageNums:null,
			pageNum:1,//第几页
			pages:0,//总页数
			pageSize:0,//每页数
			total:0,//数据总条数
			wuliuNo:'',//用户输入物流号
			inputshow:0,
			showSpecifications:false,
			listdazhi:{
				receiverName:'',
				receiverMobile:'',
				receiverAddress:'',
				receiverZip:''
			}
		};
	},
	onLoad() {
		this.userlistdata(this.sorttid2);
	},
	onShow() {
		this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
		if (this.userlist=='') {
			this.utils.error('账号未登录！', () => {
				this.doUrl('/pages/user/login');
			});
		}
	},
	methods: {
		// 弹窗
		SpecificationsShow() {
			this.showSpecifications = true;
		},
		
		SpecificationsClose() {
			this.showSpecifications = false;
			this.listdazhi.receiverName = '';
			this.listdazhi.receiverMobile = '';
			this.listdazhi.receiverAddress = '';
			this.listdazhi.receiverZip = '';
		},
		deliverdizhi(item){
			if (item) {
				this.utils.showloading();
				this.http.getApi('/shippings/GetShipping', {ShippingID:item}, 'get', this.userlist.storeOpendid)
				.then(res => {
					uni.hideLoading();
					console.log(res);
					this.listdazhi.receiverName = res.data.receiverName;
					this.listdazhi.receiverMobile = res.data.receiverMobile;
					this.listdazhi.receiverAddress = res.data.receiverProvince + res.data.receiverCity + res.data.receiverDistrict + res.data.receiverAddress;
					this.listdazhi.receiverZip = res.data.receiverZip;
					console.log(this.listdazhi);
					// this.utils.success('查询成功！');
					this.SpecificationsShow();
				})
				.catch(err => {
					console.log(err);
					this.utils.success(err.msg);
					uni.hideLoading();
				});
			} else{
				this.utils.success('失败！');
			}
			
		},
		//退出登录
		loginout(){
			uni.removeStorageSync('userlist');
			this.userlist = '';
			this.utils.success('退出成功！', () => {
				this.doUrl('/pages/user/login');
				// this.utils.navback();
			});
		},
		// 搜索
		userquery(){
			if (this.querySearch != null) {
				this.utils.showloading();
				this.http.getApi('/order/getOneOrder',{orderONo:this.querySearch}, 'get', this.userlist.storeOpendid).then(res => {
					uni.hideLoading();
					console.log(res);
						this.menuLists = [res.data];
						this.utils.success('查询成功！', () => {
						});
					
				})
				.catch(err => {
					console.log(err);
					uni.hideLoading();
					this.utils.error(err.msg, () => {
					});
				});
			} else{
				this.utils.error('请输入查询的参数',()=>{
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
				this.userlistdata(this.sorttid2);
			}
		},
		// 发货
		confirmusere(item){
			console.log(item);
			if (this.inputshow!= item) {
				this.inputshow = item;
				console.log(this.inputshow);
				this.utils.error('请输入物流单号',()=>{
					// _this.utils.navback();
				});
			}else{
				if(this.wuliuNo==''){
					this.wuliuNo = '暂无物流号';
					this.utils.showloading();
					this.http.getApi('/Companyorder/delivery',{orderNo:this.inputshow,wuliuNo:this.wuliuNo}, 'get', this.userlist.storeOpendid).then(res => {
						uni.hideLoading();
						console.log(res);
						this.wuliuNo = '';
						// this.inputshow = 0;
						this.utils.success('发货成功！', () => {
							this.userlistdata(this.sorttid2);
						});
					})
					.catch(err => {
						console.log(err);
						uni.hideLoading();
					});
					
				} else{
					this.utils.showloading();
					this.http.getApi('/Companyorder/delivery',{orderNo:this.inputshow,wuliuNo:this.wuliuNo}, 'get', this.userlist.storeOpendid).then(res => {
						uni.hideLoading();
						console.log(res);
						this.wuliuNo = '';
						// this.inputshow = 0;
						this.utils.success('发货成功！', () => {
							this.userlistdata(this.sorttid2);
						});
					})
					.catch(err => {
						console.log(err);
						uni.hideLoading();
					});
				}
			}
			
			
		},
		//页码渲染
		add(index) {
			// console.log(index);
			this.pageNum = index;
			this.userlistdata(this.sorttid2);
		},
		//查询所有
		userlistdata(e){
			this.utils.showloading();
			this.http.getApi('/order/getorder', {myId:0,pageNum:this.pageNum, pageSize:10}, 'get', this.userlist.storeOpendid).then(res => {
				uni.hideLoading();
				console.log(res);
				if (res.data.list.length==0) {
					this.menuLists = null;
				} else{
					// console.log(this.mensname.id);
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


//弹窗样式
	.pop_button {
		margin-top: 260px;
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 10px;
		color: #ffffff;
		background-color: #ffa600;
	}
	.server_pop {
		padding: 30px;
		.pop_tit {
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10px;
			height: 50px;
			font-size: 30px;
			color: #333333;
		}
		.pop_num{
			align-items: center;
			font-size: 30px;
			color: #333333;
			.price_right {
				width: 22%;
				align-items: center;
				font-size: 10px;
			
				.right_reduce {
					color: #FFA600;
					font-size: 10px;
					margin-right: 2px;
				}
			
				.right_add {
					color: #FFA600;
					font-size: 10px;
				}
			}
		}
	
		.pop_cont {
			justify-content: flex-start;
			align-items: center;
			flex-wrap: wrap;
			text{
				font-size: 20px;
				margin-bottom: 5px;
			}
			textarea{
				margin-bottom: 5px;
				border: #999999 1px solid;
				padding: 5px 10px;
			}
	
			.cont_item {
				margin-bottom: 30px;
				margin-right: 30px;
				padding: 10px 20px;
				text-align: center;
				font-size: 10px;
				color: #a1a1a1;
				border-radius: 15px;
				border: 2px solid #f5f5f5;
	
				text {}
	
				&.active {
					background-color: #ffa600;
					color: #ffffff;
				}
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
				.block_noe_blck_payment{
					// width: 150px;
					color: #DD524D;
					text{
						// width: 150px;
						
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
					padding: 10px 0;
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
					padding: 5px 0;
					text{
						font-size: 15px;
						padding: 5px;
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
						margin-right: 10px;
						font-size: 15px;
						color: #FFFFFF;
						background-color: #DD524D;
					}
					input{
						border-radius: 5px;
						min-height: 35px;
						padding-left: 5px;
						box-shadow: 1px 2px 6px #c8c7cc;
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
