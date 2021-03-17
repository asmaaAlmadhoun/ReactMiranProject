import BaseService from "../base-service/base.service";
import {HTTP_REQUEST} from "../http-service/httpService";

class PlanService extends BaseService {
    constructor() {
        super('plan/');
    }
    getPlanSchedule(id,day) {
        const url = this._endPoint + id +"/schedule?day=" + day;
        return HTTP_REQUEST.get({target:url});
    }
    getMacrosTrainee(id) {
        const url = this._endPoint + "assign-calories-macros-trainee/"+id+"/";
        return HTTP_REQUEST.get({target:url});
    }
    AddMealTrainee= async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "meal";
        return  HTTP_REQUEST.post({target:url , body : data});
    }
    UpdateMealTrainee= async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "meal";
        return  HTTP_REQUEST.put({target:url , body : data});
    }
    RemoveMealTrainee= async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "meal";
        return  HTTP_REQUEST._delete({target:url , body : data});
    }
    copyMealTrainee= async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "copy/meal/";
        return  HTTP_REQUEST.post({target:url , body : data});
    }
    addFoodTrainee= async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "meal";
        return  HTTP_REQUEST.put({target:url , body : data});
    }
    removeFoodTrainee= async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "delete/food";
        return  HTTP_REQUEST._delete({target:url , body : data});
    }
    AddExerciseTrainee= async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "add-exercise";
        return  HTTP_REQUEST.post({target:url , body : data});
    }
    DeleteExerciseTrainee= async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "delete/exercise";
        return  HTTP_REQUEST.put({target:url , body : data});
    }

}

export default PlanService;