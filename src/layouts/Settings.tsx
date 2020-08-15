import { useSession } from "next-auth/client";

export function Settings() {
    const [session] = useSession();

    if (!session) {
        return <div>Not logged in</div>;
    }

    return (
        <div>Logged in</div>
    );
}
