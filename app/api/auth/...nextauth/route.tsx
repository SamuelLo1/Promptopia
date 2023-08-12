import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';



const handler = NextAuth ({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ]
})
/*
async sessionStorage({ session }){

},

async signIn({ profile }){

}
*/