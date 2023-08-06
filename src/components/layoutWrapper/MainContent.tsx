import { Button, ButtonVariants } from "@/components/ui/button";

type ButtonTypes = {
  label: string;
  onClick: Function;
  varient?: ButtonVariants;
};

type PropTypes = {
  children?: React.ReactNode;
  title?: String;
  subtitle?: String;
  buttons?: ButtonTypes[];
};

export default function MainContent({
  children,
  title,
  subtitle,
  buttons = [],
}: PropTypes) {
  return (
    <div className="flex flex-col py-6 px-8 flex-1">
      <div className="flex justify-between items-center">
        <div className="mb-5">
          <h1 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-zinc-300 capitalize">
            {title}
          </h1>
          <p className="mt-2 text-gray-500 dark:text-zinc-500">{subtitle}</p>
        </div>
        {buttons.map(({ label, varient = "default", onClick }, index) => (
          <Button
            key={`button-${index}`}
            variant={varient}
            onClick={() => onClick()}
          >
            {label}
          </Button>
        ))}
      </div>
      {children}
    </div>
  );
}
