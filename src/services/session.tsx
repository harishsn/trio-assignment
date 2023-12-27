import moment from 'moment';
import { pick as _pick, find as _find } from 'lodash'
import axiosHttp from '../network'
import MockAdapter from 'axios-mock-adapter'

export type ILoginPayload = {
    email: string;
    password: string;
}

export type ISignupPayload = {
    name: string;
    email: string;
    password: string;
}
 
export type IAuthResponse = {
    token: string;
    profile: IProfile
}

export type IProfile = {
    profile: string;
    email: string;
}

export type IUser = {
    id: number;
    name: string;
    email: string;
    password: string;
}

let users: Array<IUser> = [
    {
        id: moment().unix(),
        name: 'Alex',
        email: 'alex@yopmail.com',
        password: 'secret@123'
    }
]

/**
 * Mocking axios
 */
var mock = new MockAdapter(axiosHttp, { delayResponse: 3000 });

/**
 * Mocking signup
 * @param name
 * @param email
 * @param password
 * 
 */

mock.onPost("/signup").reply((config: any) => {
    let newUser = JSON.parse(config.data)
    /**
     * Check if email already exists
     */
    const user: IUser | undefined = _find(users, { email: newUser.email })
    if(user)
        return [400, { message: 'User already exists' }];
    newUser = { ...newUser, id: moment().unix() }
    users.push(newUser)
    return [200, { token: newUser.id, profile: _pick(newUser, ['name', 'email']) }];
});

/**
 * Mocking login
 * @param email
 * @param password
 * @returns
 */

mock.onPost("/login").reply((config: any) => {
    let credentials = JSON.parse(config.data)
    const user: IUser | undefined = _find(users, { email: credentials.email, password: credentials.password })
    if(!user)
        return [400, { message: 'Incorrect email or password' }];
    return [200, { token: user.id, profile: _pick(user, ['name', 'email']) }];
});

export const signupService = (payload: ISignupPayload) => {
    return axiosHttp.post('/signup', payload)
}

export const loginService = (payload: ILoginPayload) => {
    return axiosHttp.post('/login', payload)
}
