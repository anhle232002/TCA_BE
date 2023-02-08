export interface SignUpDTO {
    username: string;
    fullName: string;
    password: string;
    repeat_password: string;
}

export interface LoginDTO {
    username: string;
    password: string;
}
