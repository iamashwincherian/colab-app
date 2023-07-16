import { useEffect } from "react";
import FullScreenLayout from "../layouts/FullScreenLayout";

export default function Loading() {
  return (
    <FullScreenLayout>
      <div className="flex justify-center items-center w-screen h-screen dark:bg-dark">
        Loading...
      </div>
    </FullScreenLayout>
  );
}
