import crypto from "crypto";

export function hashPassword(password: string, salt: string) : Promise<string> {

    return new Promise ((reslove, reject ) => {

        crypto.scrypt(password.normalize(), salt, 64, (err, hash) => {
            //if we get an error, we reject the promise
            if (err) reject (err);

            //if no error, we resolve the promise with the hashed password in hex format
            //normalize() ensures consistent string representation
            reslove (hash.toString("hex").normalize());
        
        });
    })

}

export function generateSalt(){
    //16 bytes is essentially 16 random characters
    return crypto.randomBytes(16).toString("hex").normalize();
}