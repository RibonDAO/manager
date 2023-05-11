import { Button, useToast } from "@chakra-ui/react";
import { Languages } from "@ribon.io/shared/types";
import FileUpload from "components/moleculars/FileUpload";
import InfoName from "components/moleculars/infoName";
import Loading from "components/moleculars/Loading";
import useArticles from "hooks/apiHooks/useArticles";
import useAuthors from "hooks/apiHooks/useAuthors";
import { useUploadFile } from "hooks/apiHooks/useUploadFile";
import { useLanguage } from "hooks/useLanguage";
import {
  dateISOFormatterFromString,
  dateISOFormatter,
} from "lib/dateISOFormatter";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { logError } from "services/crashReport";
import neutral from "styles/colors/neutral";
import { CreateArticle, CreateAuthor, Author } from "@ribon.io/shared/types";
import * as S from "./styles";

export type Props = {
  isEdit?: boolean;
};

function UpsertArticleNewsPage({ isEdit }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "news",
  });

  const mode = isEdit ? "edit" : "create";
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<string>("");
  const [visibleCheckbox, setVisibleCheckbox] = useState(true);
  const [authors, setAuthors] = useState<Author[]>([]);
  const { getAuthors, createAuthor } = useAuthors();
  const { createArticle, getArticle, updateArticle } = useArticles();
  const { currentLang } = useLanguage();
  const { id } = useParams();
  const {
    getValues: ArticleObject,
    setValue,
    reset,
    handleSubmit,
    register,
    formState,
  } = useForm<CreateArticle>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    getValues: AuthorObject,
    register: registerAuthor,
    formState: formStateAuthor,
    reset: resetAuthor,
  } = useForm<CreateAuthor>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const navigate = useNavigate();
  const toast = useToast();
  const handleCancel = () => {
    navigate("/news/articles");
  };

  const fetchAuthors = useCallback(async () => {
    try {
      const allAuthors = await getAuthors();
      setAuthors(allAuthors);
    } catch (e) {
      logError(e);
    }
  }, [setAuthors]);

  const fetchArticle = useCallback(async () => {
    try {
      const article = await getArticle(id);
      reset(article);
      resetAuthor(article.author);
      setImageFile(article.imageUrl);
      setVisibleCheckbox(article.visible);
      setValue("publishedAt", dateISOFormatterFromString(article.publishedAt));
    } catch (e) {
      logError(e);
    }
  }, []);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  useEffect(() => {
    if (isEdit) {
      fetchArticle();
    } else {
      setValue("visible", true);
      setValue(
        "language",
        currentLang === "pt-BR" ? Languages.PT : Languages.EN,
      );
    }
  }, []);

  const handleActivityCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = e.target;
    setValue("visible", checked);
    setVisibleCheckbox(!visibleCheckbox);
  };

  const handleUploadImage = (image: File, attribute: "image") => {
    try {
      setLoading(true);
      const upload = useUploadFile(image);

      upload.create((error: Error, blob: any) => {
        if (error) {
          logError(error);
          setLoading(false);
        } else {
          setValue(attribute, blob.signed_id);
          setLoading(false);
        }
      });
    } catch (e) {
      logError(e);
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files![0];

    setImageFile(URL.createObjectURL(image));
    handleUploadImage(image, "image");
  };

  const handleSave = async () => {
    async function authorId() {
      if (AuthorObject()) {
        const newAuthor = {
          ...AuthorObject(),
        };
        const authorExists = authors.find(
          (author) => author.name === AuthorObject().name,
        );
        if (authorExists) {
          return authorExists.id;
        }
        const authorCreated = await createAuthor(newAuthor);
        return authorCreated?.data?.id;
      }
      return undefined;
    }
    if (ArticleObject()) {
      const articleObject = {
        ...ArticleObject(),
        author_id: await authorId(),
      };

      try {
        if (isEdit) {
          await updateArticle(articleObject);
        } else {
          setLoading(true);
          await createArticle(articleObject)
            .then((response) => {
              reset(response?.data);
              setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
              toast({
                description: error.response.data.formatted_message,
                status: "error",
              });
              throw Error(error.response.data.formatted_message);
            });
        }
        navigate("/news/articles");
      } catch (e) {
        logError(e);
      }
    }
  };

  return (
    <>
      <S.Title>{t(`upsert.${mode}.title`)}</S.Title>
      <form onSubmit={handleSubmit(handleSave)}>
        <S.ContentSection>
          <S.LeftSection>
            <S.Subtitle>{t("attributes.visibility")}</S.Subtitle>
            <S.CheckboxContainer>
              <S.Checkbox
                name="visible"
                type="checkbox"
                onChange={handleActivityCheckboxChange}
                checked={visibleCheckbox}
              />
              <S.Span>{t("upsert.visibilityStatus")}</S.Span>
            </S.CheckboxContainer>

            <S.Subtitle>{t("details.details")}</S.Subtitle>

            <InfoName>{t("attributes.content")}</InfoName>
            <S.TextInput
              maxLength={240}
              {...register("title", { required: t("upsert.required") })}
            />
            {formState?.errors.title && formState?.errors.title.type && (
              <S.Error>{formState?.errors.title.message}</S.Error>
            )}

            <InfoName>{t("attributes.link")}</InfoName>
            <S.TextInput autoComplete="off" {...register("link")} />
            {formState?.errors.link && formState?.errors.link.type && (
              <S.Error>{formState?.errors.link.message}</S.Error>
            )}
            <S.Info>{t("upsert.optional")}</S.Info>

            <InfoName>{t("attributes.author")}</InfoName>

            <S.TextInput
              list="author-dropdown"
              autoComplete="off"
              {...registerAuthor("name", {
                required: t("upsert.required"),
              })}
            />
            {formStateAuthor?.errors.name &&
              formStateAuthor?.errors.name.type && (
                <S.Error>{formStateAuthor?.errors.name.message}</S.Error>
              )}
            <S.DatalistContainer id="author-dropdown">
              {authors.map((author) => (
                <S.OptionContainer key={author.id} value={author.name}>
                  {author.name}
                </S.OptionContainer>
              ))}
            </S.DatalistContainer>
            <S.Info>{t("upsert.authorInstruction")}</S.Info>
            <InfoName>{t("upsert.language")}</InfoName>
            <S.SelectInput
              values={[Languages.EN, Languages.PT]}
              name="language"
              onOptionChanged={(value) => setValue("language", value)}
              defaultValue={
                ArticleObject().language || currentLang === "pt-BR"
                  ? Languages.PT
                  : Languages.EN
              }
              containerId="language-dropdown"
            />

            {formState?.errors.language && formState?.errors.language.type && (
              <S.Error>{formState?.errors.language.message}</S.Error>
            )}

            <InfoName>{t("upsert.date")}</InfoName>
            <S.TextInput
              type="datetime-local"
              min={dateISOFormatter(new Date()).toString()}
              {...register("publishedAt", { required: t("upsert.required") })}
            />
            {formState?.errors.publishedAt &&
              formState?.errors.publishedAt.type && (
                <S.Error>{formState?.errors.publishedAt.message}</S.Error>
              )}
          </S.LeftSection>

          <S.RightSection>
            <S.Subtitle>{t("attributes.image")}</S.Subtitle>
            <S.ItemBox>
              <FileUpload
                onChange={handleImageChange}
                logo={ArticleObject().image}
                value={imageFile}
              />
              <S.ImageRecommendation>
                {t("upsert.imageRecommendation", { size: "328x256" })}
              </S.ImageRecommendation>
            </S.ItemBox>
          </S.RightSection>
        </S.ContentSection>
        <S.ContentSection>
          <S.ButtonContainer>
            <Button
              type="submit"
              color={neutral[50]}
              backgroundColor={neutral[800]}
              value={t("upsert.save")}
              _hover={{ bg: neutral[500] }}
            >
              {t("upsert.save")}
            </Button>

            <Button
              color={neutral[800]}
              backgroundColor={neutral[50]}
              borderColor={neutral[800]}
              border="2px"
              marginLeft="8px"
              onClick={handleCancel}
            >
              {t("upsert.cancel")}
            </Button>
          </S.ButtonContainer>
        </S.ContentSection>
      </form>
      {loading && <Loading />}
    </>
  );
}

UpsertArticleNewsPage.defaultProps = {
  isEdit: false,
};

export default UpsertArticleNewsPage;
