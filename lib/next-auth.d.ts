import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: number,
            name: string,
            email_address: string,
            created_at: Date,
            updated_at: Date,
        },
    }
}