import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Papa from "papaparse";
import { Button } from "@chakra-ui/react";
import theme from "styles/theme";
import { logError } from "services/crashReport";
import useSubscriptions from "hooks/apiHooks/useSubscriptions";
import * as S from "./styles";

interface IFormInput {
  file: File;
}

function DirectTransferSubscriptionPage() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [file, setFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<string[][] | null>(null);
  const { neutral } = theme.colors;
  const { uploadDirectTransferSubscriptions } = useSubscriptions();

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

  const onSubmit: SubmitHandler<IFormInput> = async () => {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("test", "clara");

    // Log FormData content for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      await uploadDirectTransferSubscriptions(csvPreview);
      console.log("Successfully uploaded direct transfer subscriptions");
    } catch (e) {
      logError(e);
      console.error("Failed to upload direct transfer subscriptions");
    }
  };

  useEffect(() => {
    if (!file) {
      setCsvPreview(null);
    }
  }, [file]);

  return (
    <S.Container>
      <S.Title>Upload Direct Transfer CSV File</S.Title>
      <S.ContentContainer>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <S.Subtitle>Preview</S.Subtitle>
          <S.PreviewSection>
            {csvPreview ? (
              <>
                {csvPreview.slice(0, 15).map((row) => (
                  <S.Row key={Math.random()}>{row}</S.Row>
                ))}
                <p>...</p>
              </>
            ) : (
              <p>
                When you select a .csv file, a preview of the first items will
                appear here. Check if it seems correct before hitting the upload
                button.
              </p>
            )}
          </S.PreviewSection>
          <S.ButtonContainer>
            <input
              id="file"
              type="file"
              {...register("file")}
              accept=".csv"
              title="Upload CSV File"
              onChange={handleFileChange}
              required
            />
            <Button
              type="submit"
              color={neutral[50]}
              backgroundColor={neutral[800]}
              _hover={{ bg: neutral[500] }}
            >
              Upload
            </Button>
          </S.ButtonContainer>
        </form>
      </S.ContentContainer>
    </S.Container>
  );
}

export default DirectTransferSubscriptionPage;
