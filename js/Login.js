let app = new Vue({
el:'#wrapper'
,data:{
 isShow:true,
 userid:"",
 pwd:""

}
,mounted:function(){
 this.KeyDownLogin();
}
, methods:{
    chkAccountFun:function(id,pwd) {
    let vm = this;
    let flag = this.chkInputValue()
    if(flag==false) return;
    var accountData={Userid: vm.userid,pwd: vm.pwd}
        
        axios.post(domainUrl + 'Account/Login', accountData)
            .then(response => {
                console.log(response)
                switch (response.data.code) {
                    case 200:
                        setCookie(1, response.data.data.permissionList, "plist");
                        setCookie(1,response.data.data.firstName,"name");
                        setCookie(1,response.data.data.deptName,"team");
    
                        
                        location.href = "index.html";
                        break;


                    case 400:                       
                     switch(response.data.desc)
                     {  
                        case "without parameter" :
                          Swal.fire({
                             icon: 'warning',
                          title:'帳號或密碼不能為空'
                             });
                         break;
                        case "unauthenticate user" :
                          Swal.fire({
                             icon: 'warning',
                          title:'請加入會員'
                             });
                         break;
                        case "pwd error over three times" :
                          Swal.fire({
                             icon: 'warning',
                          title:'密碼錯誤超過三次請聯絡資訊人員'
                             });
                         break;
                        case "error password" :
                           Swal.fire({
                             icon: 'warning',
                           title:'密碼錯誤'
                             });
                         break;
                     }
                    break;                   
                }
            }).catch(err => {
                console.log(err);
            });
    },chkInputValue:function()
    {
          let vm=this;

          if(vm.name==""|vm.pwd=="")
          {
            Swal.fire({
                icon: 'warning',
                title:'請輸入帳號密碼'
                });
                return false;
          }
           
    },KeyDownLogin:function()
    {
        document.onkeydown =  (e)=> {
            let keyValue = e.key;      
             if(keyValue=="Enter"){  
            this.chkAccountFun();
        }
    }

}
}
});


 