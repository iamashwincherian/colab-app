import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import Logo from "@/components/logo/logo";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <FullScreenLayout nav>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="md:col-span-2 md:mt-0">
          <div className="flex flex-col justify-center items-center mb-2 pb-2">
            <Logo />
            <p className="text-lg my-4 font-semibold dark:text-gray-300">
              Welcome to Colab
            </p>
          </div>
          {children}
        </div>
      </div>
    </FullScreenLayout>
  );
}
