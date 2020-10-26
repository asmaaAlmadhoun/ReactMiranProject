import HTTP_REQUEST from "../http-service/httpService";
import BaseService from "../base-service/base.service";
class AccountService extends BaseService {
    constructor() {
        super("user");
    }

    login = (data) => {
        if(!data)
            return ;
        const url = "v1/" +  this._endPoint + "/login";
        HTTP_REQUEST.post(url , data).then(response => {
            // TODO: Handle Login;
            console.log(response);
        },error => {
            // TODO: Handle Error;
            console.log(error);
        })
    }

    register = (data) => {
        if(!data)
            return ;

        const url = this._endPoint  + "/register/trainer" ;
        HTTP_REQUEST.post(url , data).then(response => {
            // TODO: Handle Login;
            console.log(response);
        } , error => {
            // TODO: Handle Error;
            console.log(error);
        })
    }


    forgetPassword = data => {
        if(!data) return ;
        const url =  "v1/"+ this._endPoint + "/request-reset-password/"
        HTTP_REQUEST.post(url, data).then(response => {
            // TODO: Handle Login;
            console.log(response);
        }, error => {
            // TODO: Handle Error;
            console.log(error);
        })
    }
}


export default AccountService;