import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DatePicker } from "./datepicker";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import usePdfUpdate from "@/hooks/usePdfUpdate";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { Loader } from "lucide-react";

const generateCertificateSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  email: z.string().email(),
  course: z.string().min(3, { message: "Course is required" }),
  date: z.date(),
});

const CertificateForm = () => {
  const updatePdf = usePdfUpdate();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof generateCertificateSchema>>({
    resolver: zodResolver(generateCertificateSchema),
    defaultValues: {
      name: "",
      email: "",
      course: "",
      date: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof generateCertificateSchema>) {
    setLoading(true);
    const { course, name, date, email } = values;
    const pdfBlob = await updatePdf({ course, name, date });

    const formData = new FormData();

    if (pdfBlob) {
      try {
        formData.append("email", email);
        formData.append("pdf", pdfBlob);
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/save-pdfs`,
          formData
        );

        if (response.data.status === "success") {
          toast.success(
            `Certificate generated successfully \n ${response.data.fileUrl}`
          );
          form.reset();
        }
      } catch (err) {
        toast.error(`An error occurred while uploading the certificate`);
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("An error occurred while generating the certificate");
      setLoading(false);
    }
  }

  return (
    <Card className="w-full h-fit">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="tracking-wide">Enter details</CardTitle>
            <CardDescription>Generate new PDFs in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="basis-1/2">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="Name of student"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="basis-1/2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="Email of student"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem className="basis-1/2">
                      <FormLabel>Course</FormLabel>
                      <FormControl>
                        <Input
                          id="course"
                          placeholder="Name of course"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="basis-1/2">
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          placeholder="Date of completion"
                          onDateSelect={(value) => field.onChange(value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              disabled={loading}
              className="min-w-24 disabled:opacity-50"
              type="submit"
            >
              {loading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                "Generate"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CertificateForm;
