import { compare } from 'bcryptjs'
import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { User } from '@prisma/client'

interface AuthenticateUserCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doPasswordsMatch = await compare(password, user.password_hash)

    if (!doPasswordsMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
