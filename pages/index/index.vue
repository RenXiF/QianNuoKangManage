<template>
	<!-- 主页页面 -->
	<view class="index">
		<view class="index1 flex-between">
			<view class="mens flex_columns ">
				<view class="mens_block flex_columns" v-for="(item, index) in menslist">
					<view class="mens_one flex-between flex-center" @click="menslistck(item)">
						<image class="Icon" :src="item.image1" mode="aspectFit"></image>
						<text>{{ item.name }}</text>
						<image class="Icon" :src="item.image2" mode="aspectFit" v-show="!item.show"></image>
						<image class="Icon" :src="item.image3" mode="aspectFit" v-show="item.show"></image>
					</view>
					<view class="flex_columns mens_one_tit" @click="doUrl('/pages/index/userlist')">
							<text>查询全部代理</text>
					</view>
					<view class="flex_columns" v-for="(item2, index) in item.list" v-show="item.show" @click="swichMenu(item2)" :class="currentTab == item2.sortt ? 'mens_one_tit mens_one_tit_active' : 'mens_one_tit'">
						<text>{{ item2.name }}</text>
					</view>
					<view class="flex_columns mens_one_tit" @click="doUrl('/pages/index/yunOrder')">
							<text>查询所有云进订单</text>
					</view>
					<view class="flex_columns mens_one_tit" @click="doUrl('/pages/index/yunOrderdelivery')">
							<text>查询所有云提订单</text>
					</view>
					<view class="flex_columns mens_one_tit" @click="doUrl('/pages/index/userfeedback')">
							<text>查询信息反馈</text>
					</view>
					
				</view>
			</view>

			<view class="index_block flex_columns">
				<view class="user_index flex-between flex-center">
					<text v-if="mensname.sortt==0">{{mensname.name}}</text>
					<text v-else>{{mensname.name}}</text>
					<view class=" flex-center">
						<text @click="loginout()">退出登录</text>
						<text>{{userlist.storeUsername}}</text>
					</view>
					
				</view>
				<!-- 搜索标题 -->
				<view class="block_noe_tit flex_rows" v-if="mensname.id==2 || mensname.id==3">
					<input type="text" value="" v-model="querySearch" placeholder="请输入需要查询的订单" />
					<text class="text_c flex-center" @click="getCompanyOrder()">搜索</text>
				</view>
				<!-- 第一块 -->
				<view class="block_noe_blck flex_columns" v-if="mensname">
					<view class="block_noe_blck_tit flex-center flex_rows">
						<text v-for="(item, index) in statusUserlist" :class="[status == index ? 'block_noe_blck_hover' : '']" v-if="mensname.id==1" @click="userstatus(item.status)">{{item.tit}}</text>
						<text v-for="(item, index) in statuslist" :class="[status == index ? 'block_noe_blck_hover' : '']" v-if="mensname.id==2" @click="swichstatus(item.status)">{{item.tit}}</text>
						<text class="block_noe_blck_hover" v-if="mensname.id==3">全部订单</text>
						
					</view>
					<view class="block_noe_blck_bk flex_columns">
						<view class="block_noe_blck_bk_tit flex-center flex_rows" v-if="mensname.id==2 || mensname.id==3 || mensname.id==4">
							<view class="flex-center">
								<checkbox-group @change="allChoose">
									<label>
										<checkbox value="all" :class="{ checked: allChecked }" :checked="allChecked ? true : false"></checkbox>
									</label>
								</checkbox-group>
							</view>
							<text>序号</text>
							<text>ID</text>
							<text>名字</text>
							<text class="block_noe_blck_data">电话号码</text>
							<text>数量</text>
							<text class="block_noe_blck_order">订单号</text>
							<text class="block_noe_blck_order" v-if="status==1 && mensname.id==2">物流号</text>
							<text class="block_noe_blck_order" v-if="status==2 && mensname.id==2">物流号</text>
							<text class="block_noe_blck_order" v-if="mensname.id==3">物流号</text>
							<text class="block_noe_blck_data">创建时间</text>
							<text class="block_noe_blck_data">更新时间</text>
							<text>状态</text>
						</view>
						<view class="block_noe_blck_bk_two">
								<!-- 单个复选框 -->
								<!-- <checkbox-group class="block" @change="checkboxChange">
										<view class="cu-form-group">
											<view class="title">复选选操作(checkbox)</view>
											<checkbox :class="isChecked?'checked':''" :checked="isChecked?true:false" value="1"></checkbox>
										</view>
									</checkbox-group> -->

								<!-- 多个复选框，带全选 -->
								<view class="content_list_one">
									<checkbox-group class="block" @change="changeCheckbox" v-if="menuLists">
										<view class="content_list_one_bl flex-center flex_rows" v-for="(item,index) in menuLists" :key="item.id"  v-if="mensname.id==2 || mensname.id==3 || mensname.id==4">
											<checkbox
												:value="String(item.id)"
												:checked="checkedArr.includes(String(item.id))"
												:class="{ checked: checkedArr.includes(String(item.id)) }"
											></checkbox>
											<text>{{ index+1 }}</text>
											<text>{{ item.id }}</text>
											<text v-if="mensname.id==2">{{ item.storeName }}</text>
											<text v-if="mensname.id==3">{{ item.spareThree }}</text>
											<text class="block_noe_blck_data">{{ item.storePhone }}</text>
											<text>{{item.quantity}}</text>
											<text class="block_noe_blck_order">{{ item.orderNo }}</text>
											<text class="block_noe_blck_order" v-if="item.logistics!=null">{{ item.logistics }}</text>
											<text class="block_noe_blck_order" v-if="item.logistics==null && status!=0 && mensname.id==2">暂无物流号</text>
											<text class="block_noe_blck_order" v-if="item.logistics==null && mensname.id==3">暂无物流号</text>
											<text class="block_noe_blck_data" v-if="item.createTime">{{ item.createTime.substring(0,16)}}</text>
											<text class="block_noe_blck_data" v-if="item.updateTime">{{ item.updateTime.substring(0,16)}}</text>
											<text v-if="item.status==0">未发货</text>
											<text v-if="item.status==1">已发货</text>
											<text v-if="item.status==2">已收货</text>
											<view class="content_list_one_bl_default flex-center">
												<button type="default" @click="deliverdizhi(item.addressid)" v-if="mensname.id==2">查询</button>
												<button type="default" @click="deliverdizhi(item.spareTwo)" v-if="mensname.id==3">查询</button>
												<button type="default" @click="deliverGoods(item.orderNo)" v-if="item.status==0">发货</button>
												<input type="text" value="" v-model="wuliuNo" placeholder="请输入物流单号" v-show="inputshow==item.orderNo"/>
												
											</view>
										</view>
									</checkbox-group>
									<view style="height: 100%; width: 100%; text-align: center; font-size: 30px;" v-else>
										<text>暂无订单</text>
									</view>
								</view>
								<view class="pages flex-center" v-if="menuLists">
									<view class="pages_number flex-center flex-around">
										<paging :pageSize="pageSize" :total="total" activecolor="#FFFFFF" activebackground="#DD524D" :footer="true" :current="1" @changes="dd"></paging>
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
export default {
	components:{
		paging,
		popup
	},
	data() {
		return {
			currentTab: 0,
			mensname:{
				name: '查询审核订单',
				id: 2,
				sortt:0
			},
			menslist: [
				{
					name: '功能',
					image1: '../../static/icon/meus1.png',
					image2: '../../static/icon/right.png',
					image3: '../../static/icon/lower.png',
					show: true,
					list: [
						{
							name: '查询审核订单',
							id: 2,
							sortt:1,
						},
						{
							name: '查询所有订单',
							id: 3,
							sortt:2,
						}
					]
				}
			],
			isChecked: false,
			checkedArr: [], //复选框选中的值
			allChecked: false ,//是否全选
			
			statusUserlist:[
				{
					tit:'总代理',
					status:0
				},
				{
					tit:'省代理',
					status:1
				},
				{
					tit:'市代理',
					status:2
				}
			],
			statuslist:[
				{
					tit:'未发货',
					status:0
				},
				{
					tit:'已发货',
					status:1
				},
				{
					tit:'已收货',
					status:2
				}
			],
			status:1,//已发货状态
			Selected:null,
			userlist: '',//用户信息
			menuLists:null,//信息组
			querySearch:null,//查询的值
			navigatepageNums:null,
			pageNum:1,//第几页
			pages:0,//总页数
			pageSize:0,//每页数
			total:0,//数据总条数
			wuliuNo:'',//物流号
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
		// this.judgeOrder(this.status);
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
		//页码渲染
		dd(index) {
			console.log(index);
			this.pageNum = index;
			this.judgeOrder(this.status);
		},
		pagesclick(e){
			if (e) {
				this.pages = e;
				console.log(this.pages);
			} else{
				return false;
			}
		},
		userstatus(e){
			//点击其中一个选项
			if (this.status == e) {
				return false;
			} else {
				this.status = e;
				this.userlistdata(e);
			}
		},
		swichstatus(e){
			//点击其中一个选项
			if (this.status == e) {
				return false;
			} else {
				this.status = e;
				this.judgeOrder(e);
			}
		},
		// 查询接口
		getCompanyOrder(){
			if (this.querySearch!=null) {
				this.utils.showloading();
				if (this.mensname.id==2) {
					this.http.getApi('/Companyorder/getCompanyOrder', {orderNo:this.querySearch}, 'get', this.userlist.storeOpendid).then(res => {
						// console.log(res);
						uni.hideLoading();
						if (res.data.length<0) {
							this.menuLists = res.data;
							this.navigatepageNums = res.data.navigatepageNums;
							this.total = res.data.total;
							this.pageSize = res.data.pageSize;
						} else{
							this.menuLists = [res.data];
							this.status = 1;
							console.log(this.menuLists);
							this.navigatepageNums = 1;
							this.total = 1;
							this.pageSize = this.menuLists.length;
						}
					})
					.catch(err => {
						console.log(err);
						uni.hideLoading();
					});
					
				} else{
					console.log(this.mensname.id);
					this.http.getApi('/order/getOneOrder', {orderONo:this.querySearch}, 'get', this.userlist.storeOpendid).then(res => {
							console.log(res);
							uni.hideLoading();
							if (res.data.length<0) {
								this.menuLists = res.data;
								this.navigatepageNums = res.data.navigatepageNums;
								this.total = res.data.total;
								this.pageSize = res.data.pageSize;
							} else{
								this.menuLists = [res.data];
								this.status = 1;
								console.log(this.menuLists);
								this.navigatepageNums = 1;
								this.total = 1;
								this.pageSize = this.menuLists.length;
							}
						})
						.catch(err => {
							console.log(err);
							uni.hideLoading();
						});
				}
					
			} else{
				this.utils.alert('请输入查询的参数',()=>{
					return;
				});
			}
		},
		userlistdata(e){
			if (this.mensname.id == 1) {
				
				if (this.pageNum==0) {
					this.pageNum = 1;
						this.utils.showloading();
						this.http.getApi('/user/getAllUserNo', {pageNum:this.pageNum, pageSize:10}, 'get', this.userlist.storeOpendid).then(res => {
							
							uni.hideLoading();
							if (res.data.list.length==0) {
								// this.menuLists = null;
							} else{
								console.log('------------------------------');
								console.log(this.mensname.id);
								console.log(res);
								this.menuLists = res.data.list;
								console.log(this.menuLists);
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
				} else{
					this.utils.showloading();
					this.http.getApi('/user/getAllUserNo', {pageNum:this.pageNum, pageSize:10}, 'get', this.userlist.storeOpendid).then(res => {
						
						uni.hideLoading();
						if (res.data.list.length==0) {
							// this.menuLists = null;
						} else{
							console.log('------------------------------');
							console.log(this.mensname.id);
							console.log(res);
							this.menuLists = res.data.list;
							console.log(this.menuLists);
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
		},
		// 获取全部订单
		judgeOrder(e) {
			
			if (this.mensname.id == 2) {
				this.utils.showloading();
					this.http.getApi('/Companyorder/CompanyOrder', { status: e,pageNum:this.pageNum, pageSize:10}, 'get', this.userlist.storeOpendid)
					.then(res => {
						uni.hideLoading();
						if (res.data.list.length==0) {
							this.menuLists = null;
						} else{
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
			if(this.mensname.id == 3){
				this.utils.showloading();
					this.http.getApi('/order/getorder', {myId: 0,pageNum:this.pageNum, pageSize:10}, 'get', this.userlist.storeOpendid)
					.then(res => {
						uni.hideLoading();
						// console.log(res);
						if (res.data.list.length==0) {
							this.menuLists = null;
						} else{
							console.log(res);
							this.menuLists = res.data.list;
							this.navigatepageNums = res.data.navigatepageNums;
							this.pageNum = res.data.pageNum;
							this.total = res.data.total;
							this.pageSize = res.data.pageSize;
						}
					})
					.catch(err => {
						console.log(err);
						uni.hideLoading();
					});
			}
			
			
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
					// this.utils.success('查询成功！');
					this.SpecificationsShow();
				})
				.catch(err => {
					console.log(err);
					this.utils.success(err.msg);
					uni.hideLoading();
				});
			} else{
				
			}
			
		},
		// 发货接口
		deliverGoods(orderNo){
			if (this.inputshow!=orderNo) {
				this.inputshow = orderNo;
				this.utils.alert('请输入物流单号',()=>{
					// _this.utils.navback();
				});
			} else{
				if (this.mensname.id==2) {
					if(this.wuliuNo==''){
					this.wuliuNo = '暂无物流号';
					this.utils.showloading();
					this.http.getApi('/Companyorder/delivery', { orderNo: orderNo,wuliuNo:this.wuliuNo}, 'get', this.userlist.storeOpendid)
					.then(res => {
						uni.hideLoading();
						console.log(res);
						this.wuliuNo = '';
						this.utils.success('发货成功！');
						this.judgeOrder(this.status);
						
					})
					.catch(err => {
						console.log(err);
						this.utils.success(err.msg);
						uni.hideLoading();
					});
					
				}else{
					this.utils.showloading();
					this.http.getApi('/Companyorder/delivery', { orderNo: orderNo,wuliuNo:this.wuliuNo}, 'get', this.userlist.storeOpendid)
					.then(res => {
						uni.hideLoading();
						console.log(res);
						this.wuliuNo = '';
						this.utils.success('发货成功！');
						this.judgeOrder(this.status);
					})
					.catch(err => {
						console.log(err);
						
						uni.hideLoading();
					});
				}
				
				}
				if(this.mensname.id==3){
					if(this.wuliuNo==''){
						this.wuliuNo = '暂无物流号';
						this.utils.showloading();
						this.http.getApi('/order/delivery', { orderNo: orderNo,wuliuNo:this.wuliuNo}, 'get', this.userlist.storeOpendid)
						.then(res => {
							uni.hideLoading();
							console.log(res);
							this.wuliuNo = '';
							this.judgeOrder(this.status);
							
						})
						.catch(err => {
							console.log(err);
							uni.hideLoading();
						});
						
					}else{
						this.utils.showloading();
						this.http.getApi('/order/delivery', { orderNo: orderNo,wuliuNo:this.wuliuNo}, 'get', this.userlist.storeOpendid)
						.then(res => {
							uni.hideLoading();
							console.log(res);
							this.wuliuNo = '';
							this.judgeOrder(this.status);
						})
						.catch(err => {
							console.log(err);
							uni.hideLoading();
						});
					}
				}
					
			
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
		
		menslistck(item) {
			if (item.show == false) {
				item.show = true;
			} else {
				item.show = false;
			}
		},
		swichMenu(current) {
			//点击其中一个选项
			if (this.currentTab == current.sortt) {
				this.mensname = current;
				this.pageNum = 1;
				this.judgeOrder(this.status);
				return false;
			} else {
				this.currentTab = current.sortt;
				this.mensname = current;
				this.pageNum = 1;
				this.judgeOrder(this.status);
			}
		},
		// 单个复选框事件
		checkboxChange(e) {
			let values = e.detail.orderNo;
			if (values[0] == 1) {
				this.isChecked = true;
			} else {
				this.isChecked = false;
			}
		},
		// 多选复选框改变事件
		changeCheckbox(e) {
			this.checkedArr = e.detail.value;
			// console.log(e)
			// 如果选择的数组中有值，并且长度等于列表的长度，就是全选
			if (this.checkedArr.length > 0 && this.checkedArr.length == this.menuLists.length) {
				this.allChecked = true;
			} else {
				this.allChecked = false;
			}
		},
		// 全选事件
		allChooseid(e) {
			let chooseItem = e.detail.value;
			// 全选
			if (chooseItem[0] == 'all') {
				this.allChecked = true;
				for (let item of this.menuLists) {
					let itemVal = String(item.id);
					if (!this.checkedArr.includes(itemVal)) {
						this.checkedArr.push(itemVal);
					}
				}
			} else {
				// 取消全选
				this.allChecked = false;
				this.checkedArr = [];
			}
		},
		// 全选事件
		allChoose(e) {
			let chooseItem = e.detail.value;
			// 全选
			if (chooseItem[0] == 'all') {
				this.allChecked = true;
				for (let item of this.menuLists) {
					let itemVal = String(item.orderNo);
					if (!this.checkedArr.includes(itemVal)) {
						this.checkedArr.push(itemVal);
					}
				}
			} else {
				// 取消全选
				this.allChecked = false;
				this.checkedArr = [];
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.index1 {
	width: 100%;
	min-height: 1080px;
	padding-right: 30px;
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
		// margin: 25%;
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
			background-color: #304156;
			text {
				font-size: 30px;
			}
			image {
				width: 30px;
			}
		}
		.mens_one:hover {
			background-color: #273445;
		}
		.mens_one_tit:hover {
			background-color: #00152a;
		}
		.mens_one_tit {
			width: 100%;
			height: 50px;
			// padding: 0 10px;
			background-color: #1f2d3d;
			
			text {
				font-size: 20px;
				padding: 10px;
			}
		}
		.mens_one_tit_active {
			background-color: #00152a;
			// -webkit-transform: scale(1.2);
			// transform: scale(1.1);
		}
	}
}
//用户快
.user_index{
	min-height: 70px;
	
	text{
		font-size: 5px;
		margin-left: 30px;
	}
}
//第一块
.index_block {
	width: 87%;
	height: 100%;
	// border: #007AFF 1px solid;
	padding:  10px 40px;
	text {
		font-size: 30px;
		color: #333333;
	}
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
	.block_noe_blck {
		width: 100%;
		// height: 700px;
		margin-top: 20px;
		padding-bottom: 10px;
		border-radius: 15px;
		box-shadow: 1px 1px 20px #999999;
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
		.block_noe_blck_bk{
			// padding: 10px 0;
			// border: #999999 1px solid;
			//特殊表格订单宽度
			.block_noe_blck_order{
				width: 200px;
			}
			.block_noe_blck_data{
				width: 170px;
			}
			checkbox{
				width: 50px;
				padding: 5px 0;
				
				// border: #4CD964 1px solid;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.block_noe_blck_bk_tit{
				font-weight: 900;
				padding: 5px 0;
				border-top: #999999 1px solid;
				background-color: #C8C7CC;
				text{
					font-size: 20px;
					// border: #007AFF 1px solid;
				}
			}
			.content_list_one_bl_user{
				padding: 5px 0;
				text{
					padding: 0 5px;
					font-size: 15px;
					// border: #007AFF 1px solid;
				}
				input{
					// height: 40px;
					max-width: 100px;
					// padding: 10px 0;
					// margin: 0 5px;
					border: #000000 1px solid;
					// background-color: #007AFF;
					// box-shadow: 1px 2px 6px #c8c7cc;
					// padding-left: 10px;
					// border-radius: 10px;
					// font-size: 15px;
				}
				
				.content_list_one_bl_default_user{
					min-width: 70px;
					padding: 5px 0;
					justify-content: flex-start;
					// input{
					// 	// height: 40px;
					// 	min-width: 50px;
					// 	padding: 10px 0;
					// 	margin: 0 5px;
					// 	border: #000000 1px solid;
					// 	background-color: #007AFF;
					// 	box-shadow: 1px 2px 6px #c8c7cc;
					// 	padding-left: 10px;
					// 	border-radius: 10px;
					// 	font-size: 15px;
					// }
					// button{
					// // padding: 5px;
					// border-radius: 5px;
					// font-size: 15px;
					// color: #FFFFFF;
					// background-color: #DD524D;
					// }
				}
			}
			.content_list_one_bl{
				padding: 5px 0;
				// border-top: #999999 1px solid;
				// border-bottom: #999999 1px solid;
				// border: #007AFF 1px solid;
				// z-index: 9999;
				text{
					font-size: 15px;
					// border: #007AFF 1px solid;
				}
				
				.content_list_one_bl_default{
					min-width: 70px;
					padding: 5px 0;
					justify-content: flex-start;
					input{
						// height: 40px;
						// min-width: 30px;
						padding: 10px 0;
						margin: 0 5px;
						background-color: #FFFFFF;
						box-shadow: 1px 2px 6px #c8c7cc;
						padding-left: 10px;
						border-radius: 10px;
						font-size: 15px;
					}
					button{
					// padding: 5px;
					border-radius: 5px;
					margin-right: 10px;
					font-size: 15px;
					color: #FFFFFF;
					background-color: #DD524D;
				}
				}
			}
			.content_list_one_bl_user,.content_list_one_bl:nth-child(odd){
					background-color: #F1F1F1;
					border-top: #999999 1px solid;
					border-bottom: #999999 1px solid;
				}
			.content_list_one_bl:hover{
				background-color: #DD524D;
				text{
					color: #FFFFFF;
				}
				
			}
			
			.content_list_one_bl_user:hover{
				background-color: #DD524D;
				text{
					color: #FFFFFF;
				}
				input{
					color: #FFFFFF;
				}
			}
			.block_noe_blck_bk_tit,
			.content_list_one_bl,
			.content_list_one_bl_user{
				text{
					min-width: 80px;
					// min-height: 100%;
					// font-size: 20px;
					// margin: 0;
					// padding: 10px 0;
					border-left: #999999 1px solid;
					// border-bottom: #999999 1px solid;
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
