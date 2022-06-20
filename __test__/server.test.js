'use strict';
process.env.API_SECRET = "TEST_SECRET";

const base64 = require('base-64');
const middleware = require('../src/middleware/basic');

const users= require("../src/model/user.model");
process.env.API_SECRET = "TEST_SECRET";
const { app } = require('../src/server'); 
const supertest = require('supertest');
const { db } = require('../src/model/index.model');
// const db = require("../index")
const mockRequest = supertest(app);

let userData = {
  testUser: { username: 'user', password: 'password' },
};
let accessToken = null;

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe('Auth Router', () => {

  it('add a new user', async () => {

    const response = await mockRequest.post('/signup').send(userData.testUser);
    expect(response.status).toBe(201); });

  it(' signin at basicauth', async () => {
    let { username, password } = userData.testUser;
    const response = await mockRequest.post('/signin')
      .auth(username, password);

    const userObject = response.body;
    expect(response.status).toBe(200);
    
  });

  it('signin user at bearer auth token', async () => {
    let { username, password } = userData.testUser;

   
    const response = await mockRequest.post('/signin')
      .auth(username, password);

    accessToken = response.body.token;

    
    const bearerResponse = await mockRequest
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`);

    
    expect(bearerResponse.status).toBe(200);
  });

  it(' wrong password  or username ', async () => {

    const response = await mockRequest.post('/signin')
      .auth('admin', 'xyz')
    const { user, token } = response.body;

    expect(response.status).toBe(403);
    expect(response.text).toEqual("Invalid Signin");
    expect(user).not.toBeDefined();
    expect(token).not.toBeDefined();
  });

  it('not signup username', async () => {

    const response = await mockRequest.post('/signin')
      .auth('nobody', 'xyz')
    const { user, token } = response.body;

    expect(response.status).toBe(403);
    expect(response.text).toEqual("Invalid Signin");
    expect(user).not.toBeDefined();
    expect(token).not.toBeDefined();
  });

  it(' invalid token', async () => {

  
    const response = await mockRequest.get('/users')
      .set('Authorization', `Bearer foobar`)
    const userList = response.body;

   
    expect(response.status).toBe(403);
    expect(response.text).toEqual("Invalid Signin");
    expect(userList.length).toBeFalsy();
  });

  it(' valid token', async () => {

    const response = await mockRequest.get('/users')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body).toEqual(expect.anything());
  });

  it('Secret Route fails with invalid token', async () => {
    const response = await mockRequest.get('/secret')
      .set('Authorization', `bearer accessgranted`);

    expect(response.status).toBe(403);
    expect(response.text).toEqual("Invalid Signin");
  });
});
let userInfo = {
    admin: { username: 'admin-basic', password: 'password' },
  };
  
  
  beforeAll(async () => {
    await db.sync();
 
  });
  afterAll(async () => {
    await db.drop();
  });
  
  describe('Auth Middleware', () => {
  
    
    const req = {};
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res),
    }
    const next = jest.fn();
  
    describe('user authentication', () => {
  
      it('loger test', () => {
        const basicAuthString = base64.encode('username:password');
  
        
        req.headers = {
          authorization: `Basic ${basicAuthString}`,
        };
  
          middleware(req, res, next)
          .then(() => {
            expect(next).not.toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalledWith(200);
          });
  
      });
  
      it('admin login', () => {
        let basicAuthString = base64.encode(`${userInfo.admin.username}:${userInfo.admin.password}`);
  
        
        req.headers = {
          authorization: `Basic ${basicAuthString}`,
        };
  
         middleware(req, res, next)
          .then(() => {
            expect(next).not.toHaveBeenCalledWith("Invalid Signin");
          });
  
      });
    });
  });

  describe('Auth-api Router', () => {
      test("img at get method" , async ()=>{
const res =await mockRequest.get('/img').set('Authorization',"bearer accessgranted");
expect(res.status).toBe(403);
expect(res.text).toEqual("Invalid Signin");

      })
      test("img  at post method" , async ()=>{
        const res =await mockRequest.post('/img').set('Authorization',"bearer accessgranted");
        expect(res.status).toBe(403);
        expect(res.text).toEqual("Invalid Signin");
        
              })
              test("img at put method " , async ()=>{
                const res =await mockRequest.put('/img').set('Authorization',"bearer accessgranted");
                expect(res.status).toBe(403);
                expect(res.text).toEqual("Invalid Signin");
                
                      })
                      test("img at  delete method  " , async ()=>{
                        const res =await mockRequest.delete('/img').set('Authorization',"bearer accessgranted");
                        expect(res.status).toBe(403);
                        expect(res.text).toEqual("Invalid Signin");
                        
                              })
             test("img at patch method " , async ()=>{
            const res =await mockRequest.patch('/img').set('Authorization',"bearer accessgranted");
            expect(res.status).toBe(403);
             expect(res.text).toEqual("Invalid Signin");
                              
                });
  });