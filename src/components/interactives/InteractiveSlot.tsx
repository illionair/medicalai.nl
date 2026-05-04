import ChecklistScore from "./ChecklistScore";
import {
    AucPlayground,
    CalibrationSimulator,
    ClinicalUtilityCalculator,
    DataLeakageSimulator,
    DeploymentLadder,
    FairnessAuditSimulator,
    LlmSafetyMatrix,
    MdrClaimChecker,
    PrivacyArchitectureMap,
    RagChunkingDemo,
    ValidationShiftMap,
    VisualPolicyCard,
    WorkflowFailureMap,
} from "./ArticleInteractives";

const REGISTRY: Record<string, React.ComponentType> = {
    "checklist-10min": ChecklistScore,
    "auc-playground": AucPlayground,
    "calibration-simulator": CalibrationSimulator,
    "clinical-utility-calculator": ClinicalUtilityCalculator,
    "data-leakage-simulator": DataLeakageSimulator,
    "deployment-ladder": DeploymentLadder,
    "fairness-audit-simulator": FairnessAuditSimulator,
    "llm-safety-matrix": LlmSafetyMatrix,
    "mdr-claim-checker": MdrClaimChecker,
    "rag-chunking-demo": RagChunkingDemo,
    "validation-shift-map": ValidationShiftMap,
    "visual-policy": VisualPolicyCard,
    "workflow-failure-map": WorkflowFailureMap,
    "privacy-architecture-map": PrivacyArchitectureMap,
};

export default function InteractiveSlot({ name }: { name?: string }) {
    if (!name) return null;
    const Component = REGISTRY[name];
    if (!Component) {
        return (
            <div className="my-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                Onbekende interactieve module: <code>{name}</code>
            </div>
        );
    }
    return <Component />;
}
