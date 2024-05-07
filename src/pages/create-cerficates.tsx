import CertificateForm from "@/components/cerificate-form";
import ImageDialog from "@/components/image-dialog";
import { Toaster } from "@/components/ui/sonner";

const CreateCertificates = () => {
  return (
    <div className="mt-20 w-10/12 mx-auto">
      <h1 className="text-2xl font-semibold">Generate Certificates</h1>
      <span className="text-sm">
        The generated certificates will be uploaded to a google drive and the
        link will be saved in the database along with student email you can
        visit{" "}
        <a className="text-blue-500 underline italic font-semibold" href="/">
          Home
        </a>{" "}
        page to view the created certificates.
      </span>

      <div className="my-10 flex gap-10 items-center">
        <div className="basis-[35%]">
          <ImageDialog src="/certificate-template.png" />
          <p className="text-xl font-semibold text-muted-foreground text-center my-2">
            Certificate Template
          </p>
        </div>
        <div className="basis-[65%]">
          <CertificateForm />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default CreateCertificates;
