import {z} from "zod";

export const createUserSchema = z.object({
    userName: z.string().min(3, "Username is required").max(20, "Username must be less than 20 characters"),
    password: z.string().min(6, "Password is required").max(20, "Password must be less than 20 characters"),
    name: z.string()
})

export const SignInSchema = z.object({
    userName: z.string().min(3, "Username is required").max(20, "Username must be less than 20 characters"),
    password: z.string().min(6, "Password is required").max(20, "Password must be less than 20 characters"),
})

export const createRoomSchema = z.object({
    name: z.string().min(3, "Room name is required").max(20, "Room name must be less than 20 characters"),
})