import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function encryptPassword(password, key) {
    const salt = key || await bcrypt.genSalt(SALT_ROUNDS);
    const encryptedPassword = await bcrypt.hash(password, salt);

    return { encryptedPassword, salt };
}
