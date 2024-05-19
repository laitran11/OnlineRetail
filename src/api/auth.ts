const API  = 'https://localhost:7029/api/'
export interface LoginModel {
    Usr: string;
    Pwd: string;
}
export interface Member{
    id: string;
    fullname: string;
    password: string;
}
export const fetchlogin = async(loginData: LoginModel) : Promise<Member[] | null> =>{
    try{
        const response = await fetch(API + 'auth/login',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(loginData)
        });
        if(!response.ok)
            {
                throw new Error('Failed to fetch data');
            }
        const data: Member[] = await response.json();
        return data;
    }catch(error){
        console.error('Error fetching data', error);
        return null;
    };
}
export interface RegisterModel {
    fullName: string;
    Usr: string;
    Pwd: string;
}
export const fetchregister = async(registerData: RegisterModel) : Promise<Member[] | null> =>{
    try{
        const response = await fetch(API + 'auth/register',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(registerData)
        });
        if(!response.ok)
            {
                throw new Error('Failed to fetch data');
            }
        const data: Member[] = await response.json();
        return data;
    }catch(error){
        console.error('Error fetching data', error);
        return null;
    };
}