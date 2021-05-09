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

    traineeWeightHistory (id) {
        const url = this._endPoint + "/weight/"+id+"/for_trainer/?page=1&page_size=20";
        return HTTP_REQUEST.get({target:url});
    }
    traineeWeightHistoryChart (id, period) {
        const url = this._endPoint + "/weight/"+id+"/for_trainer/?period="+period;
        return HTTP_REQUEST.get({target:url});
    }
    userBodyMeasurementsHistoryChart (id, period) {
        const url = this._endPoint + "/user-measurements/"+id+"/for_trainer/?period="+period + "&name=chest";
        return HTTP_REQUEST.get({target:url});
    }
    userBodyMeasurementsHistory (id,measureType) {
        const url = this._endPoint + "/user-measurements/"+id+"/for_trainer/?name="+measureType+"&page=1&page_size=20";
        return HTTP_REQUEST.get({target:url});
    }


    waterMeasurementsHistoryChart (id, period) {
        const url = this._endPoint + "/water-consumed/"+id+"/for_trainer/?period="+period + "&name=chest";
        return HTTP_REQUEST.get({target:url});
    }
    waterMeasurementsHistory (id) {
        const url = this._endPoint + "/water-consumed/"+id+"/for_trainer/?page=1&page_size=20";
        return HTTP_REQUEST.get({target:url});
    }
    userPicturesHistory (id) {
        const url = this._endPoint + "/user-picture/"+id+"/for_trainer/?page=1&page_size=20";
        return HTTP_REQUEST.get({target:url});
    }
    extraProgressData (id) {
        const url = this._endPoint + "/missing-data-for-trainer-progress?trainee_id="+id+"/for_trainer/?page=1&page_size=20";
        return HTTP_REQUEST.get({target:url});
    }
}

export default UserVersionServices;