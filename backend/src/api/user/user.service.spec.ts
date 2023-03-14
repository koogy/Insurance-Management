import { Repository } from 'typeorm';
import {User} from "./entities/user.entity";
import {UserService} from "./user.service";

describe('UserService', () => {
  const actual = jest.requireActual('typeorm');
  const data = [
    {
      id: 0,
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'admin@admin.com',
      password: 'adminPassWord',
      city: 'AdminCity',
      phoneNumber: '9999999999',
      address: 'adminAddress',
      postalCode: '99999',
      isEmailConfirmed: true,
      isAdmin: true
    },
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@mail.com',
      password: 'randomPassWord',
      city: 'Paris',
      phoneNumber: '0123456789',
      address: '55 rue de Rivoli',
      postalCode: '75001',
      isEmailConfirmed: false,
      isAdmin: false
    },
  ];

  const mailConfirmedData = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@mail.com',
      password: 'randomPassWord',
      city: 'Paris',
      phoneNumber: '0123456789',
      address: '55 rue de Rivoli',
      postalCode: '75001',
      isEmailConfirmed: true,
      isAdmin: false
    };

  const userRepository: Repository<User> = {
    ...actual,
    find: jest.fn().mockResolvedValue(data),
    findOneBy: jest.fn().mockResolvedValue(data[0]),
    save: jest.fn().mockResolvedValue(mailConfirmedData),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  const userService = new UserService(userRepository);

  it('should get all Users', async () => {
    const users = await userService.findAll();

    expect(users[0].id).toEqual(0);
    expect(users[0].firstName).toEqual(data[0].firstName);
    expect(users[0].lastName).toEqual(data[0].lastName);
    expect(users[0].email).toEqual(data[0].email);
    expect(users[0].password).toEqual(data[0].password);
    expect(users[0].city).toEqual(data[0].city);
    expect(users[0].phoneNumber).toEqual(data[0].phoneNumber);
    expect(users[0].address).toEqual(data[0].address);
    expect(users[0].postalCode).toEqual(data[0].postalCode);
    expect(users[0].isEmailConfirmed).toEqual(data[0].isEmailConfirmed);
    expect(users[0].isAdmin).toEqual(data[0].isAdmin);

    expect(users[1].id).toEqual(1);
    expect(users[1].address).toEqual(data[1].address);
  });

  it('should get a user by email', async () => {
    const user = await userService.getByEmail(data[0].email);

    expect(user.email).toEqual(data[0].email);
  });

  it('should mark mail verified to true', async () => {
    const users = await userService.findAll();

    expect(users[1].isEmailConfirmed).toEqual(false);
    const user = await userService.markEmailConfirmed(users[1].email);
    expect(user.isEmailConfirmed).toEqual(true);
  });

  it('should delete the user', async () => {
    let users = await userService.findAll();

    expect(users[1].id).toEqual(1);
    const user = await userService.delete(users[1].id);

    expect(user).toEqual(undefined);
  });

});
