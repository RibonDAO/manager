import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Papa from "papaparse";
import { Button } from "@chakra-ui/react";
import theme from "styles/theme";
import { logError } from "services/crashReport";
import { useTranslation } from "react-i18next";
import useSubscriptions from "hooks/apiHooks/useSubscriptions";
import ModalBlank from "components/atomics/ModalBlank";
import { AxiosError } from "axios";
import * as S from "./styles";

interface IFormInput {
  file: string;
  offerId: number;
  integrationId: number;
}

function DirectTransferSubscriptionPage() {
  const { t } = useTranslation("translation", {
    keyPrefix: "directTransferSubscriptionPage",
  });
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
      setModalMessage("Upload successful! ✅");
      reset();
      setFile(null);
      setCsvPreview(null);
    } catch (e) {
      logError(e);
      setModalVisible(true);
      const isAxiosError = (error: any): error is AxiosError =>
        error.isAxiosError === true;

      let errorMessage =
        "Upload failed! ❌ The following emails had a problem: ";

      if (isAxiosError(e) && e.response && e.response.data) {
        const responseData = e.response.data as {
          failed: { email: string; errors: string[] }[];
        };
        if (responseData.failed && Array.isArray(responseData.failed)) {
          responseData.failed.forEach((failure) => {
            errorMessage += `${failure.email}, `;
          });
        }
      }
      setModalMessage(errorMessage);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (!file) {
      setCsvPreview(null);
    }
  }, [file]);

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <S.ContentContainer>
        <ModalBlank
          visible={modalVisible}
          onClose={handleCloseModal}
          customStyles={{
            content: {
              padding: 8,
              margin: 0,
              width: "300px",
              height: "min-content",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "42px",
              fontWeight: "bold",
            },
          }}
        >
          <p>{modalMessage}</p>
        </ModalBlank>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <S.Subtitle>{t("preview")}</S.Subtitle>
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
                {t("description")}
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
            {t("button")}
          </Button>
        </form>
      </S.ContentContainer>
    </S.Container>
  );
}

export default DirectTransferSubscriptionPage;
