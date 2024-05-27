import { Button } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { logError } from "services/crashReport";
import theme from "styles/theme";
import Tag from "types/entities/Tag";
import useTags from "hooks/apiHooks/useTags";
import Dropdown from "components/atomics/Dropdown";

// import Select from "react-select";
import useNonProfits from "hooks/apiHooks/useNonProfits";
import NonProfit from "types/entities/NonProfit";

import * as S from "./styles";

export type Props = {
  isEdit?: boolean;
};

function UpsertTagPage({ isEdit }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "tags",
  });

  const mode = isEdit ? "edit" : "create";

  const { neutral } = theme.colors;
  const navigate = useNavigate();
  const { id } = useParams();
  const { getTag, createTag, updateTag } = useTags();
  const [nonProfits, setNonProfits] = useState<NonProfit[]>([]);
  const { getNonProfits } = useNonProfits();
  const [currentNonProfits, setCurrentNonProfits] = useState<any[]>();
  const {
    register,
    setValue,
    getValues: tag,
    reset,
    handleSubmit,
    formState,
  } = useForm<Tag>({ mode: "onChange", reValidateMode: "onChange" });

  const [statusTag, setStatusTag] = useState("active");
  const [selectedNonProfits, setSelectedNonProfits] = useState<any>();

  const fetchTag = useCallback(async () => {
    try {
      const apiTag = await getTag(id);
      
      setStatusTag(apiTag.status);
      const defaultSelectedNonProfits = apiTag.nonProfits?.map(
        (nonProfit: any) => ({
          label: nonProfit.name,
          value: nonProfit.id,
        }),
        );
        
        setCurrentNonProfits(defaultSelectedNonProfits);
        reset(apiTag);
      } catch (e) {
        logError(e);
      }
    }, []);
    
    const fetchNonProfits = useCallback(async () => {
      try {
        const allNonProfits = await getNonProfits();
        setNonProfits(allNonProfits);
      } catch (e) {
        logError(e);
      }
    }, [setNonProfits]);
    
    const onStatusChanged = (status: string) => {
      setValue("status", status);
      setStatusTag(status);
    };
    
    const onNonProfitChanged = (nonProfit: any) => {
      setSelectedNonProfits(nonProfit);
    };
    
    const handleSave = async () => {
      if (tag()) {
        const tagObject: any = {
          id: tag().id,
          name: tag().name,
          status: "active",
          nonProfitTagsAttributes: selectedNonProfits?.map((nonProfit: any) => ({
            nonProfitId: nonProfit.value,
          })),
        };
        
        try {
          if (isEdit) {
            await updateTag(tagObject);
          } else {
            await createTag(tagObject);
          }
          navigate("/tags");
        } catch (e) {
          logError(e);
        }
      }
    };
    
    const handleCancel = () => {
      navigate("/tags");
    };
    
    useEffect(() => {
      fetchNonProfits();
      if (isEdit) {
        fetchTag();
      } else {
        const newTag: any = {
          name: "name",
          status: true,
        };
        reset(newTag);
      }
    }, []);
    
    useEffect(() => {
      if (currentNonProfits) {
        setSelectedNonProfits(currentNonProfits);
      }
    }, [currentNonProfits]);
    
    const labeledNonProfits = nonProfits.map((nonProfit) => ({
      label: nonProfit.name,
      value: nonProfit.id,
    }));
    
    console.log(onNonProfitChanged, labeledNonProfits)
    return (
      <>
      <S.Title>{t(`upsert.${mode}.title`)}</S.Title>
      <form onSubmit={handleSubmit(handleSave)}>
        <S.Container>
          <S.Subtitle>{t("attributes.status")}</S.Subtitle>
          <S.StatusContainer>
            <Dropdown
              values={["active", "inactive", "test"]}
              onOptionChanged={onStatusChanged}
              defaultValue={statusTag}
              containerId="status-dropdown"
              name="status"
            />
          </S.StatusContainer>
          <br />
          <S.Subtitle>{t("attributes.details")}</S.Subtitle>
          <S.ContentSection>
            <S.LeftSection>
              <S.SubtitleDescription>
                {t("attributes.name")}
              </S.SubtitleDescription>
              <S.TextInput
                type="text"
                {...register("name", { required: t("upsert.required") })}
              />
              {formState?.errors.name && formState?.errors.name.type && (
                <S.Error>{formState?.errors.name.message}</S.Error>
              )}

              <S.SubtitleDescription>
                {t("attributes.nonProfits")}
              </S.SubtitleDescription>

              {/* <Select
                defaultValue={currentNonProfits}
                isMulti
                options={labeledNonProfits}
                onChange={(value) => onNonProfitChanged(value)}
                value={selectedNonProfits}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: "black",
                    "&:hover": { borderColor: "black" },
                    boxShadow: state.isFocused ? "0 0 0 1px black" : "none",
                    color: "black",
                    "::placeholder": { color: "black" },
                    borderRadius: "8px",
                    padding: "4px",
                    marginTop: "8px",
                  }),
                }}
                name="nonProfitsTags"
              /> */}
            </S.LeftSection>
          </S.ContentSection>
        </S.Container>
        <S.ContentSection>
          <S.ButtonContainer>
            <Button
              type="submit"
              color={neutral[50]}
              backgroundColor={neutral[800]}
              _hover={{ bg: neutral[500] }}
              disabled={!formState?.isValid}
            >
              {t(`upsert.${mode}.save`)}
            </Button>

            <Button
              color={neutral[800]}
              backgroundColor={neutral[50]}
              outlineColor={neutral[800]}
              marginLeft="8px"
              onClick={handleCancel}
            >
              {t(`upsert.${mode}.cancel`)}
            </Button>
          </S.ButtonContainer>
        </S.ContentSection>
      </form>
    </>
  );
}

UpsertTagPage.defaultProps = {
  isEdit: false,
};

export default UpsertTagPage;
