import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

export class UsersRepository extends Repository<User>{
    constructor(private datasource:DataSource){
        super(User, datasource.createEntityManager());
    }



    async createUser(authCredentialDto:AuthCredentialsDto): Promise<void>{
        const {username, password} = authCredentialDto;

        // hash
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log('salt', salt);
        console.log('hashedPassword', hashedPassword);

        const user:User = this.create({username, password: hashedPassword});
        try{
            await this.save(user);
        }catch (error){
            if(error.code === '23505'){
                throw new ConflictException(`User name "${username}" already existed`);
            }
            else{
                throw new InternalServerErrorException();
            }
        }
    }
}