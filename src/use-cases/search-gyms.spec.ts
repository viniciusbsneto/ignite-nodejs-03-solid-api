import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -23.6750786,
      longitude: -46.670534,
    })

    await gymsRepository.create({
      title: 'Smart Fit - Água Branca',
      description: null,
      phone: null,
      latitude: -23.5301603,
      longitude: -46.6874166,
    })

    await gymsRepository.create({
      title: 'Smart Fit - Perdizes',
      description: null,
      phone: null,
      latitude: -23.5347291,
      longitude: -46.6787727,
    })

    const { gyms } = await sut.execute({
      query: 'Smart Fit',
      page: 1,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Smart Fit - Água Branca',
      }),
      expect.objectContaining({
        title: 'Smart Fit - Perdizes',
      }),
    ])
  })

  it('should be able to fetch paginated user check-ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.535514,
        longitude: -46.679069,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym 21',
      }),
      expect.objectContaining({
        title: 'JavaScript Gym 22',
      }),
    ])
  })
})
