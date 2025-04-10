import { signIn, signOut, auth } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function AuthButtons() {
    const session = await auth();

    return (
        <>
            {!session ? (
                <form
                    action={async () => {
                        "use server";
                        await signIn("google");
                    }}
                >
                    <Button type="submit">Sign In</Button>
                </form>
            ) : (
                <form
                    action={async () => {
                        "use server";
                        await signOut();
                    }}
                >
                    <Button type="submit">Sign Out</Button>
                </form>
            )}
        </>
    );
}
