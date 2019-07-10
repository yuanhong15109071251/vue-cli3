//使用mockjs实现mock数据接口
import Mock from 'mockjs'
import data from './data.json'//自动解析为js


//mock /goods 接口
Mock.mock('/goods',{code:0,data:data.goods})
//mock /ratings 接口
Mock.mock('/ratings',{code:0,data:data.ratings})
//mock /info 接口
Mock.mock('/info',{code:0,data:data.info})
console.log('mock启动了');