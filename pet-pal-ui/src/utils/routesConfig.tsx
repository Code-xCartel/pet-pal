import Adoption from "@/pages/adoption";
import Boarding from "@/pages/boarding";
import Breeding from "@/pages/breeding";
import Grooming from "@/pages/grooming";
import Home from "@/pages/home";
import PetSocialNetwork from "@/pages/petSocialNetwork";
import ProductStore from "@/pages/productStore";
import VetCare from "@/pages/vetCare";

import { ROUTES } from "@/constants/routes";

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
