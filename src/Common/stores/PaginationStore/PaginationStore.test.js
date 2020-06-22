import { API_INITIAL,API_SUCCESS,API_FAILED, API_FETCHING } from "@ib/api-constants"

import PaginationStore from '../PaginationStore';
import FormApi from '../../../User/services/FormService/FormApi';
import UserFormModel from '../../../User/stores/Models/FormModel';
import getUserFormResponse from '../../../User/fixtures/getFormResponse.json';


describe("test PaginationStore",()=>{
    let formApi
    let paginationStore
    beforeEach(()=>{
        formApi = new FormApi();
        paginationStore = new PaginationStore(formApi.getForms,UserFormModel,3);
    })

    it("test paginationStore init",()=>{
        expect(paginationStore.currentPageNumber).toBe(1)
        expect(paginationStore.entitiesMap).toMatchObject({})
        expect(paginationStore.entitiesList.length).toBe(0)
        expect(paginationStore.getEntitiesApiStatus).toBe(API_INITIAL)
        expect(paginationStore.getEntitiesApiError).toBe(null)
        expect(paginationStore.totalEntities).toBe(0)
        
    })
    it("test paginationStore clearStore",()=>{
        paginationStore.clearStore();
        expect(paginationStore.currentPageNumber).toBe(1)
        expect(paginationStore.entitiesMap).toMatchObject({})
        expect(paginationStore.entitiesList.length).toBe(0)
        expect(paginationStore.getEntitiesApiStatus).toBe(API_INITIAL)
        expect(paginationStore.getEntitiesApiError).toBe(null)
        expect(paginationStore.totalEntities).toBe(0)
        
    })

    it("test resetValues",()=>{
        paginationStore.resetValues();
        expect(paginationStore.entitiesList.length).toBe(0)
        expect(paginationStore.getEntitiesApiStatus).toBe(API_INITIAL)
        expect(paginationStore.getEntitiesApiError).toBe(null)
    })

    it("getNewEntities loading status",()=>{
        const mockPromise = new Promise(()=>{})
        const getNewEntitiesAPI = jest.fn();
        getNewEntitiesAPI.mockReturnValue(mockPromise)
        formApi.getForms = getNewEntitiesAPI
        paginationStore.getNewEntities()
        expect(paginationStore.getEntitiesApiStatus).toBe(API_FETCHING)
    })

    it("getNewEntities success status",async()=>{
        const mockPromise = new Promise((resolve)=>{resolve(getUserFormResponse[0])})
        const getNewEntitiesAPI = jest.fn();
        getNewEntitiesAPI.mockReturnValue(mockPromise)
        paginationStore.entitiesServiceMethod = getNewEntitiesAPI
        await paginationStore.getNewEntities()
        expect(paginationStore.getEntitiesApiStatus).toBe(API_SUCCESS)
    })

    it("getNewEntities failure status",async()=>{
        const mockPromise = new Promise((resolve,reject)=>{reject(new Error("error"))})
        const getNewEntitiesAPI = jest.fn();
        getNewEntitiesAPI.mockReturnValue(mockPromise)
        paginationStore.entitiesServiceMethod = getNewEntitiesAPI
        await paginationStore.getNewEntities()
        expect(paginationStore.getEntitiesApiStatus).toBe(API_FAILED)
    })

    it("test getEntities",async()=>{
        const mockPromise = new Promise((resolve)=>{resolve(getUserFormResponse[0])})
        const getNewEntitiesAPI = jest.fn();
        getNewEntitiesAPI.mockReturnValue(mockPromise)
        paginationStore.entitiesServiceMethod = getNewEntitiesAPI
        await paginationStore.getNewEntities()
        expect(paginationStore.getEntities()[0].formId).toBe("1")
        expect(paginationStore.getEntities().length).toBe(3)
        
    })

    it("test currentEntities",async()=>{
        const mockPromise = new Promise((resolve)=>{resolve(getUserFormResponse[0])})
        const getNewEntitiesAPI = jest.fn();
        getNewEntitiesAPI.mockReturnValue(mockPromise)
        paginationStore.entitiesServiceMethod = getNewEntitiesAPI
        await paginationStore.getNewEntities()
        const entities = paginationStore.currentEntities
        expect(entities[0].formId).toBe("1")
        expect(entities.length).toBe(3)
    })

    it("test offset ",()=>{
        expect(paginationStore.offset).toBe(0)
    })

    it("test totalPages",async()=>{
        const mockPromise = new Promise((resolve)=>{resolve(getUserFormResponse[0])})
        const getNewEntitiesAPI = jest.fn();
        getNewEntitiesAPI.mockReturnValue(mockPromise)
        paginationStore.entitiesServiceMethod = getNewEntitiesAPI
        await paginationStore.getNewEntities()
        expect(paginationStore.totalPages).toBe(2)
    })

    it("test getNextEntities",async()=>{
        const mockPromise = new Promise((resolve)=>{resolve(getUserFormResponse[1])})
        const getNewEntitiesAPI = jest.fn();
        getNewEntitiesAPI.mockReturnValue(mockPromise)
        paginationStore.entitiesServiceMethod = getNewEntitiesAPI
        await paginationStore.getNewEntities()
        await paginationStore.getNextEntities();
        const entities = paginationStore.currentEntities
        expect(entities[0].formId).toBe("4")
        expect(entities.length).toBe(3)
    })

    it("test getPreviousEntities",async()=>{
        let count = 0;
        const mockPromise = new Promise((resolve)=>{
            if(count)
                resolve(getUserFormResponse[1])
            else
                resolve(getUserFormResponse[0])
        })
        const getNewEntitiesAPI = jest.fn();
        getNewEntitiesAPI.mockReturnValue(mockPromise)
        paginationStore.entitiesServiceMethod = getNewEntitiesAPI
        await paginationStore.getNewEntities()
        count+=1;
        await paginationStore.getNextEntities();
        expect(paginationStore.entitiesMap.has(paginationStore.currentPageNumber-1)).toBe(true)
        await paginationStore.getPreviousEntities()
        const entities = paginationStore.currentEntities
        expect(entities[0].formId).toBe("1")
        expect(entities.length).toBe(3)
    })
})