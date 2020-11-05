import BaseService from "../base-service/base.service";
import {HTTP_REQUEST} from "../http-service/httpService";

class TemplateService extends BaseService{
    constructor() {
        super('template');
    }
    get getAll() {
        const url = this._endPoint;
        return HTTP_REQUEST.get({target:url});
    }
    createTemplate({name}) {
        const url = this._endPoint  + "/";
        return HTTP_REQUEST.post({target:url , body : {name}})
    }
    updateTemplate(id , data) {
        if(!id || !data)
            return;
        const url = this._endPoint + "/" + id;
        return HTTP_REQUEST.put({target:url, body:data});
    }
    deleteTemplate(id) {
        if(!id)
            return;
        const url = this._endPoint+"/" + id;
        return HTTP_REQUEST._delete({target:url});
    }
}

export  default  TemplateService;