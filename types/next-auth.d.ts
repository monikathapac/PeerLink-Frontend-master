import { User, Session, JWT } from "next-auth"


declare module "next-auth" {

    interface User {
        token: string,
        firstName: string,
        lastName: string,
        role: string,
        image:string,
        expires: Date
    }

    interface Session {
        token: string | any,
        firstName: string | any,
        lastName: string | any,
        image:string | any,
        expires: any
        role: string | any
    }
}