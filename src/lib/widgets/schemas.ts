import { z } from "zod";

export const passthroughSchema = z.object({}).passthrough();

export const aucThresholdSchema = z.object({
    initialThreshold: z.number().min(0).max(1).default(0.5),
    prevalence: z.number().min(0).max(1).default(0.5),
    showHint: z.boolean().default(false),
});

export const fairnessAuditSchema = z.object({
    scenario: z.enum(["sepsis", "screening", "triage"]).default("sepsis"),
    focusGroup: z.string().optional(),
});

export const dataLeakageSchema = z.object({
    scenario: z
        .enum(["temporal", "patient", "preprocessing"])
        .default("preprocessing"),
    startToggles: z.array(z.string()).default([]),
});

export type AucThresholdProps = z.infer<typeof aucThresholdSchema>;
export type FairnessAuditProps = z.infer<typeof fairnessAuditSchema>;
export type DataLeakageProps = z.infer<typeof dataLeakageSchema>;
