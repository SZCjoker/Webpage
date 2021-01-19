 
 
let app = new Vue({
    el: '#app'
    , data: {  
        version:"",
        currentLocation: location.href,     
        sidebarItem: [],                    
        name: "",
        team: "",
        token: "",
        departs: [],
        issues:[],
        entranceType:[{ id:1,type:"pc"},{id:2,type:"全站"},{id:3,type:"体育"},{id:4,type:"H5"}],
        tableData: {
            type: 1,                    
            info: [],                   
            dateStrTxt: '',
            dateEndTxt: '',                
        },
        searchData:{
             recordNo:0,
             deptID:0, 
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
        this.TableFun();
        this.GetAccountInfo();
        this.GetPermission();
        this.GetDepartDropDown();
        this.GetIssueDropDown();
        this.leftmenu();
        this.leftSitebar();
        this.GetVersion();
    },     
    methods: {
        TableFun: function () 
        {
            let vm = this;
         // 依選擇對象、時間將資料組成table  searchData:{} 
         axios.get(domainUrl+'issue')
         //  axios.get('api/IGSSSearch.json')
         .then(response => {
              console.log('查詢後table');
              console.log(response.data.data);
              vm.tableData.info = response.data.data;
     
    
     //清空一下table
     $("#data").dataTable().fnClearTable();
     //還原初始化了的datatable
     $("#data").dataTable().fnDestroy();
     $("#data").dataTable({
         "paging":false,
         //"lengthMenu": [5, 10, 25, 50],  
        // "dom":"",   //指定表個內容的物件
        "language":{
          "url":"https://cdn.datatables.net/plug-ins/1.10.22/i18n/Chinese.json"
        },
         "ordering": true, 
         "order": [ 0, 'asc' ],
         "destroy": true,
         "searching": false,   
         "scrollCollapse":true,
         "scrollX":true,
         "scrollY":false,   
         "columns": [
             { "data": "issueNo",defaultContent:"无资料" }, 
             { "data": "createdate",defaultContent:"无资料" },          
             { "data": "createtime",defaultContent:"无资料" },   
             { "data": "userID",defaultContent:"无资料" },   
             { "data": "entranceType",defaultContent:"无资料" },         
             { "data": "issueCateID",defaultContent:"无资料" },         
             { "data": "issueDescription",defaultContent:"无资料" },  
             { "data": "attachmentUrl",defaultContent:"无资料" },
             { "data": "responseResult" ,defaultContent:"无资料"},  
             { "data": "processStatus" ,defaultContent:"无资料"},         
             { "data": "reason" ,defaultContent:"无资料"},
             { "data": "responseTime" ,defaultContent:"无资料"},         
             { "data": "eserviceID" ,defaultContent:"无资料"},          
             { "data": "deptID" ,defaultContent:"无资料"},          
             { "data": "recorder" ,defaultContent:"无资料"},
             {title:"操作",orderable:false,render:function(){return `<button type="button" class="btn btn-primary" style="white-space: nowrap;">编辑</button>`}}                                 
         ]
     });
    
      
     $("#data").dataTable().on( 'click', 'tr td:nth-last-child(1)', function (target) {
        console.log(target.currentTarget.parentNode.firstChild.innerHTML);
       // console.log( target.currentTarget.firstChild.innerHTML);
        let recordNo = target.currentTarget.parentNode.firstChild.innerHTML;
        location.href=`managementrecord.html?key=${recordNo}`;
     } );


     for (var j = 0; j <= vm.tableData.info.length - 1; ++j) {
         $("#data").dataTable().fnAddData(vm.tableData.info[j]);
     }

 })
 .catch(function (error) {
     console.log(error);
 })
    },
  changeSelectFunc: function(type)
  {
  let vm = this ;
  switch(type)
{
    case 0:
         vm.searchData.deptID = event.target.value; //target.options.selectedIndex; 取項次
        console.log(vm.searchData.deptID);
    break;
    case 1:
        vm.searchData.issueTypeID =event.target.value;
        console.log(vm.searchData.issueTypeID);
    break;
    case 2:
        vm.searchData.entranceType =event.target.value;
        console.log(vm.searchData.entranceType);
    break;
}
  },
    Search: function()
   {
    let vm = this;
   
    if(!vm.searchData.beforeEdit==' ')
       this.timeEdit(vm.searchData.beforeEdit);
      const condition = Object.entries(Object.assign({},vm.searchData)).map(([key,value])=>   value==null |value ==""  ? null : `${key}=${value}`).join('&');
      
    axios.get(domainUrl+`issue/query?${condition}`)
    .then(response => {
         console.log('查詢後table');
         console.log(response.data.data);
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
    "order": [ 0, 'asc' ],
    "destroy": true,
    "searching": false,   // 搜索功能
    "scrollCollapse":true,
    "scrollX":true,
    "scrollY":false,   
    "columns": [
      { "data": "recordNo",defaultContent:"无资料" }, 
      { "data": "createdate",defaultContent:"无资料" },          
      { "data": "createtime",defaultContent:"无资料" }, 
      { "data": "calldate",defaultContent:"无资料" },          
      { "data": "calltime",defaultContent:"无资料" },            
      { "data": "udate",defaultContent:"无资料" },          
      { "data": "utime",defaultContent:"无资料" },          
      { "data": "userID",defaultContent:"无资料" },   
      { "data": "device",defaultContent:"无资料" },         
      { "data": "entranceType",defaultContent:"无资料" },         
      { "data": "issueTypeID",defaultContent:"无资料" },         
      { "data": "issueDescription",defaultContent:"无资料" },  
      { "data": "attachmentUrl",defaultContent:"无资料" },
      { "data": "TestResult" ,defaultContent:"无资料"},
      { "data": "answerStatus" ,defaultContent:"无资料"},                   
      { "data": "processStatus" ,defaultContent:"无资料"},         
      { "data": "reason" ,defaultContent:"无资料"},
      { "data": "solve" ,defaultContent:"无资料"},
      { "data": "content" ,defaultContent:"无资料"},         
      { "data": "responseTime" ,defaultContent:"无资料"},         
      { "data": "responseResult" ,defaultContent:"无资料"},  
      { "data": "eserviceID" ,defaultContent:"无资料"},          
      { "data": "recorder" ,defaultContent:"无资料"},
      {title:"操作",orderable:false,render:function(){return `<button type="button" class="btn btn-primary" style="white-space: nowrap;">编辑</button>`}}                                 
    ]
});

$("#data").dataTable().on( 'click', 'tr td:nth-last-child(1)', function (target) {
  console.log(target.currentTarget.parentNode.firstChild.innerHTML);
 // console.log( target.currentTarget.firstChild.innerHTML);
  let recordNo = target.currentTarget.parentNode.firstChild.innerHTML;
  location.href=`managementrecord.html?key=${recordNo}`;
} );

for (var j = 0; j <= vm.tableData.info.length - 1; ++j) {
    $("#data").dataTable().fnAddData(vm.tableData.info[j]);
}

})
.catch(function (error) {
console.log(error);
}) 
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
},leftSitebar:function()
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
         console.log('部門');
         console.log(response.data.data);         
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
         console.log('依照部門取得問題種類');
         console.log(response.data.data);             
         vm.issues = response.data.data;
        });
}
,timeEdit:function(time)
{  
  
    let vm = this ; 
    if(!time=='')  
    var timeSplit = time.split(':');
    
    let hours="";
    let minutes="";
    let meridian="";

    
  hours = timeSplit[0];
  minutes = timeSplit[1];
  if (hours > 12) {
    meridian = 'PM';
    hours -= 12;

  } else if (hours < 12) {
    meridian = 'AM';
    if (hours == 0) {
      hours = 12;
    }
  } else {
    meridian = 'PM';
  }
  
  vm.searchData.responseTime =`${hours}:${minutes} ${meridian}`;
 
},
Ten2Ten:function()
{
    let vm = this;    
    axios.get(domainUrl+'issue/ten2ten')
    .then(response => {
         console.log('查詢後table');
         console.log(response.data.data);
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
    "order": [ 0, 'asc' ],
    "destroy": true,
    "searching": false,   // 搜索功能
    "scrollCollapse":true,
    "scrollX":true,
    "scrollY":false,   
    "columns": [
      { "data": "recordNo",defaultContent:"无资料" }, 
      { "data": "createdate",defaultContent:"无资料" },          
      { "data": "createtime",defaultContent:"无资料" }, 
      { "data": "calldate",defaultContent:"无资料" },          
      { "data": "calltime",defaultContent:"无资料" },            
      { "data": "udate",defaultContent:"无资料" },          
      { "data": "utime",defaultContent:"无资料" },          
      { "data": "userID",defaultContent:"无资料" },   
      { "data": "device",defaultContent:"无资料" },         
      { "data": "entranceType",defaultContent:"无资料" },         
      { "data": "issueTypeID",defaultContent:"无资料" },         
      { "data": "issueDescription",defaultContent:"无资料" },  
      { "data": "attachmentUrl",defaultContent:"无资料" },
      { "data": "TestResult" ,defaultContent:"无资料"},
      { "data": "answerStatus" ,defaultContent:"无资料"},                   
      { "data": "processStatus" ,defaultContent:"无资料"},         
      { "data": "reason" ,defaultContent:"无资料"},
      { "data": "solve" ,defaultContent:"无资料"},
      { "data": "content" ,defaultContent:"无资料"},         
      { "data": "responseTime" ,defaultContent:"无资料"},         
      { "data": "responseResult" ,defaultContent:"无资料"},  
      { "data": "eserviceID" ,defaultContent:"无资料"},          
      { "data": "recorder" ,defaultContent:"无资料"},
      {title:"操作",orderable:false,render:function(){return `<button type="button" class="btn btn-primary" style="white-space: nowrap;">编辑</button>`}}                                 
    ]
});
$("#data").dataTable().on( 'click', 'tr td:nth-last-child(1)', function (target) {
  console.log(target.currentTarget.parentNode.firstChild.innerHTML);
 // console.log( target.currentTarget.firstChild.innerHTML);
  let recordNo = target.currentTarget.parentNode.firstChild.innerHTML;
  location.href=`managementrecord.html?key=${recordNo}`;
} );

for (var j = 0; j <= vm.tableData.info.length - 1; ++j) {
    $("#data").dataTable().fnAddData(vm.tableData.info[j]);
}
})
.catch(function (error) {
console.log(error);
})
}
,GetExcel:function()  //todo 
{
  let vm = this;
   
  if(!vm.searchData.beforeEdit==' ')
     this.timeEdit(vm.searchData.beforeEdit);
    const condition = Object.entries(Object.assign({},vm.searchData)).map(([key,value])=>   value==null |value ==""  ? null : `${key}=${value}`).join('&');
    
  axios.get(domainUrl+`issue/excel?${condition}`)
  .then(response => {
       console.log('excel 吃查詢條件');




})
.catch(function (error) {
console.log(error);
})}

,CheckLogin:function()
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
}




}
,computed:{
}



});