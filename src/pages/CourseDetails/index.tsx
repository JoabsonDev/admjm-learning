import Button from "@atoms/Button"
import Stars from "@atoms/Stars"

export default function CourseDetails() {
  return (
    <div>
      <div className="bg-neutral-800 text-white p-8 flex gap-4 h-[264px]">
        <div className="p-2.5 bg-white rounded-lg flex items-center justify-center max-w-[340px]">
          <img
            className="rounded-[4px]"
            src="https://gambolthemes.net/html-items/cursus-new-demo/images/courses/img-2.jpg"
            alt=""
          />
        </div>

        <div className="h-full flex flex-col">
          <h1 className="font-semibold text-2xl mb-4">
            The Web Developer Bootcamp
          </h1>

          <p className="text-sm mb-5 line-clamp-3">
            The only course you need to learn web development - HTML, CSS, JS,
            Node, and More!
          </p>

          <Stars size={4.5} className="text-yellow-500" />

          <div className="mt-auto flex items-center gap-4">
            <Button
              color="danger"
              className="border border-transparent hover:bg-red-600"
            >
              Add to Cart
            </Button>
            <Button className="border border-white hover:bg-neutral-700">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
