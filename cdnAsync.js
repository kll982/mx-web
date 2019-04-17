/**
 * Created by Chen on 2017/3/21.
 */

var buildVersion1="test";

//正式环境打包
//var buildVersion1="product";

var ssss111=Math.random(0,1);
var ssss112=Math.floor(ssss111*100000);
ssss112="1"+ssss112+"";
var ssss113=ssss112.split("")
ssss113=ssss113.join(".")
console.log(ssss113)
var productVersion=ssss113;

var buildVersion2=buildVersion1=="test";


var crypto =require('crypto');
var fs =require('fs');
var path =require("path");
function setBrowserConst(){
  var htmlText=String(fs.readFileSync('./dist/index.html'));
  htmlText=htmlText.replace(/<script id="browsercon">\w*<\/script>/g,'<script id="browsercon">window.bowserEnv="'+String(process.env.NODE_ENV).replace(' ','')+'"<\/script>');
  fs.writeFileSync('./dist/index.html',htmlText);
}
setBrowserConst();
function start(filePath){
  
  var readStream=fs.createReadStream(filePath),
    shasum=crypto.createHash("sha1");
  readStream.on("data",function(chunk){
    shasum.update(chunk);
  });
  readStream.on("end",function(){
    //文件哈希值
    var sha1=String(shasum.digest("hex"));

    //新的文件名
    var ext=path.extname(filePath),
      head=path.basename(filePath,ext),
      dirname=path.dirname(filePath),
    newKey="erp."+head+"."+sha1.slice(0,8)+ext;

    newKey1="https://pya-piaoju.oss-cn-hangzhou.aliyuncs.com/msa/"+newKey;
    // console.log(sha1);
    // uploadFile(filePath,getUptoken(newKey),newKey);
    //不需要上传，直接改文件名


    fs.renameSync(filePath,dirname+'/'+newKey);

    if(buildVersion2){
      replaceHTML(head+ext,newKey);
    }else{
      replaceHTML(head+ext,newKey1);
    }
    //现在的替换路径文件
    //replaceHTML(head+ext,newKey1);
    //以前的替换路径文件
    //replaceHTML(head+ext,newKey);
  });
}

function replaceHTML(prevName,nextName){
  //替换html文件中的路径
  var htmlText=String(fs.readFileSync('./dist/index.html'));

  if(buildVersion2){
    htmlText=htmlText.replace('./'+prevName,'./'+nextName+"?version="+productVersion);
  }else{
    htmlText=htmlText.replace('./'+prevName,nextName+"?version="+productVersion);
  }
  // console.log(prevName,htmlText.indexOf(prevName));
  //现在的替换路径文件
  //htmlText=htmlText.replace('./'+prevName,nextName);
  //以前的替换路径文件
  //htmlText=htmlText.replace('./'+prevName,'./'+nextName);

  // console.log(htmlText);
  fs.writeFileSync('./dist/index.html',htmlText);
}

//删除原来的文件，全部以ERP开头的js/css文件
var fileList=fs.readdirSync('./dist');
for(var i=0;i<fileList.length;i++){
  var fileName=String(fileList[i]);
  if(fileName.indexOf('erp')>-1){
    fs.unlinkSync('./dist/'+fileName);
  }
}
//删除json.gz文件
var fileList2=fs.readdirSync('.');
for(var i=0;i<fileList2.length;i++){
  var fileName2=String(fileList2[i]);
  if(fileName2.indexOf('json.gz')>-1){
    fs.unlinkSync('./'+fileName2);
  }
}
start('./dist/index.js');
start('./dist/common.js');
start('./dist/index.css');





