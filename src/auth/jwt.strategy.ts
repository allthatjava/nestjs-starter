import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRepository } from "./users.repository";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(UsersRepository)
        private userRepository:UsersRepository,
        private configService:ConfigService
    ){
        super({
            secretOrKey: configService.get<string>('JWT_SECRET')!,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    // Returns the valid login User object if it is found, So @GetUser decorator get pick it up.
    async validate(payload:JwtPayload): Promise<User> {
        const {username} = payload;
        const user: User|null = await this.userRepository.findOneBy({username});

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
    
}