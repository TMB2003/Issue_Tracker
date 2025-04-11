import { z } from "@/node_modules/zod/lib/external";

export const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    descritpion: z.string().min(1, "Description is required"),
});
