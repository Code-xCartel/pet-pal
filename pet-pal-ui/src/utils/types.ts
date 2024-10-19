import { z, ZodType } from "zod";

export type LoginData = {
  password: string;
  username: string;
};
export type RegisterData = {
  username: string;
  password: string;
  email: string;
};

export const LoginSchema: ZodType<LoginData> = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(8, { message: "Password is too short" }),
});

export const RegisterSchema: ZodType<RegisterData> = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});

export type LoginFormShape = z.infer<typeof LoginSchema>;
export type RegisterFormShape = z.infer<typeof RegisterSchema>;
