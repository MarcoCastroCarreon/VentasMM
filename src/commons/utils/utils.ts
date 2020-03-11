import * as bcrypt from 'bcrypt';

export class Utils {

    static async encryptPassword(password: string): Promise<string> {
        console.log(`Service START -->${this.encryptPassword.name}`);
        password = await bcrypt.hash(password, 10);
        console.log(`Service END -->${this.encryptPassword.name}`);
        return password;
    }
}