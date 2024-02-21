// General
import NotFound from "../../pages/error/NotFound";
import Dashboard from "../../pages/dashboard/Overview";

// Media
import Media from "../../pages/media/Media.js";

// Settings
import Api from "../../pages/settings/Api";
import Email from "../../pages/settings/Email";
import General from "../../pages/settings/General";
import CronJob from "../../pages/settings/CronJob";
import Permalink from "../../pages/settings/Permalink";
import Languages from "../../pages/settings/Languages";
import SocialLogin from "../../pages/settings/SocialLogin";

// Events
import AddEvent from "../../pages/events/AddEvent";
import EditEvent from "../../pages/events/EditEvent";
import ManageEvent from "../../pages/events/ManageEvent";
import EventsCalendar from "../../pages/events/EventsCalendar";

// Organizers
import AddOrganizers from "../../pages/organizers/AddOrganizers";
import EditOrganizers from "../../pages/organizers/EditOrganizers";
import ManageOrganizers from "../../pages/organizers/ManageOrganizers";

// Users
import AddUser from "../../pages/users/AddUser";
import EditUser from "../../pages/users/EditUser";
import UserList from "../../pages/users/UserList";

// Venue
import AddVenue from "../../pages/venue/AddVenue";
import ManageVenue from "../../pages/venue/ManageVenue";

// Categories
import AddCategories from "../../pages/categories/AddCategories";
import EditCategories from "../../pages/categories/EditCategories";
import ManageCategories from "../../pages/categories/ManageCategories";

// Reviews
import ManageReviews from "../../pages/reviews/ManageReviews";
import ReviewsDetail from "../../pages/reviews/ReviewsDetail";

// Pages
import AddPage from "../../pages/pages/AddPage";
import EditPage from "../../pages/pages/EditPage";
import ManagePages from "../../pages/pages/ManagePages";

// Payment
import Transactions from "../../pages/payment/Transactions";
import PaymentMethod from "../../pages/payment/PaymentMethod";
import TransactionDetail from "../../pages/payment/TransactionDetail";



const routes = [
  {
    path: "/",
    component: <Dashboard />,
  },
  {
    path: "/event-managment/events/add",
    component: <AddEvent />,
  },
  {
    path: "/event-managment/events/manage",
    component: <ManageEvent />,
  },
  {
    path: "/event-managment/events/manage/:eventId",
    component: <EditEvent />,
  },
  {
    path: "/event-managment/events/calendar",
    component: <EventsCalendar />,
  },
  {
    path: "/organizers/add",
    component: <AddOrganizers />,
  },
  {
    path: "/organizers/manage",
    component: <ManageOrganizers />,
  },
  {
    path: "/organizers/manage/:organizerId",
    component: <EditOrganizers />,
  },
  {
    path: "/users/list",
    component: <UserList />,
  },
  {
    path: "/users/add",
    component: <AddUser />,
  },
  {
    path: "/users/list/:userid",
    component: <EditUser />,
  },
  {
    path: "/venue/add",
    component: <AddVenue />,
  },
  {
    path: "/venue/manage",
    component: <ManageVenue />,
  },
  {
    path: "/event-managment/categories/manage/add",
    component: <AddCategories />,
  },
  {
    path: "/event-managment/categories/manage",
    component: <ManageCategories />,
  },
  {
    path: "/event-managment/categories/manage/:categoryid",
    component: <EditCategories />,
  },
  {
    path: "/reviews",
    component: <ManageReviews />,
  },
  {
    path: "/reviews/:reviewid",
    component: <ReviewsDetail />,
  },
  {
    path: "/pages",
    component: <ManagePages />,
  },
  {
    path: "/pages/add",
    component: <AddPage />,
  },
  {
    path: "/pages/:pageId",
    component: <EditPage />,
  },
  {
    path: "/payment/transactions",
    component: <Transactions />,
  },
  {
    path: "/payment/transactions/:transactionId",
    component: <TransactionDetail />,
  },
  {
    path: "/payment/payment-method",
    component: <PaymentMethod />,
  },
  {
    path: "/media",
    component: <Media />,
  },
  {
    path: "/setting/general",
    component: <General />,
  },
  {
    path: "/setting/email",
    component: <Email />,
  },
  {
    path: "/setting/cronJob",
    component: <CronJob />,
  },
  {
    path: "/setting/permalink",
    component: <Permalink />,
  },
  {
    path: "/setting/languages",
    component: <Languages />,
  },
  {
    path: "/setting/social-login",
    component: <SocialLogin />,
  },
  {
    path: "/setting/api",
    component: <Api />,
  },
  {
    path: "*",
    component: <NotFound />,
  },
];

export default routes;
