import crypto from "crypto";

export function hashPassword(password: string, salt: string){

    return new Promise ((reslove, reject ) => {

        crypto.scrypt(password.normalize(), salt, 64, (err, hash) => {
            //if we get an error, we reject the promise
            if (err) reject (err);

            //if no error, we resolve the promise with the hashed password in hex format
            reslove (hash.toString("hex").normalize());
        
        });
    })

}