export default{
	install:function(Vue, options){
		/*项目公共方法代码*/

        //封装保存信息的代码，避免代码耦合，方便统一修改
        Vue.prototype.setCookie = function(){

        }

        Vue.prototype.getCookie = function(){}

        Vue.prototype.delCookie = function(){
            
        }

		

        Vue.prototype.amountInWords = function(amount){
        	const maxNum = 999999999.99;
        	const lastUnit = '元';
        	let cnNums = new Array("零","壹","贰","叁","肆","伍","陆","柒","捌","玖");
        	let intRadice = new Array("","拾","佰","仟");
        	let intUnits = new Array("","万","亿","兆");
        	let decUnits = new Array("角","分");

        	if(amount == '')  return '';
        	if(amount > maxNum){
        		return '金额超过处理范围';
        	}
        	if(amount == 0){
        		return cnNums[0]+ lastUnit;
        	}

        	let intNum; //整数部分
        	let decNum; //小数部分
        	let amountInWords = '';
        	let parts = [];

        	if(amount.indexOf(".") == -1){
        		intNum = amount + '';
        		decNum = '';
        	}else{
        		parts = amount.split(".");
        		intNum = parts[0];
        		decNum = parts[1].substr(0,2);
        	}

        	if(parseInt(intNum,10)>0){
        		let zeroCount = 0;
        		let len = intNum.length;
        		for(let i=0;i<len;i++){
        			let num = intNum.substr(i,1);
        			let p = len - i - 1;
        			let q = p/4;
        			let m = p%4;
        			if(num  == '0'){
        				zeroCount++;
        			}else{
        				if(zeroCount>0){
        					amountInWords += cnNums[0];
        				}
        				zeroCount = 0;
        				amountInWords += cnNums[parseInt(num)] + intRadice[m];
        			}
        			if(m == 0 && zeroCount<4){
        				amountInWords += intUnits[q];
        			}
        		}
        		amountInWords += lastUnit;
        	}

        	if(decNum!==''){
        		let len = decNum.length;
        		for(let i=0;i<len;i++){
        			let num =decNum.substr(i,1);
        			if(num != '0'){
        				amountInWords += cnNums[Number(num)] + decUnits[i];
        			}
        		}
        	}
        	return amountInWords;
        }

        Vue.prototype.tableSum = function(param){
        	const { columns, data } = param;
        	const sums = [];
        	columns.forEach((column, index) => {
        		if (index === 0) {
        			sums[index] = '小计';
        			return;
        		}else if(index ===1 || index ===3 || index===4 ||index === 7) {
        			sums[index] = '--';
        		}else{
        			const values = data.map(item => Number(item[column.property]));
        			if (!values.every(value => isNaN(value))) {
        				sums[index] = values.reduce((prev, curr) => {
        					const value = Number(curr);
        					if (!isNaN(value)) {
        						return prev + curr;
        					} else {
        						return prev;
        					}
        				}, 0);
        				sums[index] += '';
        			}
        		}
        		
        	});
        	return sums;
        }
	
	}
}