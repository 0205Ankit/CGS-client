import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const ImageDialog = ({ src }: { src: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full cursor-pointer h-fit">
          <img
            src={src}
            alt="image"
            className="rounded-md hover:brightness-75 transition-all duration-200"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <img src={src} alt="image" className="w-full h-full object-cover" />
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
