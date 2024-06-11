import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Papa from "papaparse";
import { Button } from "@chakra-ui/react";
import theme from "styles/theme";
import { logError } from "services/crashReport";
import { useTranslation } from "react-i18next";
import useSubscriptions from "hooks/apiHooks/useSubscriptions";
import ModalBlank from "components/atomics/ModalBlank";
import Loading from "components/moleculars/Loading";
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
  const [loading, setLoading] = useState(false);
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

  const handleError = (error: any) => {
    logError(error);

    let errorMessage = "Upload failed! ❌";
    if (error.isAxiosError && error.response && error.response.data) {
      const { message, failed } = error.response.data;

      if (failed && Array.isArray(failed)) {
        errorMessage += "The following emails had a problem: ";
        failed.forEach(({ email }) => {
          errorMessage += `${email}, `;
        });
      } else {
        errorMessage += message;
      }
    }
    setModalMessage(errorMessage);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!file) return;
    setLoading(true);
    try {
      await uploadDirectTransferSubscriptions(
        csvContent,
        data.offerId,
        data.integrationId,
      );
      setLoading(false);
      setModalVisible(true);
      setModalMessage("Upload successful! ✅");
      reset();
      setFile(null);
      setCsvPreview(null);
    } catch (e) {
      logError(e);
      setLoading(false);
      setModalVisible(true);
      handleError(e);
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <p>{t("description")}</p>
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
        {loading && <Loading />}
      </S.ContentContainer>
    </S.Container>
  );
}

export default DirectTransferSubscriptionPage;
