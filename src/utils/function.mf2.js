import {sytemCodes} from '../assets/system.code'
export function getSelectoption(item) {
    let optionres = [];
	let rows = sytemCodes.Rows;
	for(var i = 0; i < rows.length; i++){
		if(rows[i].codeno == item){
			for(var j = 0;j < rows[i].codeitem.length; j++){
				optionres.push(rows[i].codeitem[j]);
			}
		}
	}
    return optionres;
}
export function renderValue(itemno,codeno){
	var selectData = getSelectoption(codeno);
	for(var i=0;i<selectData.length;i++){
		if(selectData[i].itemno == itemno)
			return selectData[i].itemname;
	}
}
export function renderTeamValue(teamlist,teamid){
    for(var i=0;i<teamlist.length;i++){
		if(teamlist[i].teamid == teamid)
			return teamlist[i].teamName;
	}
}
export function renderTeamValue1(teamlist,teamid){
    var teamname;
    teamlist.forEach(element => {
        if(element.teamid === teamid){
            teamname = element.teamName
        }
    });
    return teamname
}
export function renderRoleValue(roleList,roleid){
    var rolename;
    roleList.forEach(element => {
        if(element.roleid === roleid){
            rolename = element.rolename
        }
    });
    return rolename
}
/**
 * 检测电话号码
 * @param phone
 * @returns {Boolean}
 */
export function checkPhone(phone){ 
    if(!(/^1[3456789]\d{9}$/.test(phone))){ 
        return false; 
    } else{
    	return true;
    }
}
/**
 * 首先是千分符转化 
 * @param n
 */
export function  comdify(n) { 
	var re = /\d{1,3}(?=(\d{3})+$)/g; 
	var n1 = n.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) { 
	return s1.replace(re, "$&,") + s2; 
	}); 
	return n1; 
}
/**
 * //去除千分位中的‘,’ 
 */
export function delcommafy(num){
	num = num.toString(); 
	num = num.replace(/,/gi, ''); 
	return num; 
} 

var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];    // 加权因子   
var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];            // 身份证验证位值.10代表X   
export function IdCardValidate(idCard) { 
//	if(idCard.indexOf("") != -1 ){
//		return false;
//	}
//    idCard = trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格                 
    if (idCard.length == 18) {   
        var a_idCard = idCard.split("");                // 得到身份证数组   
        if(isValidityBrithBy18IdCard(idCard)&&isTrueValidateCodeBy18IdCard(a_idCard)){   //进行18位身份证的基本验证和第18位的验证
            return true;   
        }else {   
            return false;   
        }   
    } else { 
        return false;   
    }   
}   
/**  
 * 判断身份证号码为18位时最后的验证位是否正确  
 * @param a_idCard 身份证号码数组  
 * @return  
 */  
export function isTrueValidateCodeBy18IdCard(a_idCard) {   
    var sum = 0;                             // 声明加权求和变量   
//    if (a_idCard[17].toLowerCase() == 'x') {   
//        a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作   
//    } 
    //console.log("last: " + a_idCard[17]);
    if (a_idCard[17]== 'X') {   
        a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作   
    }  
    for ( var i = 0; i < 17; i++) {   
        sum += Wi[i] * a_idCard[i];            // 加权求和   
    }   
    valCodePosition = sum % 11;                // 得到验证码所位置   
    if (a_idCard[17] == ValideCode[valCodePosition]) {   
        return true;   
    } else {   
        return false;   
    }   
}   
/**  
  * 验证18位数身份证号码中的生日是否是有效生日  
  * @param idCard 18位书身份证字符串  
  * @return  
  */  
 export function isValidityBrithBy18IdCard(idCard18){   
    var year =  idCard18.substring(6,10);   
    var month = idCard18.substring(10,12);   
    var day = idCard18.substring(12,14);   
    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
    // 这里用getFullYear()获取年份，避免千年虫问题   
    if(temp_date.getFullYear()!=parseFloat(year)   
          ||temp_date.getMonth()!=parseFloat(month)-1   
          ||temp_date.getDate()!=parseFloat(day)){   
            return false;   
    }else{   
        return true;   
    }   
}   
  /**  
   * 验证15位数身份证号码中的生日是否是有效生日  
   * @param idCard15 15位书身份证字符串  
   * @return  
   */  
export  function isValidityBrithBy15IdCard(idCard15){   
      var year =  idCard15.substring(6,8);   
      var month = idCard15.substring(8,10);   
      var day = idCard15.substring(10,12);   
      var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
      // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
      if(temp_date.getYear()!=parseFloat(year)   
              ||temp_date.getMonth()!=parseFloat(month)-1   
              ||temp_date.getDate()!=parseFloat(day)){   
                return false;   
        }else{   
            return true;   
        }   
  }   
/**
 * teamlist转化为多级形式
 * @param {*} list 
 */
export function list2children(list){
    
}

