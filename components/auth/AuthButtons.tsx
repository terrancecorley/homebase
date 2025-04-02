import { signIn, signOut, auth } from "@/auth";

export default async function AuthButtons() {
    const session = await auth();
    console.log("session: ", session);

    return (
        <>
            <form
                action={async () => {
                    "use server";
                    const data = await signIn("google");
                    console.log("data: ", data);
                }}
            >
                <button className="border border-b-black" type="submit">
                    Signin with Google
                </button>
            </form>
            <form
                action={async () => {
                    "use server";
                    await signOut();
                }}
            >
                <button type="submit">Sign Out</button>
            </form>
        </>
    );
}
