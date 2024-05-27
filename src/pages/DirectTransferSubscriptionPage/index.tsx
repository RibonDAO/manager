import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Papa from "papaparse";

interface IFormInput {
  file: FileList;
}

function DirectTransferSubscriptionPage() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [file, setFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<string[][] | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      Papa.parse(selectedFile, {
        complete: (result: any) => {
          setCsvPreview(result.data as string[][]);
        },
        header: false,
      });
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Success:");
    } catch (error) {
      console.error("Error:");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" {...register("file")} onChange={handleFileChange} />
      {csvPreview && (
        <div>
          <h3>CSV Preview</h3>
          <table>
            <tbody>
              {csvPreview.slice(1, 6).map((row) => (
                <p key={Math.random()}>{row}</p>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button type="submit">Upload</button>
    </form>
  );
}

export default DirectTransferSubscriptionPage;
