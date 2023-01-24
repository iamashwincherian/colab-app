import { LightBulbIcon } from "@heroicons/react/24/outline";

export default function Empty() {
  return (
    <div className="w-full flex flex-col items-center h-96 justify-center text-gray-600 dark:text-zinc-500 opacity-30">
      <LightBulbIcon height={50} width={50} className="mt-20" />
      <p className="text-2xl mt-3">Tickets you create appear here!</p>
    </div>
  );
}
