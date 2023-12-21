import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";
import AppleProvider from "next-auth/providers/apple";
import { SignJWT } from "jose";
import { createPrivateKey } from "crypto";

export default async function auth(req, res) {
  const getAppleToken = () => {
    return new SignJWT({})
      .setAudience("https://appleid.apple.com")
      .setIssuer(process.env.APPLE_TEAM_ID)
      .setIssuedAt(new Date().getTime() / 1000)
      .setExpirationTime(new Date().getTime() / 1000 + 3600 * 2)
      .setSubject(process.env.APPLE_ID)
      .setProtectedHeader({
        alg: "ES256",
        kid: process.env.APPLE_KEY_ID,
      })
      .sign(createPrivateKey(process.env.APPLE_PRIVATE_KEY.replace(/\\n/gm, "\n")));
  };

  // Do whatever you want here, before the request is passed down to `NextAuth`
  const options = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
          },
        },
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      }),
      LinkedInProvider({
        clientId: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        token: {
          url: "https://www.linkedin.com/oauth/v2/accessToken",
          async request({ client, params, checks, provider }) {
            const response = await client.oauthCallback(provider.callbackUrl, params, checks, {
              exchangeBody: {
                client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
                client_secret: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET,
              },
              
            });
            return {
              tokens: response,
            };
          },
        },
      }),
      AppleProvider({
        clientId: process.env.APPLE_ID,
        clientSecret: await getAppleToken(),
      }),
    ],
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        return true;
      },
      async session({ session, user, token }) {
          session.user.name = session.user.name || null;
          session.user.email = session.user.email || null;
          session.user.image = session.user.image || null;
          return {
            ...session,
          };
      },
    },
    // debug: true,
    secret: process.env.NEXT_PUBLIC_SECRET_KEY,
  };

  return await NextAuth(req, res, options);
}
