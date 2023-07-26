const clsx = (...args: (string | null | undefined)[]) => {
  const filteredArgs = args.filter((arg) => arg !== null && arg !== undefined);
  return filteredArgs.join(" ");
};
export default clsx;
