export type Mode = "onboarding" | "edit";

export type UserInfoFormState = {
    occupation: string;
    ageRange: string;
    purposes: string[];
    nickname: string;
};

export type UserInfoSubmit = {
    occupation: string;
    ageRange: string;
    purposes: string[];
    nickname?: string;
};
