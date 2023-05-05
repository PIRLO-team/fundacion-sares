import { Routes } from "@nestjs/core";
import { UsersModule } from "./users/users.module";
import { DirectVolunteerModule } from "./direct-volunteer/direct-volunteer.module";
import { FileModule } from "./file/file.module";
import { ProviderModule } from "./provider/provider.module";

export const ModulesRoutes: Routes = [
    {
        path: 'user',
        module: UsersModule,
    },
    {
        path: 'direct-volunteer',
        module: DirectVolunteerModule,
    },
    {
        path: 'file',
        module: FileModule,
    },
    {
        path: 'provider',
        module: ProviderModule,
    },
]