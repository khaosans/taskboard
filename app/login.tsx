import { SignIn } from '@clerk/nextjs';

const LoginPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </div>
    );
};

export default LoginPage;