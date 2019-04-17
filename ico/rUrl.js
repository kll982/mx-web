/**
 * Created by Chen on 2017/3/21.
 */
var crypto =require('crypto');
var fs =require('fs');
var path =require("path");

var arrayList=['./ico/configPro.js'];
function copyFile(){

    for(let i=0; i<arrayList.length; i++){
        fs.readFile(arrayList[i], 'utf-8', function(err, data) {
            if (err) {
                console.log(err)
                console.log("读取失败");
            } else {
                writeFile(data,arrayList[i]);
                return data;
            }
        });
    }

}

function writeFile(data,filenmae){

    fs.writeFile('./ico/config.js',data,'utf8',function(error){
        if(error){
            throw error;
        }else{
            console.log("文件已保存");
        }
    });
}

copyFile();