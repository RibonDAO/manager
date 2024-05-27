import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Papa from "papaparse";
import * as S from "./styles";

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

  console.log(csvPreview);
  return (
    <S.Container>
      <S.Title>Upload Direct Transfer CSV File</S.Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        {csvPreview && (
          <>
            <S.Subtitle>Preview</S.Subtitle>
            <S.PreviewSection>
              {csvPreview.slice(0, 5).map((row) => (
                <p key={Math.random()}>{row}</p>
              ))}
              <p>...</p>
            </S.PreviewSection>
          </>
        )}
        <input
          type="file"
          {...register("file")}
          accept=".csv"
          title="Upload CSV File"
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
    </S.Container>
  );
}

export default DirectTransferSubscriptionPage;
