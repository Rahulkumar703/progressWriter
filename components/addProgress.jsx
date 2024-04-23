import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const AddProgress = () => {
  return (
    <div>
      <Button>
        <Plus className="w-4 h-4 sm:mr-2" />
        <span className="hidden sm:block">Add Todays Progress</span>
      </Button>
    </div>
  );
};

export default AddProgress;
