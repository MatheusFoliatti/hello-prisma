import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

interface IPayLoad {
    sub: string
} 

export async function EnsureAuthenticateUser (
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) return response.status(401).json({
        message: "Token missing."
    })

    const [_, token] =authHeader.split(" ")

    try {
        const { sub } = verify(
            token,
            "ChaveSecreta"
        ) as IPayLoad

        request.userId = sub

        return next()
        } 
     catch {
        return response.status(401).json({message: "Invalid Token"})
    }
}