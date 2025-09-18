interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <div className="h-screen w-1/2">
        <img src="/auth-image.png" alt="Auth" className="h-full w-full" />
      </div>
      <div className="flex w-1/2 flex-col items-center justify-center">
        <div className="w-full max-w-xl">
          <h2 className="mb-12 text-4xl font-semibold">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
