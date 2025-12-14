import { cookies } from "next/headers";
import { cache } from "react";
import { getUserFromSession } from "./session";


//the cache ensures that within a single request, multiple calls to getCurrentUser do not result in 
// multiple cookie reads or database queries
export const getCurrentUser = cache(async () => {
    return await getUserFromSession(await cookies());
})