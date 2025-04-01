import { JwtService } from "@nestjs/jwt";
import { Tokens } from "../types/tokens.type";
import { Admin } from "../../admin/entities/admin.entity";

export async function generateTokens (admin: Admin, jwtService: JwtService) : Promise<Tokens> {
    const payload = {
        id : admin.id,
        login : admin.login,
        is_creator : admin.is_creator,
        is_active : admin.is_active
    }

    const [access_token, refresh_token] = await Promise.all([
        jwtService.sign(payload, {
            secret : process.env.ACCESS_TOKEN_KEY,
            expiresIn : process.env.ACCESS_TOKEN_TIME
        }),
        jwtService.sign(payload, {
            secret : process.env.REFRESH_TOKEN_KEY,
            expiresIn : process.env.REFRESH_TOKEN_TIME
        })
    ])

    return { access_token, refresh_token };
}