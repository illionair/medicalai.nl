# Article interactive modules

These React modules are registered in `src/components/interactives/InteractiveSlot.tsx`.
Use them in Markdown with:

```html
<interactive name="module-name"></interactive>
```

## Available modules

- `checklist-10min` - interactive 10-minute article appraisal checklist.
- `auc-playground` - threshold, ROC space, confusion matrix and PPV/NPV demo.
- `calibration-simulator` - predicted versus observed risk calibration plot.
- `clinical-utility-calculator` - net benefit style educational calculator.
- `data-leakage-simulator` - toggles showing inflated internal AUC versus external performance.
- `deployment-ladder` - staged rollout visual from retrospective testing to live deployment.
- `fairness-audit-simulator` - subgroup threshold and false-positive burden demo.
- `llm-safety-matrix` - task-based LLM risk and guardrail matrix.
- `mdr-claim-checker` - educational MDR/SaMD claim-check quiz.
- `rag-chunking-demo` - chunk size and retrieval context demo.
- `validation-shift-map` - internal, temporal and external validation comparison.
- `visual-policy` - internal image/licence policy card.
- `workflow-failure-map` - workflow risk toggles for clinical implementation.
- `privacy-architecture-map` - cloud/on-premise/federated learning visual.

## Priority mapping

- AUC article: `auc-playground`
- Calibration article: `calibration-simulator`
- Clinical utility article: `clinical-utility-calculator`
- Data leakage article: `data-leakage-simulator`
- Deployment article: `deployment-ladder`
- Fairness article: `fairness-audit-simulator`
- LLM article: `llm-safety-matrix`
- MDR/FDA/CE articles: `mdr-claim-checker`
- RAG article: `rag-chunking-demo`
- Validation articles: `validation-shift-map`
- Workflow article: `workflow-failure-map`
- Privacy article: `privacy-architecture-map`

All modules use fictitious data and include an educational disclaimer. They are not medical, legal, regulatory, or diagnostic decision tools.
