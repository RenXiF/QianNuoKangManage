<template>
	<!-- 侧边栏 -->
	<view class="mens flex_columns ">
		<view class="mens_block flex_columns" v-for="(item, index) in men" :key='index'>
			<view class="mens_one flex-between flex-center" @click="doUrls(item)" :class="item.id == showit ? 'mens_one_active' : ''">
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
		    men: {
		        type: Array,
		        default() {
		            return [];
		        }
		    },
			showit:{
				type:Number,
				default(){
					return ;
				}
			}
		},
		data() {
			return {
				sorttid:1,
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
						name: '查询云进货单',
						id: 4,
						sortt:3,
						http:'/pages/index/yunOrder'
					},
					{
						name: '查询云提货单',
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
				]
			};
		},
		onLoad() {
		},
		onShow() {
		},
		methods:{
			doUrls(item){
				this.sorttid = item.id;
				this.doUrl(item.http);
			}
		}
	}
</script>

<style lang="scss">
.mens {
	min-width: 200px;
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
				// font-weight: 600;
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
</style>
