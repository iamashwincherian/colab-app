import FullScreenLayout from "../layouts/FullScreenLayout";
import Spinner from "../spinner/spinner";

export default function Loading() {
  return (
    <FullScreenLayout>
      <div className="flex justify-center items-center w-screen h-screen dark:bg-dark">
        <Spinner />
      </div>
    </FullScreenLayout>
  );
}
