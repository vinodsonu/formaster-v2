import {observable,action,computed, toJS} from 'mobx';
import { bindPromiseWithOnSuccess } from "@ib/mobx-promise";

import {
    API_INITIAL
 } from '@ib/api-constants'



class PaginationStore{
    
    @observable currentPageNumber
    @observable entitiesMap
    @observable getEntitiesApiStatus
    @observable getEntitiesApiError
    @observable entitiesList
    entitiesServiceMethod
    EntitieModel
    itemsPerPage
    totalEntities

    constructor(entitiesServiceMethod,EntitieModel,itemsPerPage){
        this.entitiesServiceMethod = entitiesServiceMethod;
        this.EntitieModel = EntitieModel;
        this.itemsPerPage = itemsPerPage;
        this.init();
    }

    @action.bound
    init(){
        this.currentPageNumber = 1;
        this.entitiesMap = new Map();
        this.entitiesList = [];
        this.getEntitiesApiStatus = API_INITIAL;
        this.getEntitiesApiError = null;
        this.totalEntities = 0;
    }

    @action.bound
    clearStore(){
        this.init();
    }

    @action.bound
    resetValues(){
        this.entitiesList = [];
        this.getEntitiesApiStatus = API_INITIAL;
        this.getEntitiesApiError = null;
    }

    @action.bound
    getEntities(){
        if(this.entitiesMap.has(this.currentPageNumber))
            return toJS(this.entitiesMap.get(this.currentPageNumber));
        return this.getNewEntities();
        
    }

    @action.bound
    setGetEntitiesApiStatus(status){
        this.getEntitiesApiStatus = status;
    }

    @action.bound
    setGetEntitiesApiError(error){
        this.setGetEntitiesApiError = error;
    }

    @action.bound
    setEntitiesResponse(response){
        this.totalEntities = response.total;
        response.result.forEach(each=>{
            this.entitiesList.push(new this.EntitieModel(each))
        })
        this.entitiesMap.set(this.currentPageNumber,this.entitiesList)

    }

    @action.bound
    getNewEntities(){
        this.resetValues();
        const getNewEntitiesPromise = this.entitiesServiceMethod(this.itemsPerPage,this.offset)
        return bindPromiseWithOnSuccess(getNewEntitiesPromise)
                .to(this.setGetEntitiesApiStatus,this.setEntitiesResponse)
                .catch(this.setGetEntitiesApiError)
    }

    @computed
    get currentEntities(){
        return this.entitiesMap.get(this.currentPageNumber);
    }

    @computed
    get offset(){
        return (this.currentPageNumber-1)*this.itemsPerPage;
    }

    @computed
    get totalPages(){
        return Math.ceil(this.totalEntities/this.itemsPerPage);
    }

    @action.bound
    getNextEntities(){
        this.currentPageNumber++;
        return this.getEntities();
    }

    @action.bound
    getPreviousEntities(){
        this.currentPageNumber--;
        return this.getEntities();
    }


}

export {PaginationStore}