import { UIMode } from "../dto/onboarding.dto";

export interface UserResponse{
    id: string;
    name: string;
    email: string;
    filename?: string;
    themePreference?: UIMode;
    language?: string;
}