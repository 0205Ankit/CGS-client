import { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEye } from "react-icons/fa";
import { Button } from "@/components/ui/button";

type certificateType = {
  _id: string;
  pdfUrl: string;
  email: string;
};

const Home = () => {
  const [certificates, setCertificates] = useState<certificateType[] | []>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setError(false);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/save-pdfs`
        );
        setCertificates(response.data.certificates);
      } catch (err) {
        setError(true);
        console.log(err);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="my-20">
      <h1 className="text-2xl flex justify-between items-center font-semibold pb-2 border-b-2">
        Saved Certificates
        {certificates?.length > 0 && (
          <a href="/create-certificates">
            <Button>Create new</Button>
          </a>
        )}
      </h1>

      {error ? (
        <div className="flex flex-col items-center justify-center my-20 gap-5">
          <h1 className="text-4xl font-semibold text-center">
            Can't fetch certificates at the moment
          </h1>
        </div>
      ) : (
        <>
          {certificates.length > 0 ? (
            <>
              {certificates.map((certificate, index) => (
                <a
                  className="my-5 p-5 rounded-xl group ring-2 hover:bg-input cursor-pointer transition-all duration-300 ring-input flex justify-between items-center"
                  key={certificate._id}
                  href={certificate.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center">
                    <p className="text-lg font-bold pr-5 border-r-2 ">
                      {index + 1}.
                    </p>
                    <p className="text-blue-500 underline ml-5 font-semibold">
                      {certificate.email}
                    </p>
                  </div>
                  <FaRegEye className="ml-5 size-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </a>
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center my-20 gap-5">
              <h1 className="text-4xl font-semibold text-center">
                Oops! No certificates found
              </h1>
              <a href="/create-certificates">
                <Button>Create a new Certificate</Button>
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
