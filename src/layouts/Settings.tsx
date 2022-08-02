import { useSession } from "next-auth/react";

export function Settings() {
    const { data: session } = useSession();

    if (!session) {
        return <div>Not logged in</div>;
    }

    return (
        <div>Logged in</div>
    );
}
