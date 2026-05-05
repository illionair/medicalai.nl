import type { ComponentType } from "react";
import { z, type ZodType } from "zod";
import {
    AucPairs,
    AucPlayground,
    AucRoc,
    AucScores,
    AucThreshold,
    CalibrationSimulator,
    ClinicalUtilityCalculator,
    DataLeakageSimulator,
    DeploymentLadder,
    FairnessAuditSimulator,
    HyperparameterTuningLab,
    LlmSafetyMatrix,
    MdrClaimChecker,
    ModelFamilyMap,
    PrivacyArchitectureMap,
    RagChunkingDemo,
    ValidationShiftMap,
    VisualPolicyCard,
    WorkflowFailureMap,
} from "@/components/interactives/ArticleInteractives";
import ChecklistScore from "@/components/interactives/ChecklistScore";
import {
    aucThresholdSchema,
    dataLeakageSchema,
    fairnessAuditSchema,
    passthroughSchema,
} from "./schemas";

type WidgetEntry = {
    schema: ZodType<Record<string, unknown>>;
    component: ComponentType<Record<string, unknown>>;
};

function entry<S extends ZodType<Record<string, unknown>>>(
    schema: S,
    component: ComponentType<z.infer<S>>,
): WidgetEntry {
    return {
        schema,
        component: component as unknown as ComponentType<Record<string, unknown>>,
    };
}

export const WIDGETS: Record<string, WidgetEntry> = {
    "checklist-10min": entry(passthroughSchema, ChecklistScore as ComponentType<Record<string, unknown>>),
    "auc-playground": entry(passthroughSchema, AucPlayground as ComponentType<Record<string, unknown>>),
    "auc-scores": entry(passthroughSchema, AucScores as ComponentType<Record<string, unknown>>),
    "auc-threshold": entry(aucThresholdSchema, AucThreshold),
    "auc-roc": entry(passthroughSchema, AucRoc as ComponentType<Record<string, unknown>>),
    "auc-pairs": entry(passthroughSchema, AucPairs as ComponentType<Record<string, unknown>>),
    "calibration-simulator": entry(passthroughSchema, CalibrationSimulator as ComponentType<Record<string, unknown>>),
    "clinical-utility-calculator": entry(passthroughSchema, ClinicalUtilityCalculator as ComponentType<Record<string, unknown>>),
    "data-leakage-simulator": entry(dataLeakageSchema, DataLeakageSimulator),
    "deployment-ladder": entry(passthroughSchema, DeploymentLadder as ComponentType<Record<string, unknown>>),
    "fairness-audit-simulator": entry(fairnessAuditSchema, FairnessAuditSimulator),
    "hyperparameter-tuning-lab": entry(passthroughSchema, HyperparameterTuningLab as ComponentType<Record<string, unknown>>),
    "llm-safety-matrix": entry(passthroughSchema, LlmSafetyMatrix as ComponentType<Record<string, unknown>>),
    "mdr-claim-checker": entry(passthroughSchema, MdrClaimChecker as ComponentType<Record<string, unknown>>),
    "model-family-map": entry(passthroughSchema, ModelFamilyMap as ComponentType<Record<string, unknown>>),
    "rag-chunking-demo": entry(passthroughSchema, RagChunkingDemo as ComponentType<Record<string, unknown>>),
    "validation-shift-map": entry(passthroughSchema, ValidationShiftMap as ComponentType<Record<string, unknown>>),
    "visual-policy": entry(passthroughSchema, VisualPolicyCard as ComponentType<Record<string, unknown>>),
    "workflow-failure-map": entry(passthroughSchema, WorkflowFailureMap as ComponentType<Record<string, unknown>>),
    "privacy-architecture-map": entry(passthroughSchema, PrivacyArchitectureMap as ComponentType<Record<string, unknown>>),
};

export type ResolvedWidget =
    | { ok: true; Component: ComponentType<Record<string, unknown>>; props: Record<string, unknown> }
    | { ok: false; reason: "unknown" | "invalid-json" | "invalid-props"; detail?: string };

export function resolveWidget(name: string | undefined, rawProps?: string): ResolvedWidget {
    if (!name) return { ok: false, reason: "unknown" };
    const entry = WIDGETS[name];
    if (!entry) return { ok: false, reason: "unknown", detail: name };

    let parsedRaw: unknown = {};
    if (rawProps && rawProps.trim()) {
        try {
            parsedRaw = JSON.parse(rawProps);
        } catch (error) {
            return {
                ok: false,
                reason: "invalid-json",
                detail: error instanceof Error ? error.message : "JSON parse error",
            };
        }
    }

    const result = entry.schema.safeParse(parsedRaw);
    if (!result.success) {
        return {
            ok: false,
            reason: "invalid-props",
            detail: result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "),
        };
    }

    return { ok: true, Component: entry.component, props: result.data };
}
