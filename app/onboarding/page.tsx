import Register from "./RegisterForm";
import { getUniversities } from "../utils/uniSelector";

export default async function RegisterPage() {

  const universities = await getUniversities()  // server-side fetch

  return (
    <Register universities={universities} />
  );
}