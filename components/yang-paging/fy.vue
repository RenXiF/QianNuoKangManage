<template>
	<view>
		<view style="width: 100%;" class="flex_columns">
			<view class="fy flex-center">
				<span @click="qy(-1)" :style="{background:background,color:color}">
					首页
				</span>
				<span v-for="(item,index) in page" :key="index" @click="qy(index)" :style="{background:HN_back(index),color:HN_color(index)}">
					{{item}}
				</span>
				<span @click="qy(-2)" :style="{background:background,color:color}">
					尾页
				</span>
			</view>
			<view class="btn-view flex-around" v-if="footer">
				<view class="flex-center">
					<!-- <text>当前页：{{ current1 }}，数据总量：{{ total }}条，每页数据：{{ pageSize }}</text> -->
					<text>当前页：{{ current1 }}，订单总数：{{ total }}条</text>
				</view>
			</view>
		</view>

	</view>
</template>
<script>
	export default {
		name: 'paging',
		props: {
			total: {
				type: Number,
				default: 0
			},
			pageSize: {
				type: Number,
				default: 0
			},
			footer: {
				type: Boolean,
				default: false
			},
			current: {
				type: Number,
				default: 1
			},
			background: {
				type: String,
				default: "#ffffff"
			},
			color: {
				type: String,
				default: "#333333"
			},
			activebackground: {
				type: String,
				default: "#00BFFF"
			},
			activecolor: {
				type: String,
				default: "#ffffff"
			}
		},
		data() {
			return {
				page: [],
				zpage: 0,
				current1: this.current
			}
		},
		created() {
			this.jx()
		},
		watch: {
			total() {
				this.jx();
			},
			pageSize() {
				this.jx()
			}
		},
		methods: {
			jx() {
				let that = this
				let total = parseInt(that.total)
				let pageSize = parseInt(that.pageSize)
				let zpage = parseInt(total / pageSize)
				if (total / pageSize > zpage) {
					zpage++
				}
				that.zpage = zpage
				let arr = []
				if (zpage < 5) {
					for (let i = 1; i <= zpage; i++) {
						arr.push(i)
					}
				} else {
					arr = [1, 2, 3, 4, 5]
				}
				that.page = arr
			},
			HN_back: function(e) {
				let a = this.current1 == this.page[e] ? this.activebackground : this.background;
				return a;
			},
			HN_color: function(e) {
				let a = this.current1 == this.page[e] ? this.activecolor : this.color;
				return a;
			},
			qy: function(e) {
				let that = this
				switch (e) {
					case -1:
						e = 1;
						break;
					case -2:
						e = that.zpage;
						break;
					default:
						e = that.page[e];
				}
				that.current1 = e;
				that.$emit("changes", e);
				let total = parseInt(that.total)
				let pageSize = parseInt(that.pageSize)
				let zpage = parseInt(total / pageSize)
				console.log(zpage)
				if (total / pageSize > zpage) {
					zpage++
				}
				let arr = []
				if (zpage < 5) {
					return
				}
				if (e >= zpage - 2) {
					arr = [zpage - 4, zpage - 3, zpage - 2, zpage - 1, zpage]
					that.page = arr
					return
				}
				if (zpage > 5 && e < 4) {
					arr = [1, 2, 3, 4, 5]
					that.page = arr
					return
				}
				if (zpage > 5 && e > 3) {
					arr = [e - 2, e - 1, e, e + 1, e + 2]
					that.page = arr
					return
				}
			}
		},
		onLoad() {

		}
	}
</script>
<style lang="scss">
	@charset "UTF-8";

	.fy {
		// display: inline-block;
		// flex-direction: row;
		// margin: auto;
		
		width: 100%;
		// height: 100%;
		// margin-top: 50px;
		// text-align: center;
	}

	.fy span {
		// display: inline-block;
		border: #007AFF 1px solid;
		// width: 60px;
		// height: 60px;
		// line-height: 60px;
		padding: 10px 20px;
		margin-left: 10px;
		border: #999999 1px solid;
		border-radius: 15px;
		font-size: 20px;
	}
	.fy span:hover {
		cursor:pointer;//鼠标变小手
		background-color: #DD524D;
		color: #FFFFFF;
	}

	.btn-view {
		margin-top: 10px;
		text{
			font-size: 20px;
		}
	}
</style>
