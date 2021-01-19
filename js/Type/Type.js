

function LoginRequest()
{
    LoginRequest.prototype.userid="";
    LoginRequest.prototype.pwd="";
}
var permissions = new Array();
function LoginResponse()
{
    LoginResponse.prototype.firstname="";
    LoginResponse.prototype.firstCname="";
    LoginResponse.prototype.deptname="";
    LoginResponse.prototype.deptid="";
    LoginResponse.prototype.permission="";
  
}

function Permission()
{
    Permission.prototype.permissionName="";
    Permission.prototype.permissionPath="";
    Permission.prototype.code="";
}