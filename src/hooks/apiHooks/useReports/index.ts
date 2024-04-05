import { useCallback, useState } from "react";
import reportsApi from "services/api/reportsApi";
import { CreateReport } from "types/apiResponses/report";
import Report from "types/entities/Report";

function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [page, setPage] = useState(1);

  const getReports = useCallback(async () => {
    const { data: allReports } = await reportsApi.getReportsList({
      page,
      perPage: 100,
    });

    setReports((oldReports) => [...oldReports, ...allReports]);

    return allReports;
  }, [page]);

  function incrementPage() {
    setPage((oldPage) => oldPage + 1);
  }

  async function getReport(id: any) {
    const { data: report } = await reportsApi.getReport(id);

    return report;
  }

  async function createReport(data: CreateReport) {
    const report = reportsApi.createReport(data);
    return report;
  }

  async function updateReport(data: CreateReport) {
    const report = reportsApi.updateReport(data.id, data);
    return report;
  }

  return {
    reports,
    getReports,
    incrementPage,
    getReport,
    createReport,
    updateReport,
  };
}

export default useReports;
