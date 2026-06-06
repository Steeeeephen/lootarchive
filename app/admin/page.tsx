import { auth } from "@/lib/auth"; // Your Better Auth configuration instance
import { headers } from "next/headers";
import { redirect } from "next/navigation";
const Page = async () => {

    // const session = await auth.api.getSession({
    //     headers: await headers(),
    // });
    //
    // if (!session) {
    //     redirect("/login");
    // }

    return (
        <div>Admin Dashboard</div>
    )
}
export default Page
