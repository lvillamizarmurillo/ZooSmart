import { SignJWT } from 'jose';
import dotenv from "dotenv";
dotenv.config();


export async function generateToken(endpoint) {
  let json = {
    endpoint: endpoint // Incluir el campo "endpoint" en el objeto "json"
  };

  try {
    const encoder = new TextEncoder();
    const jwtconstructor = new SignJWT({ json });
    const jwt = await jwtconstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    return jwt;
  } catch (error) {
    throw error;
  }
}