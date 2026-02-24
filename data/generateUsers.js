import { faker } from '@faker-js/faker'

const generateUser = () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  return {
    firstName: firstName,
    lastName: lastName,
    email: `${firstName.charAt(0).toLowerCase()}${lastName.toLowerCase()}@${faker.internet.domainName()}`,
    username: `${firstName.charAt(0).toLowerCase()}${lastName.toLowerCase()}`,
    password: 'test'
  }
}

export const generateUsers = (length) => {
  const users = []

  for (let i = 0; i < length; i++) {
    users.push(generateUser())
  }
  return users
}
