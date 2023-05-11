import { Button, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { logError } from "services/crashReport";
import theme from "styles/theme";
import Loading from "components/moleculars/Loading";
import useCauses from "hooks/apiHooks/useCauses";
import InfoName from "components/moleculars/infoName";
import Dropdown from "components/atomics/Dropdown";
import { CreateBigDonation, Cause, BigDonor } from "@ribon.io/shared/types";
import usePersonPayments from "hooks/apiHooks/usePersonPayments";
import useBigDonors from "hooks/apiHooks/useBigDonors";
import { useContract } from "hooks/useContract";
import { useWalletContext } from "contexts/walletContext";
import { useNetworkContext } from "contexts/networkContext";
import useTokenDecimals from "hooks/useTokenDecimals";
import RibonAbi from "utils/abis/RibonAbi.json";
import DonationTokenAbi from "utils/abis/DonationToken.json";
import { formatToDecimals } from "lib/web3Helpers/etherFormatters";
import * as S from "./styles";

function CreateBigDonationPage() {
  const { t } = useTranslation("translation", {
    keyPrefix: "bigDonations",
  });

  const [loading, setLoading] = useState(false);
  const { neutral } = theme.colors;
  const navigate = useNavigate();

  const [causes, setCauses] = useState<Cause[]>([]);
  const { getCauses } = useCauses();
  const [currentCauseId, setCurrentCauseId] = useState<number>(1);

  const [bigDonors, setBigDonors] = useState<BigDonor[]>([]);
  const { getBigDonors } = useBigDonors();
  const [currentBigDonorId, setCurrentBigDonorId] = useState<number>(1);

  const [feeable, setFeeable] = useState<boolean>(true);
  const { currentNetwork } = useNetworkContext();

  const { tokenDecimals } = useTokenDecimals();
  const [currentPool, setCurrentPool] = useState(
    currentNetwork.defaultPoolAddress,
  );

  const { createBigDonation } = usePersonPayments();

  const {
    register,
    getValues: BigDonationObject,
    handleSubmit,
    formState,
    setValue,
  } = useForm<CreateBigDonation>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const toast = useToast();

  const fetchCauses = useCallback(async () => {
    try {
      const allCauses = await getCauses();
      setCauses(allCauses);
    } catch (e) {
      logError(e);
    }
  }, [setCauses]);

  const causeText = (value: any) =>
    causes.find((cause) => cause.id === value)?.name ?? "";

  useEffect(() => {
    fetchCauses();
  }, [fetchCauses]);

  const onCauseIdChanged = (causeId: number) => {
    setCurrentCauseId(causeId);
    const pool =
      causes.find((cause) => cause.id === causeId)?.defaultPool ?? "";
    setCurrentPool(pool);
    setValue("causeId", causeId);
  };

  const fetchBigDonors = useCallback(async () => {
    try {
      const allBigDonors = await getBigDonors();
      setBigDonors(allBigDonors);
    } catch (e) {
      logError(e);
    }
  }, [setBigDonors]);

  const bigDonorText = (value: any) =>
    bigDonors.find((bigDonor) => bigDonor.id === value)?.name ?? "";

  useEffect(() => {
    fetchBigDonors();
  }, [fetchBigDonors]);

  const onBigDonorIdChanged = (causeId: number) => {
    setCurrentBigDonorId(causeId);
    setValue("bigDonorId", causeId);
  };

  const contract = useContract({
    address: currentNetwork.ribonContractAddress,
    ABI: RibonAbi.abi,
  });
  const donationTokenContract = useContract({
    address: currentNetwork.donationTokenContractAddress,
    ABI: DonationTokenAbi.abi,
  });
  const { wallet } = useWalletContext();

  const approveAmount = async () =>
    donationTokenContract?.functions.approve(
      currentNetwork.ribonContractAddress,
      formatToDecimals(BigDonationObject().amount, tokenDecimals).toString(),
      {
        from: wallet,
      },
    );

  const donateToContract = async () =>
    contract?.functions.addPoolBalance(
      currentPool,
      formatToDecimals(BigDonationObject().amount, tokenDecimals).toString(),
      feeable,
    );

  const handleDonationToContract = async () => {
    setLoading(true);
    try {
      const approval = await approveAmount();
      await approval.wait();
      const response = await donateToContract();

      const { hash } = response;

      createBigDonation({
        transactionHash: hash,
        amount: BigDonationObject().amount,
        bigDonorId: currentBigDonorId,
        causeId: currentCauseId,
        integrationId: 1,
        feeable,
      });
      navigate("/big-donors/donations");
    } catch (error) {
      logError(error);
      toast({ status: "error", description: t("create.onErrorMessage") });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/big-donors/donations");
  };

  return (
    <>
      <S.Title>{t("create.title")}</S.Title>
      <form onSubmit={handleSubmit(handleDonationToContract)}>
        <S.ContentSection>
          <S.Subtitle>{t("attributes.donation")}</S.Subtitle>
          <InfoName>{t("attributes.amount")}</InfoName>
          <S.NumberInput
            type="number"
            step="0.01"
            {...register("amount", { required: t("required") })}
          />
          {formState?.errors.amount && formState?.errors.amount.type && (
            <S.Error>{formState?.errors.amount.message}</S.Error>
          )}
          <InfoName>{t("attributes.bigDonor")}</InfoName>
          <Dropdown
            values={bigDonors.map((bigDonor) => bigDonor?.id)}
            onOptionChanged={onBigDonorIdChanged}
            valueText={bigDonorText}
            defaultValue={currentBigDonorId}
            containerId="big-donor-dropdown"
            name="bigDonorId"
          />
          <InfoName>{t("attributes.cause")}</InfoName>
          <Dropdown
            values={causes.map((cause) => cause?.id)}
            onOptionChanged={onCauseIdChanged}
            valueText={causeText}
            defaultValue={currentCauseId}
            containerId="cause-dropdown"
            name="causeId"
          />
          <InfoName>{t("attributes.feeable")}</InfoName>
          <S.CheckboxContainer>
            <S.Checkbox
              name="feeable"
              type="checkbox"
              onChange={(e) => setFeeable(e.target.checked)}
              checked={feeable}
            />
          </S.CheckboxContainer>
        </S.ContentSection>
        <S.ContentSection>
          <S.ButtonContainer>
            <Button
              type="submit"
              color={neutral[50]}
              backgroundColor={neutral[800]}
              _hover={{ bg: neutral[500] }}
              disabled={!formState?.isValid}
            >
              {t("create.save")}
            </Button>

            <Button
              color={neutral[800]}
              backgroundColor={neutral[50]}
              outlineColor={neutral[800]}
              marginLeft="8px"
              onClick={handleCancel}
            >
              {t("create.cancel")}
            </Button>
          </S.ButtonContainer>
        </S.ContentSection>
      </form>
      {loading && <Loading />}
    </>
  );
}

export default CreateBigDonationPage;
