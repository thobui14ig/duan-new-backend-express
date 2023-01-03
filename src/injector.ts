// import { ResourcesService } from "./modules/resources/resources.service";
// import { UserService } from "./modules/user/user-service";

// class Injector{
//     private _container = new Map()

//     constructor(private _providers: any[] = []){
//         this._providers.forEach(service => this._container.set(service, new service()))
//     }

//     get(serviceKey: any){
//         const serviceInstance = this._container.get(serviceKey)
//         if(!serviceInstance){
//             throw Error('No provider!')
//         }

//         return serviceInstance;
//     }
// }

// const provider = new Injector([UserService, ResourcesService])
// export const inject = (service: any) => provider.get(service)