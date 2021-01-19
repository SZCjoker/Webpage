  
let app = new Vue({
    el: '#app'
    , data: {   
        version:"",
        currentLocation: location.href,      
        sidebarItem: [],                    
        name: "",
        team: "",
        departs: [],
        issues:[],
        entranceType:[{ id:1,type:"pc"},{id:2,type:"全站"},{id:3,type:"體育"},{id:4,type:"H5"}],
        processStatus:[{ id:1,type:"新建"},{id:2,type:"進行中"},{id:9,type:"結案"}],

        recordData:{
             issueNo:0,
             deptID:0, 
             cDate:"",
             uDate:"",
             responseTime:"",
             userID:"",
             device:"",
             entranceType:0,
             issueCateID:0,
             issueDescription:"",
             reason:"",
             processStatus:0,
             responseResult:"",
             testResult:"",
             content:"",
             eserviceID:"",
             recorder:"",
            // uploadFile:[]
        }  
    },mounted: function () {
        //一開始動作       
        this.CheckLogin();
        this.GetAccountInfo();
        this.GetPermission();
        this.GetDepartDropDown();
        this.GetIssueDropDown();
        this.leftmenu();
        this.leftSitebar();
        this.GetEditData();
        this.GetuploadFile();
        this.GetVersion();
    },     
    methods: {    
  changeSelectFunc: function(type)
  {
  let vm = this ;
  switch(type)
{
    case 0:
         vm.recordData.deptID = event.target.value; //target.options.selectedIndex; 取項次
        console.log(vm.recordData.deptID);
    break;
    case 1:
        vm.recordData.issuecateID =event.target.value;
        console.log(vm.recordData.issuecateID);
    break;
    case 2:
        vm.recordData.entranceType =event.target.value;
        console.log(vm.recordData.entranceType);
    break;
    case 3:
        vm.recordData.processStatus =event.target.value;
        console.log(vm.recordData.processStatus);
    break;
}
  },
GetAccountInfo:function ()
   {  
      let vm = this;
      vm.name = getCookie("name");
      vm.team = getCookie("team");
   }
,menuCkFun: function(name,url){
    if(url == "javascript:;" || url == "#"){
        Swal.fire({
            icon: 'info',
            title:name+'頁還在建置中'
        });
    }
  }
,GetPermission:function() {
     let list = JSON.parse(getCookie("plist"));     
     let id = list[0].deptID;
     let vm = this;
    axios.get(domainUrl+`permission/${id}`)   
    .then(response => {
        // console.log('權限');
         //console.log(response.data.data);         
         vm.sidebarItem = response.data.data;
        });
   },
   leftmenu:function(){
    $(".nav.side-menu > li > a:first").click(function(){ $("#menu-first").toggle()})
    $(".nav.side-menu > li > a:eq(1)").click(function(){ $("#menu-second").toggle()})
  },
  leftSitebar:function()
  {
     let vm = this;
     
     if(vm.coUnt == 0)
     {
        $($BODY).attr('class','nav-sm');
        vm.coUnt +=1;
        console.log(vm.coUnt);
     }
  
    else
    {    
      $($BODY).attr('class','nav-md');
      vm.coUnt = 0;
      console.log(vm.coUnt);
    }
  },
GetDepartDropDown:function(){
    let vm = this;
    axios.get(domainUrl+`Management/deptList`)
    .then(response => {
         //console.log('部門');
         //console.log(response.data.data);         
         vm.departs = response.data.data;
        });      
},
GetIssueDropDown:function()
{
    let list = JSON.parse(getCookie("plist"));     
    let id = list[0].deptID;
    let vm = this;
    axios.get(domainUrl+`Management/issuecate/${id}`)
    .then(response => {
         //console.log('依照部門取得問題種類');
         //console.log(response.data.data);             
         vm.issues = response.data.data;
        });
 },
ClearFun:function()
{ 
  let vm = this;
  vm.recordData.cDate="";
  vm.recordData.userID="";
  vm.recordData.recordNo=0;
  vm.recordData.recorder="";
  vm.recordData.device="",
  vm.deptID=0,
  vm.recordData.entranceType=0,
  vm.recordData.issuecateID=0,
  vm.recordData.issueDescription="",
  vm.recordData.processStatus=0,
  vm.recordData.eserviceID="",
  vm.recordData.recorder="",
  vm.recordData.responseResult="",
  vm.recordData.reason="",
  vm.recordData.uploadFile="",
  vm.recordData.content="",
  vm.recordData.testResult=""
},GetEditData:function()
{   
    let vm = this;
    const url = new URL(window.location.href)
    if(url!="")
    var id = url.searchParams.get('key');
    
     if(!id == ""|!id==null|!id == 0)
    
    axios.get(domainUrl+`record/recordno/${id}`)
    .then(response => {
         console.log('取得編輯資料');
         console.log(response.data.data);             
        
         vm.recordData.cDate = response.data.data.cDate;
         vm.recordData.deptID = response.data.data.deptID;
         vm.recordData.userID = response.data.data.userID;
         vm.recordData.recordNo = response.data.data.recordNo;
         vm.recordData.recorder = response.data.data.recorder;
         vm.recordData.device = response.data.data.device,
         vm.recordData.entranceType = response.data.data.entranceType;
         vm.recordData.issuecateID = response.data.data.issuecateID;
         vm.recordData.issueDescription = response.data.data.issueDescription;
         vm.recordData.processStatus = response.data.data.processStatus;
         vm.recordData.eserviceID = response.data.data.eserviceID;        
         vm.recordData.responseResult = response.data.data.responseResult;
         vm.recordData.reason = response.data.data.reason;
         vm.recordData.content= response.data.data.content;
         vm.recordData.testResult= response.data.data.testResult;
        });
else{
    return;
}

},Edit:function()
{   let vm = this ;
    axios.put(domainUrl+`record`,vm.recordData)
    .then(response => {
        
        switch(response.data.code)
        {
            case 200:
                Swal.fire({
                    icon: 'info',                    
                    title: '編輯資料',
                    text:"確認編輯"
                })
                .then (function(){location.href="Statistic.html"; });
            break;

            case 400:
                Swal.fire({
                    icon: 'warning',                    
                    title: '新增資料',
                    text:"編輯失敗請洽資訊人員"
                })
                .then (function(){location.href="Statistic.html"; });
            break;


        }         
        });

},AddedRecord:function()
{  

    let vm = this ;
 
    axios.post(domainUrl+`record`,vm.recordData)
    .then(response => {
         console.log('新增資料');
         console.log(response.data.data);             
         switch(response.data.code)
        {
            case 200:
                Swal.fire({
                    icon: 'info',                    
                    title: '新增資料',
                    text:"確認新增成功"
                })
                .then (function(){location.href="record.html"; });
            break;

            case 400:
                Swal.fire({
                    icon: 'warning',                    
                    title: '新增資料',
                    text:"新增失敗請洽資訊人員"
                })
                .then (function(){location.href="record.html"; });
            break;


        }
        });
},CheckLogin:function()
{
    CheckLogin();
},GetuploadFile:function()
{ let vm = this;
 $('#uploadFile').on( 'change', function(e){
     console.log(e.target.files[0])
     //vm.uploadFile = e.target.files[0].blob;
     let files = e.target.files[0];
     vm.uploadFile =  this.getArrayBuffer(files);
     
      console.log(`files:${vm.uploadFile}`)

    })
},getArrayBuffer:function (fileObj) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      // Get ArrayBuffer when FileReader on load
      reader.addEventListener("load", () => {
        resolve(reader.result);
      });
  
      // Get Error when FileReader on error
      reader.addEventListener("error", () => {
        reject("error occurred in getArrayBuffer");
      });
  
      // read the blob object as ArrayBuffer
      // if you nedd Base64, use reader.readAsDataURL
      reader.readAsArrayBuffer(fileObj);
    });
  },delCookie:function()
  {
    removeCookie();
  },GetVersion:function()
  {
    let vm = this;    
    axios.get(domainUrl+'management/version')
    .then(response => {
         console.log('查詢system version');
         console.log(response.data.data);
         vm.version = response.data.data;
  });
  }

}
,computed:{
}



});