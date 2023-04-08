import { Routes } from "@nestjs/core";
import { UsersModule } from "./users/users.module";
import { DirectVolunteerModule } from "./direct-volunteer/direct-volunteer.module";

export const ModulesRoutes: Routes = [
    {
        path: 'user',
        module: UsersModule,
    },
    {
        path: 'direct-volunteer',
        module: DirectVolunteerModule,
    },
]