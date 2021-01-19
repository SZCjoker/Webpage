  
let app = new Vue({
  el: '#app'
  , data: {  
      version:"",
      currentLocation: location.href,    
      sidebarItem: [],                   
      name: "",
      team: "",
      token: "",      
      departs:[],
      entranceType:[{ id:1,type:"pc"},{id:2,type:"全站"},{id:3,type:"體育"},{id:4,type:"H5"}],
      issues:[],
      tableData: {
          type: 1,                     //資料表類別
          info: []      
      },
      searchData:{
           recordNo:0,
           deptID:"", 
           beginDate:"",
           endDate:"",
           beforeEdit:"",
           responseTime:"",
           userID:"",
           device:"",
           entranceType:0,
           issueTypeID:0,
           processStatus:0,
           eserviceID:"",
           recorder:"",
           pageOffset:0,
           pageSize:0 
      }  
  },mounted: function () {
      //一開始動作
      this.CheckLogin();
      this.Ten2Ten();
      this.GetAccountInfo();
      this.GetPermission();
      this.leftmenu();
      this.leftSitebar();
      this.GetVersion();
  },     
  methods: {
    
GetAccountInfo:function ()
 {  
    let vm = this;
    vm.name = getCookie("name");
    vm.team = getCookie("team");
   if(vm.name=="" && vm.team=="" )
     location.href="login.html";


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
       console.log('權限');
       console.log(response.data.data);         
       vm.sidebarItem = response.data.data;
      });
 },
 
   ClearFun:function()
   { 
     let vm = this;
     vm.searchData.beginDate="";
     vm.searchData.endDate="";
     vm.searchData.beforeEdit="";
     vm.searchData.userID="";
     vm.searchData.recordNo=0;
     vm.searchData.recorder="";
     vm.searchData.device="",
     vm.searchData.deptID=0,
     vm.searchData.entranceType=0,
     vm.searchData.issueTypeID=0,
     vm.searchData.processStatus=0,
     vm.searchData.eserviceID="",
     vm.searchData.recorder="",
     vm.searchData.pageOffset=0,
     vm.searchData.pageSize=0
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
Ten2Ten:function()
{
  let vm = this;    
  axios.get(domainUrl+'issue/ten2ten')
  .then(response => {
      // console.log('查詢後table');
       //console.log(response.data.data);
       vm.tableData.info = response.data.data;
//清空一下table
$("#data").dataTable().fnClearTable();
//還原初始化了的datatable
$("#data").dataTable().fnDestroy();
$("#data").dataTable({
  "paging":false,
  //"lengthMenu": [5, 10, 25, 50],   // 選單值設定
 // "dom":"",   //指定表個內容的物件
 "language":{
   "url":"https://cdn.datatables.net/plug-ins/1.10.22/i18n/Chinese.json"
 },
  "ordering": true, 
  "order": [ 2, 'asc' ],
  "destroy": true,
  "searching": false,   // 搜索功能
  "scrollCollapse":true,
  "scrollX":true,
  "scrollY":false,   
  "columns": [
      { "data": "issueNo",defaultContent:"无资料" },  
      { "data": "processStatus" ,defaultContent:"无资料"},
      { "data": "createdate",defaultContent:"无资料" },    
      { "data": "issueDescription",defaultContent:"无资料" },
      { "data": "entranceType",defaultContent:"无资料" },         
      { "data": "createTime" ,defaultContent:"无资料"},  
      { "data": "userID",defaultContent:"无资料" },   
      { "data": "suggestion" ,defaultContent:"无资料"},  
      {title:"操作",orderable:false,render:function(){return `<button type="button" class="btn btn-primary" style="white-space: nowrap;">编辑</button>`}}                                                                
  ]
});


$("#data").dataTable().on( 'click', 'tr td:nth-last-child(1)', function (target) {
  console.log(target.currentTarget.parentNode.firstChild.innerHTML);
 // console.log( target.currentTarget.firstChild.innerHTML);
  let issueNo = target.currentTarget.parentNode.firstChild.innerHTML;
  location.href=`ManagementTen2ten.html?key=${issueNo}`;
} );

for (var j = 0; j <= vm.tableData.info.length - 1; ++j) {
  $("#data").dataTable().fnAddData(vm.tableData.info[j]);
}
})
.catch(function (error) {
console.log(error);
})
},CheckLogin:function()
{
  CheckLogin();
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
},GetEditData:function()
{   
    let vm = this;
    const url = new URL(window.location.href)
    if(url!="")
    var id = url.searchParams.get('key');
    
     if(!id == ""|!id==null|!id == 0)
    
    axios.get(domainUrl+`issue/issueno/${id}`)
    .then(response => {
         console.log('取得編輯資料');
         console.log(response.data.data);             
        
         vm.recordData.cDate = response.data.data.cDate;
         vm.recordData.deptID = response.data.data.deptID;
         vm.recordData.userID = response.data.data.userID;
         vm.recordData.recordNo = response.data.data.recordNo;
         vm.recordData.recorder = response.data.data.recorder;
         vm.recordData.device = response.data.data.device,
         vm.recordData.entranceType = response.data.data.entranceType,
         vm.recordData.issueTypeID = response.data.data.issueTypeID,
         vm.recordData.issueDescription = response.data.data.issueDescription,
         vm.recordData.processStatus = response.data.data.processStatus,
         vm.recordData.eserviceID = response.data.data.eserviceID,         
         vm.recordData.responseResult = response.data.data.responseResult,
         vm.recordData.reason = response.data.data.reason
         vm.recordData.content= response.data.data.content,
         vm.recordData.testResult= response.data.data.testResult
        });
else{
    return;
}

},Edit:function()
{   let vm = this ;
    axios.put(domainUrl+`issue`,vm.recordData)
    .then(response => {
        
        switch(response.data.code)
        {
            case 200:
                Swal.fire({
                    icon: 'info',                    
                    title: '編輯資料',
                    text:"確認編輯"
                })
                .then (function(){location.href="index.html"; });
            break;

            case 400:
                Swal.fire({
                    icon: 'warning',                    
                    title: '新增資料',
                    text:"編輯失敗請洽資訊人員"
                })
                .then (function(){location.href="index.html"; });
            break;


        }         
        });

},




}
,computed:{


}



});