import BaseService from "../base-service/base.service";
import {HTTP_REQUEST} from "../http-service/httpService";

class UserVersionServices extends BaseService {
    constructor() {
        super('v1/user');
    }

    note (id) {
        const url = this._endPoint + "/trainer-notes-list/" + id;
        return HTTP_REQUEST.get({target:url});
    }
    addNote = async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "/trainer-notes/";
        return  HTTP_REQUEST.post({target:url , body : data});
    }
    editNote = async (data,id) => {
        if(!data)
            return ;
        const url =   this._endPoint + "/trainer-notes/" + id +'/';
        return  HTTP_REQUEST.patch({target:url , body : data});
    }
    deleteNote = async (id) => {
        if(!id)
            return ;
        const url =   this._endPoint + "/trainer-notes/" + id;
        return  HTTP_REQUEST._delete({target:url });
    }
}

export default UserVersionServices;