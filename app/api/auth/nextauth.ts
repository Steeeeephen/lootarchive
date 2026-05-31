import NextAuth from "next-auth";

export default NextAuth({
    providers: [],
    pages: {
        signIn: '/admin/login',
    }
});