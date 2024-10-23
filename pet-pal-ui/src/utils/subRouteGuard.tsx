import { PropsWithChildren } from "react";
import { getUser } from "./user";
import Subscriptions from "@/pages/subscriptions";
import AuthLayout from "@/pages/auth/authLayout";

type SubscriptionLevel = "basic" | "plus" | "gold";

type SubRouteGuardProps = PropsWithChildren<{
  requiredSubscription: SubscriptionLevel;
}>;

const isValidSubscriptionLevel = (
  level: string
): level is SubscriptionLevel => {
  return ["basic", "plus", "gold"].includes(level);
};

const SubRouteGuard = ({
  requiredSubscription,
  children,
}: SubRouteGuardProps) => {
  const user = getUser();

  if (!user) {
    return <AuthLayout />;
  }

  const subscriptionLevels: Record<SubscriptionLevel, number> = {
    basic: 0,
    plus: 1,
    gold: 2,
  };

  if (!isValidSubscriptionLevel(user.subscription_model)) {
    return <Subscriptions />;
  }

  const userLevel = subscriptionLevels[user.subscription_model];
  const requiredLevel = subscriptionLevels[requiredSubscription];

  if (userLevel >= requiredLevel) {
    return <>{children}</>;
  }

  return <Subscriptions />;
};

export default SubRouteGuard;
