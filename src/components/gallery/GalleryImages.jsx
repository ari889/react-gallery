/**
 * external imports
 */
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

/**
 * internal imports
 */
import { images } from "../../App";
import AddNewImage from "./AddNewImage";
import GalleryImage from "./GalleryImage";

const GalleryImages = () => {
  return (
    <div>
      {/* react dnd provider start */}
      <DndProvider backend={HTML5Backend}>
        {/* images grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-3 transition-all">
          {images?.value?.data
            .sort((a, b) => a.order - b.order)
            .map((item) => (
              <GalleryImage key={item.id} item={item} />
            ))}

          {/* add new images */}
          <AddNewImage />
        </div>
      </DndProvider>
      {/* react dnd provider end */}
    </div>
  );
};

export default GalleryImages;
