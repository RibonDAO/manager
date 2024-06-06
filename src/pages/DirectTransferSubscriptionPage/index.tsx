import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Papa from "papaparse";
import { Button } from "@chakra-ui/react";
import theme from "styles/theme";
import { logError } from "services/crashReport";
import useSubscriptions from "hooks/apiHooks/useSubscriptions";
import ModalBlank from "components/atomics/ModalBlank";
import * as S from "./styles";

interface IFormInput {
  file: string;
  offerId: number;
  integrationId: number;
}

function DirectTransferSubscriptionPage() {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [file, setFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<string[][] | null>(null);
  const [csvContent, setCsvContent] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { neutral } = theme.colors;
  const { uploadDirectTransferSubscriptions } = useSubscriptions();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const reader = new FileReader();

      reader.readAsText(selectedFile, "UTF-8");
      reader.onload = (e) => {
        setCsvContent(e.target?.result as string);
      };
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
    if (!file) return;

    try {
      await uploadDirectTransferSubscriptions(
        csvContent,
        data.offerId,
        data.integrationId,
      );
      setModalVisible(true);
      setModalMessage("Upload successful!");
    } catch (e) {
      logError(e);
      setModalVisible(true);
      setModalMessage("Upload failed. Please try again.");
    }
  };
  
  const handleCloseModal = () => {
    setModalVisible(false);
    reset(); 
    setFile(null);
    setCsvPreview(null); 
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
        <ModalBlank
          visible={modalVisible}
          onClose={handleCloseModal}
          customStyles={{
            content: {
              padding: 8,
              margin: 0,
              width: "300px",
              height: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "42px",
              fontWeight: "bold",
            },
          }}
        >
          <h3>{modalMessage} ✅</h3>
        </ModalBlank>
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
          <S.Input>
            <input
              type="number"
              placeholder="Offer ID"
              {...register("offerId")}
              required
            />
            <input
              type="number"
              placeholder="Integration ID"
              {...register("integrationId")}
              required
            />
            <input
              id="file"
              type="file"
              {...register("file")}
              accept=".csv"
              title="Upload CSV File"
              onChange={handleFileChange}
              required
            />
          </S.Input>
          <Button
            type="submit"
            color={neutral[50]}
            backgroundColor={neutral[800]}
            _hover={{ bg: neutral[500] }}
            marginTop="12px"
          >
            Upload
          </Button>
        </form>
      </S.ContentContainer>
    </S.Container>
  );
}

export default DirectTransferSubscriptionPage;
