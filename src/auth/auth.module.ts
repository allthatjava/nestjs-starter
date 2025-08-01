import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService)=>({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        }
      })
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService,
    {
          provide: UsersRepository,
          useFactory: (dataSource: DataSource)=>{
            return new UsersRepository(dataSource);
          },
          inject: [DataSource],
        },
        JwtStrategy
  ],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
