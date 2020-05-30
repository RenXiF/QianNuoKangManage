<template>
	<!-- 登录页面 -->
	<view class="index2 flex_columns">
		<view class="index_login flex_columns  flex-center">
			<text class="tit_name">登录系统</text>
			<view class="log_noe  flex_columns">
				<input type="text" value="" v-model="name" placeholder="请输入登录账号"/>
				<input type="text" value="" v-model="pass" password="true" placeholder="请输入账号密码"/>
			</view>
			<text class="text_c" @click="login()">登录</text>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				title: 'Hello',
				name:null,
				pass:null
			}
		},
		onLoad() {
		},
		onShow() {
			this.name = null;
			this.pass = null;
		},
		methods: {
			login(){
				// this.doUrl('/pages/index/index');
				// 判断是否登录
				if(this.name == null){
					this.utils.error('请输入账号');
					return;
				}
				if(this.pass == null){
					this.utils.error('请输入账号密码');
					return;
				}
				if(this.pass != 'hannuo88888888'){
					this.utils.error('密码错误！');
					return;
				}
				this.utils.showloading();
				this.http.getApi('/user/login', { storeLogin: 1, storeOpendid: this.name }, 'post','').then(res => {
						uni.setStorageSync('userlist', res.data);
						// this.userlist = res.data;
						console.log(res);
						uni.hideLoading();
						this.utils.success('登录成功！', () => {
							this.doUrl('/pages/index/userlist');
						});
					}).catch(err => {
						uni.hideLoading();
						this.utils.error(err.msg, () => {
							// this.doUrl('/pages/index/index');
							// _this.utils.navback();
						});
						
					});
			}
		}
	}
</script>

<style lang="scss">
	.index2{
		width: 100%;
		min-height: 1080px;
		background-image: url(../../static/loginbg.jpg);
	}
	.index_login{
		width: 400px;
		min-height: 300px;
		background-color: #FFFFFF;
		border-radius: 15px;
		margin: 0 auto;
		margin-top: 200px;
		text{
			font-size: 30px;
		}
		.tit_name{
			margin-top: 10px;
		}
		.log_noe{
			width: 80%;
			padding: 10px;
			input{
				width: 90%;
				height: 50px;
				margin-bottom: 30px;
				padding-left: 20px;
				border-radius: 15px;
				background-color: #F1F3F4;
			}
		}
		.text_c {
			// position: absolute;
			height: 50px;
			line-height: 50px;
			padding: 0px 20px;
			// color: #FF5733;
			cursor: pointer;
			color: #FFFFFF;
			box-shadow: 1px 2px 6px #F55866;
			background: linear-gradient(0deg,rgba(246,62,100,1),rgba(244,106,103,1));
			border-radius: 15px;
			text {
				font-size: 7px;
			}
		}
		
	}
</style>
