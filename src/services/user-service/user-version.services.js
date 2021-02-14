import BaseService from "../base-service/base.service";
import {HTTP_REQUEST} from "../http-service/httpService";

class UserVersionServices extends BaseService {
    constructor() {
        super('v1/user');
    }

    get note () {
        const url = this._endPoint + "/trainer-notes-list/19807/";
        return HTTP_REQUEST.get({target:url});
    }
    addNote = async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "/user/trainer-notes/";
        return  HTTP_REQUEST.post({target:url , body : data});
    }
}

export default UserVersionServices;