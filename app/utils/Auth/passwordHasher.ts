import crypto from "crypto";

//order matters here because these are positional parameters
export function hashPassword(password: string, salt: string) : Promise<string> {

    return new Promise ((resolve, reject ) => {

        crypto.scrypt(password.normalize(), salt, 64, (err, hash) => {
            //if we get an error, we reject the promise
            if (err) reject (err);

            //if no error, we resolve the promise with the hashed password in hex format
            //normalize() ensures consistent string representation
            resolve (hash.toString("hex").normalize());
        
        });
    })

}

export function generateSalt(){
    //16 bytes is essentially 16 random characters
    return crypto.randomBytes(16).toString("hex").normalize();
}

//destructuring an object means function expects one object that has password, salt, and hashedPassword as properties
//order does not matter when passing the object
export async function comparePasswords({
  password,
  salt, 
  hashedPassword,
}: {
  password: string
  salt: string
  hashedPassword: string
}){
    //hashes the password inputted into the form with the stored salt
    const inputHashedPassword = await hashPassword(password, salt); 

    //uses timingSafeEqual to prevent timing attacks
    return crypto.timingSafeEqual(
        Buffer.from(inputHashedPassword, "hex"),
        Buffer.from(hashedPassword, "hex"),
    );
}