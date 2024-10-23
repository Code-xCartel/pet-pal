import { ROUTES } from "@/constants/routes";
import Adoption from "@/pages/adoption";
import Boarding from "@/pages/Boarding";
import Breeding from "@/pages/Breeding";
import Grooming from "@/pages/grooming";
import Home from "@/pages/home";
import PetSocialNetwork from "@/pages/petSocialNetwork";
import ProductStore from "@/pages/productStore";
import VetCare from "@/pages/VetCare";

export type RouteConfig = {
  path: string;
  element: React.ReactNode;
  requiredSubscription: "basic" | "plus" | "gold";
};

export const routesConfig: RouteConfig[] = [
  { path: ROUTES.HOME, element: <Home />, requiredSubscription: "basic" },
  {
    path: ROUTES.ADOPTION,
    element: <Adoption />,
    requiredSubscription: "basic",
  },
  {
    path: ROUTES.STORE,
    element: <ProductStore />,
    requiredSubscription: "basic",
  },
  {
    path: ROUTES.GROOMING,
    element: <Grooming />,
    requiredSubscription: "basic",
  },
  {
    path: ROUTES.BOARDING,
    element: <Boarding />,
    requiredSubscription: "plus",
  },
  {
    path: ROUTES.BREEDING,
    element: <Breeding />,
    requiredSubscription: "plus",
  },
  { path: ROUTES.VET_CARE, element: <VetCare />, requiredSubscription: "gold" },
  {
    path: ROUTES.SOCIAL_NETWORK,
    element: <PetSocialNetwork />,
    requiredSubscription: "gold",
  },
];
