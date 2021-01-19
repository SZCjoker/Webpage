  
let app = new Vue({
    el: '#app'
    , data: { 
        version:"",
        currentLocation: location.href,      
        sidebarItem: [], 
        name: "",
        team: "",
        departs: [],
        entranceType:[{ id:1,type:"pc"},{id:2,type:"全站"},{id:3,type:"體育"},{id:4,type:"H5"}], 
        solve:[{id:1,type:"是"},{id:2,type:"進行中"},{id:3,type:"否"}],
        anwserStatus:[{id:1,type:"已聯絡"},{id:2,type:"聯絡失敗"},{id:3,type:"否"}],   

        issuedata:{
             issueNo:0,
             deptID:"", 
             createDate:"",
             createTime:"",
             callDate:"",
             callTime:"",
             uDate:"",
             uTime:"",
             askingDate:"",
             askingTime:"",
             responseTime:"",
             purpose:"",
             userID:"",
             eserviceID:"",
             device:"",
             entranceType:0,            
             issueDescription:"",
             reason:"",
             solve:0,
             answerStatus:0,
             processStatus:0,
             suggestion:"",
             responseResult:"",
             testResult:"",
             content:"",
             recorder:""
             
        }  
    },mounted: function () {
        //一開始動作       
        this.CheckLogin();
        this.GetAccountInfo();
        this.GetPermission();      
        this.leftmenu();
        this.leftSitebar();
        this.GetVersion();
        this.GetEditData();
    },     
    methods: {    
  changeSelectFunc: function(type)
  {
  let vm = this ;
  switch(type)
{
    case 0:
         vm.issuedata.entranceType = event.target.value; //target.options.selectedIndex; 取項次
        console.log(vm.issuedata.entranceType);
    break;

    case 1:
         vm.issuedata.anwserStatus = event.target.value; //target.options.selectedIndex; 取項次
        console.log(vm.issuedata.anwserStatus);
    break;

    case 2:
         vm.issuedata.solve = event.target.value; //target.options.selectedIndex; 取項次
        console.log(vm.issuedata.solve);
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
         console.log('權限');
         console.log(response.data.data);         
         vm.sidebarItem = response.data.data;
        });
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
},CheckLogin:function()
{
    CheckLogin();
},AddedRecord:function()
{
    let vm = this ;
    axios.post(domainUrl+`record`,vm.issuedata)
    .then(response => {
         console.log('新增資料');
         console.log(response.data.data);             
        
         
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
        
         vm.issuedata.issueNo = response.data.data.issueNo;
         vm.issuedata.entranceType = response.data.data.entranceType;
         vm.issuedata.issueDescription = response.data.data.issueDescription;
         vm.issuedata.userID = response.data.data.userID;
         vm.issuedata.createDate =  DateConverter(response.data.data.createDate);
         vm.issuedata.callDate = DateConverter(response.data.data.callDate);
         vm.issuedata.callTime = DateConverter(response.data.data.callTime);
         vm.issuedata.purpose = response.data.data.purpose;
         vm.issuedata.askingDate = DateConverter(response.data.data.askingDate);
         vm.issuedata.askingtime = DateConverter(response.data.data.askingTime);
         vm.issuedata.answerStatus = response.data.data.answerStatus;
         vm.issuedata.content = response.data.data.content;        
         vm.issuedata.issueDescription = response.data.issueDescription;
         vm.issuedata.solve = response.data.data.solve;
         vm.issuedata.eserviceID = response.data.data.eserviceID;    
         
         
        });
else{
    return;
}

},Edit:function()
{   let vm = this ;
    axios.put(domainUrl+`record`,vm.issuedata)
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