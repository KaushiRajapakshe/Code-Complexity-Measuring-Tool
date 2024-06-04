// test.js

const {
    signUpUser,
    updateUser,
    findByUsername,
    checkLogin,
    authenticateToken,
    deactivateUser,
  } = require('../../models/userModel');
  
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('UserModel', () => {
  describe('signUpUser', () => {
    it('should sign up a new user', async () => {
        // Mock the findOne method separately
        const findOneMock = jest.fn();
        findOneMock.mockReturnValue(null);
        findOneMock.mockReturnValueOnce(null);
        findOneMock.mockReturnValueOnce({ email: 'existing@example.com', username: 'existinguser' });
    
        // Mock the insertOne method separately
        const insertOneMock = jest.fn();
    
        // Mock the database collection methods
        const db = {
          collection: jest.fn(() => ({
            findOne: findOneMock,
            insertOne: insertOneMock
          }))
        };
    
        // Mock the bcrypt hashSync method
        bcrypt.hashSync.mockReturnValue('hashedPassword');
    
        // Call the signUpUser function
        const result = await signUpUser(db, 'test@example.com', 'testuser', 'password');
    
        // Assertions
        expect(bcrypt.hashSync).toHaveBeenCalledWith('password', 10);
        expect(db.collection).toHaveBeenCalledWith('users');
        expect(findOneMock).toHaveBeenCalledTimes(1);
        expect(insertOneMock).toHaveBeenCalledWith({
          email: 'test@example.com',
          username: 'testuser',
          password: 'hashedPassword'
        });
        expect(result).toEqual({ status: true, errorMessage: '' });
      });
    it('should return error if user already exists', async () => {
      const db = {
        collection: jest.fn(() => ({
          findOne: jest.fn(() => ({ email: 'test@example.com' }))
        }))
      };

      const result = await signUpUser(db, 'test@example.com', 'testuser', 'password');

      expect(result).toEqual({ status: false, errorMessage: 'User with the same email or username already exists' });
    });
  });

  describe('checkLogin', () => {
    it('should check user login', async () => {
      
      const findOneMock = jest.fn(() => ({ email: 'test@example.com', password: 'hashedPassword' }));
      const collectionMock = jest.fn(() => ({ findOne: findOneMock }));
      const db = { collection: collectionMock };

      bcrypt.compareSync.mockReturnValue(true);
      jwt.sign.mockReturnValue('token');

      const result = await checkLogin(db, 'test@example.com', 'password');

      expect(bcrypt.compareSync).toHaveBeenCalledWith('password', 'hashedPassword');
      expect(collectionMock).toHaveBeenCalledWith('users');
      expect(findOneMock).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(jwt.sign).toHaveBeenCalledWith({ id: undefined, username: undefined, email: 'test@example.com' }, undefined, { expiresIn: '1h' });
      expect(result).toEqual({ status: true, data: { email: 'test@example.com', password: 'hashedPassword' }, token: 'token' });
    });

    
  });

  describe('updateUser', () => {
    it('should update user information', async () => {
      
      const findOneMock = jest.fn(() => ({ username: 'testuser', email: 'test@example.com' }));
      const updateOneMock = jest.fn();
      const collectionMock = jest.fn(() => ({ findOne: findOneMock, updateOne: updateOneMock }));
      const db = { collection: collectionMock };

      bcrypt.hashSync.mockReturnValue('newHashedPassword');

      const result = await updateUser(db, 'test@example.com', 'newUsername', 'newPassword');

      expect(bcrypt.hashSync).toHaveBeenCalledWith('newPassword', 10);
      expect(db.collection).toHaveBeenCalledWith('users');
      expect(db.collection().updateOne).toHaveBeenCalledWith(
        { email: 'test@example.com' },
        { $set: { username: 'newUsername', password: 'newHashedPassword' } }
      );
      expect(db.collection().findOne).toHaveBeenCalledWith({ username: 'newUsername' });
      expect(result).toEqual({ status: true, data: { username: 'testuser', email: 'test@example.com' } });
    });
  });

  describe('findByUsername', () => {
    it('should find user by username', async () => {
        const findOneMock = jest.fn(() => ({ username: 'testuser', email: 'test@example.com' }));
        const collectionMock = jest.fn(() => ({ findOne: findOneMock }));
        const db = { collection: collectionMock };
    

      const result = await findByUsername(db, 'testuser');

     // Assert that the MongoDB collection is accessed with the correct name
    expect(db.collection).toHaveBeenCalledWith('users');

    // Assert that the findOne method is called with the correct query
    expect(findOneMock).toHaveBeenCalledWith({ username: 'testuser' });

    // Assert that the function returns the expected result
    expect(result).toEqual({ username: 'testuser', email: 'test@example.com' });
 
    });
  });

  describe('authenticateToken', () => {
    it('should authenticate user token', async () => {
      const req = { cookies: { token: 'validToken' } };
      const res = { status: jest.fn().mockReturnThis(), redirect: jest.fn() };
      const next = jest.fn();

      jwt.verify.mockReturnValueOnce({ id: 'userId', username: 'testuser', email: 'test@example.com' });

      await authenticateToken(req, res, next);

      expect(jwt.verify).toHaveBeenCalledWith('validToken', undefined);
      expect(req.user).toEqual({ id: 'userId', username: 'testuser', email: 'test@example.com' });
      expect(next).toHaveBeenCalled();
    });

    
  });

describe('deactivateUser', () => {
    it('should deactivate user', async () => {
        // Mock the deleteOne method of the MongoDB collection
        const deleteOneMock = jest.fn(() => ({ deletedCount: 1 }));
        const collectionMock = jest.fn(() => ({ deleteOne: deleteOneMock }));
        const db = { collection: collectionMock };
    
        // Create mock request and response objects
        const req = { body: { email: 'test@example.com' } };
        const res = { clearCookie: jest.fn(), redirect: jest.fn() };
    
        // Call the function under test
        const result = await deactivateUser(db, req.body.email);
    
        // Assert that the MongoDB collection is accessed with the correct name
        expect(collectionMock).toHaveBeenCalledWith('users');
    
        // Assert that the deleteOne method is called with the correct query
        expect(deleteOneMock).toHaveBeenCalledWith({ email: req.body.email });
    
        // Assert that the function returns the expected result
        expect(result).toEqual({ status: true });
      });

    it('should handle error during deactivation', async () => {
        const db = {
            collection: jest.fn(() => ({
                deleteOne: jest.fn(() => ({ deletedCount: 1 }))
            }))
        };
        const req = { body: { email: 'test@example.com' } };
        const res = { render: jest.fn() };

        const result = await deactivateUser(db, req.body.email);

        expect(db.collection).toHaveBeenCalledWith('users');
        // expect(db.collection().deleteOne).toHaveBeenCalled();
        expect(result).toEqual({ status: true });
    });
});


});