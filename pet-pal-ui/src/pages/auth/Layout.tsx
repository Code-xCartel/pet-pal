import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  LoginFormShape,
  RegisterFormShape,
  LoginSchema,
  RegisterSchema,
} from "@/utils/types";

const Layout = () => {
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormShape>({ resolver: zodResolver(LoginSchema) });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormShape>({ resolver: zodResolver(RegisterSchema) });

  const onSubmitLogin: SubmitHandler<LoginFormShape> = async (data) => {
    console.log("Login SUCCESS", data);
  };

  const onSubmitRegister: SubmitHandler<RegisterFormShape> = async (data) => {
    console.log("Registration SUCCESS", data);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#d2c6ec]">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Login</TabsTrigger>
          <TabsTrigger value="password">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login to your existing account.</CardDescription>
            </CardHeader>
            <form onSubmit={handleLoginSubmit(onSubmitLogin)}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="john doe"
                    {...loginRegister("username")}
                  />
                  <span className="text-red-500 text-sm">
                    {loginErrors.username?.message}
                  </span>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="password"
                    {...loginRegister("password")}
                  />
                  <span className="text-red-500 text-sm">
                    {loginErrors.password?.message}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Login</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>Register a new account.</CardDescription>
            </CardHeader>
            <form onSubmit={handleRegisterSubmit(onSubmitRegister)}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="john"
                    {...registerRegister("username")}
                  />
                  <span className="text-red-500 text-sm">
                    {registerErrors.username?.message}
                  </span>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@gmail.com"
                    {...registerRegister("email")}
                  />
                  <span className="text-red-500 text-sm">
                    {registerErrors.email?.message}
                  </span>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="@johndoe"
                    {...registerRegister("password")}
                  />
                  <span className="text-red-500 text-sm">
                    {registerErrors.password?.message}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Register</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Layout;
