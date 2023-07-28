import { PlusIcon } from "@heroicons/react/24/solid";

import openModal from "../../../utils/openModal";
import CreateListModal from "../modals/CreateListModal";

export default function CreateListForm({ onCreate }: { onCreate: Function }) {
  const handleModal = () => openModal(<CreateListModal onSubmit={onCreate} />);

  return (
    <div>
      <div
        onClick={handleModal}
        className="bg-gray-50 shadow-sm w-64 mr-4 text-left flex flex-col border-2 border-dotted dark:border-none dark:bg-dark-2 rounded-md cursor-pointer"
      >
        <div className="flex items-center p-2 dark:shadow-xl px-3">
          <PlusIcon className="w-5 h-5 [&>path]:stroke-[3] mr-2" />
          Create New List
        </div>
      </div>
    </div>
  );
}
