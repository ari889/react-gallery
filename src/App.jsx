import { signal } from "@preact/signals-react";
import GalleryImages from "./components/gallery/GalleryImages";
import Header from "./components/includes/Header";

/**
 * initial state for signal
 */
export const images = signal({
  data: [
    {
      id: 1,
      src: "/images/image-1.webp",
      isFeatured: true,
      order: 1,
    },
    {
      id: 2,
      src: "/images/image-2.webp",
      isFeatured: false,
      order: 2,
    },
    {
      id: 3,
      src: "/images/image-3.webp",
      isFeatured: false,
      order: 3,
    },
    {
      id: 4,
      src: "/images/image-4.webp",
      isFeatured: false,
      order: 4,
    },
    {
      id: 5,
      src: "/images/image-5.webp",
      isFeatured: false,
      order: 5,
    },
    {
      id: 6,
      src: "/images/image-6.webp",
      isFeatured: false,
      order: 6,
    },
    {
      id: 7,
      src: "/images/image-7.webp",
      isFeatured: false,
      order: 7,
    },
    {
      id: 8,
      src: "/images/image-8.webp",
      isFeatured: false,
      order: 8,
    },
    {
      id: 9,
      src: "/images/image-9.webp",
      isFeatured: false,
      order: 9,
    },
  ],
  deletedItems: [],
});

function App() {
  console.log(images.value);
  return (
    <>
      <div className="m-3 rounded-md border border-gray-200">
        {/* header start */}
        <Header />
        {/* header end */}

        {/* gallery images end */}
        <GalleryImages />
        {/* gallery images end */}
      </div>
    </>
  );
}

export default App;
