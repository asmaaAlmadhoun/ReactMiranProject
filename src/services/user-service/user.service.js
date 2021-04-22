import BaseService from "../base-service/base.service";
import {HTTP_REQUEST} from "../http-service/httpService";

class UserService extends BaseService {
    constructor() {
        super('user');
    }
    get imageDefaultPath () {
        return "https://miranapp.com/media/";
    }
    get profile () {
        const url = this._endPoint + "/trainer-profile";
        return HTTP_REQUEST.get({target:url});
    }
    updateProfile = async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "/trainer-profile";
        return  HTTP_REQUEST.put({target:url , body : data});
    }

    get faq () {
        const url = this._endPoint + "/faq";
        return HTTP_REQUEST.get({target:url});
    }
    addFaq = async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "/faq";
        return  HTTP_REQUEST.post({target:url , body : data});
    }

    get traineeList () {
        const url = this._endPoint + "/trainer/students";
        return HTTP_REQUEST.get({target:url});
    }


    traineeWeightHistory (id) {
        const url = this._endPoint + "/weight/"+id+"/for_trainer/?page=1&page_size=20";
        return HTTP_REQUEST.get({target:url});
    }
    traineeWeightHistoryChart (id, period) {
        const url = this._endPoint + "/weight/"+id+"/for_trainer/?period="+period;
        return HTTP_REQUEST.get({target:url});
    }
    UserBodyMeasurementsHistoryChart (id, period) {
        const url = this._endPoint + "/user-measurements/"+id+"/for_trainer/?period="+period + "&name=chest";
        return HTTP_REQUEST.get({target:url});
    }
    UserBodyMeasurementsHistory (id) {
        const url = this._endPoint + "/user-measurements/"+id+"/for_trainer/?name=thigh&page=1&page_size=20";
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


}

export default UserService;