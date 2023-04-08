import { Routes } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { ModulesRoutes } from './api/modules.routes';

export const MainRoutes: Routes = [
    {
        path: 'auth',
        module: AuthModule,
    },
    {
        path: 'api',
        children: ModulesRoutes
    }
]