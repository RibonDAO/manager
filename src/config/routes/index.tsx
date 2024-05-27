import { Suspense } from "react";
import DashboardPage from "pages/DashboardPage";
import LoginPage from "pages/LoginPage";
import IntegrationsPage from "pages/integrations/IntegrationsPage";
import IntegrationDetailsPage from "pages/integrations/IntegrationDetailsPage";
import UpsertIntegrationPage from "pages/integrations/UpsertIntegrationPage";
import PurchasesPage from "pages/PurchasesPage";
import { Routes, Route } from "react-router-dom";
import MainLayout from "layouts/MainLayout";
import CausesPage from "pages/causes/CausesPage";
import CausesDetailsPage from "pages/causes/CausesDetailsPage";
import UpsertCausePage from "pages/causes/UpsertCausePage";
import NonProfitsPage from "pages/NonProfitsPage";
import NewsPage from "pages/news/NewsPage";
import UpsertNonProfitPage from "pages/NonProfitsPage/UpsertNonProfitPage";
import OfferDetailsPage from "pages/offers/offerDetailsPage";
import OffersPage from "pages/offers/OffersPage";
import UpsertOfferPage from "pages/offers/UpsertOfferPage";
import SettingsPage from "pages/SettingsPage";
import EditSettingsPage from "pages/SettingsPage/EditSettingsPage";
import NonProfitsDetailsPage from "pages/NonProfitsPage/NonProfitsDetailsPage";
import ImpactsPage from "pages/NonProfitsPage/ImpactsPage";
import NewsDetailsPage from "pages/news/NewsDetailsPage";
import BigDonorsPage from "pages/bigDonors/BigDonorsPage";
import BigDonationsPage from "pages/bigDonors/BigDonationsPage";
import BigDonationsDetailsPage from "pages/bigDonors/BigDonationsDetailsPage";
import UpsertBigDonorPage from "pages/bigDonors/UpsertBigDonorsPage";
import UpsertArticleNewsPage from "pages/news/UpsertArticleNewsPage";
import WalletLayout from "layouts/WalletLayout";
import WalletProvider from "contexts/walletContext";
import NetworkProvider from "contexts/networkContext";
import UrlBuilder from "pages/urlBuilder";
import CreateBigDonationsPage from "pages/bigDonors/CreateBigDonationsPage";
import ImpressionCardsPage from "pages/impressionCards/ImpressionCardsPage";
import UpsertImpressionCardPage from "pages/impressionCards/UpsertImpressionCardPage";
import ImpressionCardDetailsPage from "pages/impressionCards/ImpressionCardDetailsPage";
import ReportDetailPage from "pages/reports/ReportDetailsPage";
import ReportsPage from "pages/reports/ReportsPage";
import UpsertReportPage from "pages/reports/UpsertReportPage";
import CouponsPage from "pages/coupons/CouponsPage";
import CouponDetailsPage from "pages/coupons/CouponDetailsPage";
import UpsertCouponPage from "pages/coupons/UpsertCouponPage";
import UpsertTagPage from "pages/tags/UpsertTagPage";
import TagsPage from "pages/tags/TagsPage";
import TagDetailsPage from "pages/tags/TagDetailsPage";
import DirectTransferSubscriptionPage from "pages/DirectTransferSubscriptionPage";
import Navigation from "./Navigation";
import PrivateRoute from "./privateRoute";

function RoutesComponent(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <NetworkProvider>
                <Navigation />
                <MainLayout>
                  <DashboardPage />
                </MainLayout>
              </NetworkProvider>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/integrations"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <IntegrationsPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/integrations/new"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <UpsertIntegrationPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/integrations/:id"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <IntegrationDetailsPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/integrations/:id/edit"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <UpsertIntegrationPage isEdit />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/purchases"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <PurchasesPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/causes"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <CausesPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/causes/new"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <UpsertCausePage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/causes/:id"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <CausesDetailsPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/causes/:id/edit"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <UpsertCausePage isEdit />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/ngos"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <NonProfitsPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/ngos/new"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <UpsertNonProfitPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/ngos/:id"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <NonProfitsDetailsPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/ngos/:id/edit"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <UpsertNonProfitPage isEdit />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/news/articles"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <NewsPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/news/articles/:id"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <NewsDetailsPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="news/articles/new"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <UpsertArticleNewsPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/news/articles/:id/edit"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <UpsertArticleNewsPage isEdit />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/offers"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <OffersPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/offers/:id"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <OfferDetailsPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/offers/new"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <UpsertOfferPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/offers/:id/edit"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <UpsertOfferPage isEdit />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/big-donors/index"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <BigDonorsPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/big-donors/new"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <UpsertBigDonorPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/big-donors/:id/edit"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <UpsertBigDonorPage isEdit />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/big-donors/donations"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <NetworkProvider>
                <WalletProvider>
                  <Navigation />

                  <WalletLayout>
                    <BigDonationsPage />
                  </WalletLayout>
                </WalletProvider>
              </NetworkProvider>
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route
        path="/big-donors/donations/new"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <NetworkProvider>
                <WalletProvider>
                  <Navigation />

                  <WalletLayout>
                    <CreateBigDonationsPage />
                  </WalletLayout>
                </WalletProvider>
              </NetworkProvider>
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route
        path="/big-donors/donations/:id"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <BigDonationsDetailsPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/impression-cards"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <ImpressionCardsPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/impression-cards/new"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <UpsertImpressionCardPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/impression-cards/:id/edit"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <UpsertImpressionCardPage isEdit />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/impression-cards/:id"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <ImpressionCardDetailsPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <ReportsPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/reports/:id"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <ReportDetailPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/reports/:id/edit"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <UpsertReportPage isEdit />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/reports/new"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <UpsertReportPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/coupons"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <CouponsPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/coupons/:id"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <CouponDetailsPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/coupons/new"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <UpsertCouponPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/coupons/:id/edit"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <UpsertCouponPage isEdit />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <SettingsPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/settings/edit"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <EditSettingsPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/tags"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <TagsPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/tags/:id"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <TagDetailsPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/tags/new"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <UpsertTagPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/tags/:id/edit"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <UpsertTagPage isEdit />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/ngos/:id/impacts"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <ImpactsPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route
        path="/url-builder"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <UrlBuilder />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/direct-transfer-subscriptions"
        element={
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <Navigation />
              <MainLayout>
                <DirectTransferSubscriptionPage />
              </MainLayout>
            </Suspense>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default RoutesComponent;
