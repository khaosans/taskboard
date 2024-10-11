import { useUser } from '@clerk/nextjs';

const SomeComponent: React.FC = () => {
    const { user } = useUser();

    return (
        <div>
            <h1>Welcome, {user?.firstName}!</h1>
            <p>Email: {user?.emailAddresses[0]?.emailAddress}</p>
        </div>
    );
};