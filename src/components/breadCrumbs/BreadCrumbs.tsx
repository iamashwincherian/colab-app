import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type BreadCrumbsProps = {
  children?: ReactNode[];
};

type BreadCrumbItemProps = {
  text: string;
  link?: string;
};

export function BreadCrumbItem({ text, link }: BreadCrumbItemProps) {
  const router = useRouter();

  const jumpToLink = () => {
    if (!link) return;
    router.replace(link);
  };

  const linkClasses = link && "hover:underline cursor-pointer";

  return (
    <div className={linkClasses} onClick={jumpToLink}>
      {text}
    </div>
  );
}

export function BreadCrumbs({ children }: BreadCrumbsProps) {
  return (
    <div className="flex gap-2 text-xs bg-white dark:bg-dark-2 w-min dark:px-4 dark:py-2 dark:rounded-full">
      {children?.map((child, index) => {
        return (
          <div className="flex gap-2 dark:text-white" key={index}>
            {child}
            {index !== children.length - 1 ? <p>/</p> : null}
          </div>
        );
      })}
    </div>
  );
}