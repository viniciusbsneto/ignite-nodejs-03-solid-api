import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export const makCreateGymUseCase = () => {
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(prismaGymsRepository)

  return useCase
}
