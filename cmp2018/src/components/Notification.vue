<template>
	<div>
		<!-- 对话框 -->
		<el-dialog title='消息详情' :visible.sync='dialogVisible' width='40%'>
			<router-link :to='dialogUrl'><span @click='closeDialog'>{{dialogMsg}}</span></router-link>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'Notification',
	props:{
		
	},
	data() {
		return{
			listData: {},
			list: [],
			dialogMsg: '',
			dialogUrl: '',
			dialogVisible: false
		}
	},
	mounted (){
		this.getList(); 
	},
	watch: {
		list: function(newList){
			if(newList.length > 0){
			    this.handleNot(newList);
			}else{
				this.handleNotClose();  
			}
		}
	},
	destroyed (){
		this.handleNotClose();  
	},
	methods:{
		getList(){
			this.axios.get('/api/message/find?status=0').then((res) => {
				const data = res.data;
				if(data.code == 200){
					const model = data.model;
					this.listData = model;
					this.list = model.data;
				}
			});
		},
		handleRead(item) {
			this.handleNotClose();
			//只要一点击查看详情,该条消息记录状态显示为已读
			this.axios.get('/api/message/update/' + item.id).then((res) => {
				const data = res.data;
				if(data.code == 200){
					this.getList();
				}
				//跳转到详情页面
				this.dialogVisible = true;
				this.dialogMsg = item.content;
				this.dialogUrl = '/' + item.url;
			})
		},
		closeDialog(){
			this.dialogVisible = false;
		},
		handleAllRead(){
			this.axios.get('/api/message/update/all').then((res) => {
				const data = res.data;
				this.handleNotClose();
			})
		},
		handleNotClose(){
			if(this.noticeCon){
				this.noticeCon.close();
			}
		},
		handleNot(list) {
			const h = this.$createElement;
			this.noticeCon = this.$notify.info({
				title: '提醒事项',
				dangerouslyUseHTMLString: true,  // 设为true,message就会被当作HTML片段处理
				message: h('ul', 
					    { 
					    	style: { color: '#1f7ab7', paddingLeft: '0', fontSize: '12px' } 
					    }, 
					    [
					        list.map((item, index) => {
					    	    return h('li', 
					    	     {
					    	     	style: { borderBottom: '1px solid #1f7ab7' }, 
					    		    domProps: {
					    			    innerHTML: '【'+ (index+1) +'】'+item.content
					    		    },
					    		    on: {
					    			    click: (e) => { this.handleRead(item) }
					    		    } 
					    	    }
					    	    )
					        }),
					        /*if(this.listData.totalPage > 0){
					        		return h('p',
					        		{
					        			'class': 'all-read-btn',
					        			domProps: {
					        				innerHTML: '查看更多'
					        			},
					        			on: {
					        				click: this.handleAllRead
					        			}  
					        		})
					        },*/
					        h('p',
					        {
					        	'class': 'all-read-btn',
					        	domProps: {
					        		innerHTML: '全部已读'
					        	},
					        	on: {
					        		click: this.handleAllRead
					        	}
					        })
					    ]
				),
				duration: 0,   // duration设置为0，则不会自动关闭
				position: 'bottom-right'
			});
		}
	}
}
</script> 

<style scoped>
.sm-tip{ font-size: 12px; color:#67c23a; margin-left: 10px;}
.upload-demo{ display: inline-block; }
ul li{ list-style: none; cursor: pointer;}
p.all-read-btn{ color: red; float: right;text-decoration: underline;cursor: pointer;font-size: 14px;letter-spacing: 2px; }
</style>
