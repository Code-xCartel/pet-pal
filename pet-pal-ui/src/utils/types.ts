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
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" })
    .max(12, { message: "Password must not exceed 12 characters" }),
});

export const RegisterSchema: ZodType<RegisterData> = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" })
    .max(12, { message: "Password must not exceed 12 characters" }),
});

export type LoginFormShape = z.infer<typeof LoginSchema>;
export type RegisterFormShape = z.infer<typeof RegisterSchema>;
