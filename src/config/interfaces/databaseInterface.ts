export default interface IDatabaseConfig {
    name: string;
    password: string;
    username: string;
    host: string;
    port: number;
    dialect: string;
}