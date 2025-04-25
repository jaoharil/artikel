import AuthForm from '@/components/form/AuthFrom';
export default function UserLogin() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <AuthForm type="login" role="admin" />
    </div>
  );
}
