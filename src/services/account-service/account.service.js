import {HTTP_REQUEST} from "../http-service/httpService";
import BaseService from "../base-service/base.service";
class AccountService extends BaseService {
    constructor() {
        super("user");
    }

    login = async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "/trainer-login";
       return  HTTP_REQUEST.post({target:url , body : data});
    }

    register = (data) => {
        if(!data)
            return ;

        const url = this._endPoint  + "/register/trainer" ;
        HTTP_REQUEST.post({target:url , body : data}).then(response => {
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
        HTTP_REQUEST.post({target:url , body : data}).then(response => {
            // TODO: Handle Login;
            console.log(response);
        }, error => {
            // TODO: Handle Error;
            console.log(error);
        })
    }

    /*
    * <summary> add token in local storage </summary>
    * <params> take token as string , param is mandatory </params>
    * <returns> true : if success , false : if token undefined </returns>
    */
    becomeAuthorize = async (token ) => {
        if(!token)
        {
            return false;
        }
        return new Promise(((resolve) =>  {
            localStorage.setItem('miran-token' , token);
            resolve();
        }));


    }

    /*
    * <summary> purpose of this func to check if current user is authorize or not </summary>
    * <returns> true : if authorize  , false : if not authorize </returns>
    */
    isAuthorize = () => {
       const token =  localStorage.getItem('miran-token');
       return !!token;
    }
}


export default AccountService;