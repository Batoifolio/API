// // import { IFamiliaRepository } from '../interfaces/familia.repository'
// import { FamiliaModel } from '../models/familia.model'

// export class FamiliaService {
//   // constructor (private readonly familiaRepository: IFamiliaRepository) { }

//   async getAll(): Promise<FamiliaModel[]> {
//     return await this.familiaRepository.findAll()
//   }

//   async getById(id: number): Promise<FamiliaModel | null> {
//     return await this.familiaRepository.findById(id)
//   }

//   async register(data: Partial<FamiliaModel>): Promise<FamiliaModel> {
//     return await this.familiaRepository.create(data)
//   }

//   async update(id: number, data: Partial<FamiliaModel>): Promise<FamiliaModel> {
//     return await this.familiaRepository.update(id, data)
//   }

//   async remove(id: number): Promise<void> {
//     return await this.familiaRepository.delete(id)
//   }
// }
