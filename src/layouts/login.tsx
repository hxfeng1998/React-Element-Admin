import loginBgSvg from '@/assets/images/login-bg.svg';
import { ReactNode } from 'react';
interface LoginLayoutProps {
  children?: ReactNode;
}

function LoginLayout({ children }: LoginLayoutProps): React.ReactNode {
  return (
    <div
      className={`h-screen w-screen bg-[#eee] bg-no-repeat bg-center bg-cover p-[20px]`}
      style={{ backgroundImage: `url(${loginBgSvg})` }}
    >
      <section className="h-full w-full bg-white/50 rounded-lg flex justify-around items-center gap-[24px] px-[48px]">
        {children}
      </section>
    </div>
  );
}

export default LoginLayout;
