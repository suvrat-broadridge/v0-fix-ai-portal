# B-COMET Platform - Complete Screen Transitions & Navigation Map

**Generated:** 4/22/2026  
**Total Screens:** 60  
**Total Transitions:** 12+ Primary Flows

---

## 1. Authentication & Role Selection Flow

```
┌─────────────────────────────────────────────────────────┐
│  home                                                   │
│  (Landing Page)                                         │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│  role-select                                            │
│  (Choose Admin or Client Role)                          │
└────┬─────────────────────────────────────┬──────────────┘
     │ ADMIN PATH                          │ CLIENT PATH
     ▼                                     ▼
┌──────────────┐                    ┌──────────────┐
│  login       │                    │  login       │
│  (Admin)     │                    │  (Client)    │
└──────┬───────┘                    └──────┬───────┘
       │                                   │
       ▼                                   ▼
┌──────────────┐                    ┌──────────────┐
│  dashboard   │                    │  clients     │
│  (Admin)     │                    │  (Client)    │
└──────────────┘                    └──────────────┘
```

---

## 2. Admin Dashboard Flow

```
┌─────────────────────────────────────────────────────────┐
│  dashboard (Admin)                                      │
│  - Admin Overview                                       │
│  - Key Metrics                                          │
│  - Client Management Access                            │
└────┬────────────┬───────────┬─────────┬────────────────┘
     │            │           │         │
     ▼            ▼           ▼         ▼
 clients    workflow-    asset-    settings
 (Manage)   overview     tools
            (Overview)   (Tools)
```

---

## 3. Client & Asset Management Flow

```
┌────────────────────────────────────────┐
│  clients (Client List)                 │
└────────────────┬──────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────┐
│  client-detail (Individual Client)     │
└────┬─────────────┬────────────┬────────┘
     │             │            │
     ▼             ▼            ▼
asset-tools  client-specs  client-log-files
(Per Class)  (Specs)       (Log Files)
     │             │            │
     ▼             ▼            ▼
 [5 Asset      spec-compare  log-analysis
  Classes]     (Compare)     (Analysis)
```

---

## 4. Workflow & Case Management Flow

```
┌──────────────────────────────────────────────────────────┐
│  workflow-overview (Main Workflow Dashboard)            │
└────┬──────────┬────────────┬──────────┬────────┬────────┘
     │          │            │          │        │
     ▼          ▼            ▼          ▼        ▼
case-      intake-     spec-compare  atdl-    scenario-
workflow   portal      (Compare      workbench creation
           (New Cases) Specs)        (ATDL)   (Scenarios)
     │          │            │          │        │
     ▼          ▼            ▼          ▼        ▼
  [Case    [New Case   [Compare     [ATDL     [Scenario
   Details] Form]       Views]       Tools]     Tools]
```

---

## 5. ATDL (Algorithmic Trading Definition Language) Workflow

```
┌─────────────────────────────────────────────────────────┐
│  atdl-workbench (ATDL Main Interface)                  │
└────┬────────┬────────┬────────┬────────┬───────────────┘
     │        │        │        │        │
     ▼        ▼        ▼        ▼        ▼
atdl-    atdl-    atdl-     atdl-    atdl-
wizard   validate  compare   ui-repr  guided-
(Wizard) (Validate) (Compare) (UI)     choices
     │        │        │        │        │
     ▼        ▼        ▼        ▼        ▼
atdl-flow-select → [Flow Definitions]
     │
     ▼
atdl-remediation (Fix Issues)
     │
     ▼
fix-atdl-compare (Review Fixes)
     │
     ▼
fix-to-atdl (Convert FIX to ATDL)
```

---

## 6. Testing & Certification Flow

```
┌────────────────────────────────────────┐
│  test-case-gen (Generate Test Cases)  │
└────────────┬─────────────────────────┘
             │
             ▼
┌────────────────────────────────────────┐
│  test-execution (Execute Tests)        │
└────────────┬─────────────────────────┘
             │
             ▼
┌────────────────────────────────────────┐
│  test-results (View Test Results)      │
└────────────┬─────────────────────────┘
             │
             ▼
┌────────────────────────────────────────┐
│  certification-gen (Generate Cert)     │
└────────────┬─────────────────────────┘
             │
             ▼
┌────────────────────────────────────────┐
│  client-cert-report (Client Views)     │
└────────────────────────────────────────┘
```

---

## 7. Onboarding & Case Creation Flow

```
┌────────────────────────────────────┐
│  onboarding-cases (Cases List)     │
└────────────┬──────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│  create-case (Create New Case)     │
└────────────┬──────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│  onboarding-case-detail (Details)  │
└────────────────────────────────────┘
```

---

## 8. Go-Live & Deployment Flow

```
┌─────────────────────────────────────────┐
│  approvals (Approve for Go-Live)       │
└────────────┬──────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│  go-live (Execute Go-Live)             │
└────────────┬──────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│  go-live-manager (Manage Go-Live)      │
└────────────┬──────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│  post-go-live (Post-Deployment Checks) │
└─────────────────────────────────────────┘
```

---

## 9. Comparison & Analysis Tools

```
SPEC COMPARISON PATH:
spec-compare (Main) → spec-compare-overview (Overview)

LOG ANALYSIS PATH:
log-analysis (Analyze Logs) → [Results]

ATDL COMPARISON PATH:
atdl-compare (Compare ATDL) → fix-atdl-compare (Fix Comparisons)

FIX TOOLS:
fix-dictionary (Reference) → fix-msg-creator (Create Messages)

CONNECTIVITY:
connectivity-setup (Setup) → connectivity-test (Test Connection)
```

---

## 10. Configuration & Settings Flow

```
┌─────────────────────────────────────┐
│  settings (Main Settings)           │
└────┬────────┬────────────┬──────────┘
     │        │            │
     ▼        ▼            ▼
session-  field-      prod-config
config    mapping     (Production)
(Session) (Field Map)
     │        │            │
     ▼        ▼            ▼
fix-msg-  connectivity  rule-library
creator   setup/test    (Rules)
(Creator) (Connectivity)
```

---

## 11. Analytics & Monitoring Flow

```
┌────────────────────────────────────────┐
│  dashboard (Analytics Overview)        │
└────┬──────────┬────────────┬───────────┘
     │          │            │
     ▼          ▼            ▼
sla-       ai-review-    gap-analysis
analytics  queue         (Gap Analysis)
           (AI Queue)
     │          │            │
     ▼          ▼            ▼
reports    [AI      [Analysis
(Reports)  Reviews] Results]
```

---

## 12. Evidence & Documentation Flow

```
┌──────────────────────────────────────┐
│  document-ingestion (Ingest Docs)    │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  evidence-vault (Store Evidence)     │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  analysis-remediation (Analyze)      │
└──────────────────────────────────────┘
```

---

## 13. Additional Pages & Views

```
presentation (Presentation Mode)
cert-planning (Certification Planning)
cert-decisioning (Certification Decision)
signoff-module (Sign-off Module)
counterparty-profile (Counterparty Profile)
admin-specs (Admin Specs)
client-specs (Client Specs)
```

---

## Summary Statistics

| Category | Count | Screens |
|----------|-------|---------|
| Authentication | 2 | home, role-select, login |
| Dashboard & Navigation | 3 | dashboard, clients, client-detail |
| Workflow & Case Mgmt | 6 | workflow-overview, case-workflow, intake-portal, create-case, onboarding-cases, onboarding-case-detail |
| ATDL Tools | 10 | atdl-workbench, atdl-wizard, atdl-validate, atdl-compare, atdl-ui-repr, atdl-guided-choices, atdl-flow-select, atdl-remediation, fix-atdl-compare, fix-to-atdl |
| Testing & Certification | 5 | test-case-gen, test-execution, test-results, certification-gen, client-cert-report |
| Comparison & Analysis | 6 | spec-compare, spec-compare-overview, log-analysis, atdl-compare, fix-atdl-compare, fix-dictionary |
| Configuration | 8 | settings, session-config, field-mapping, fix-msg-creator, connectivity-setup, connectivity-test, prod-config, rule-library |
| Go-Live & Deployment | 4 | approvals, go-live, go-live-manager, post-go-live |
| Analytics | 4 | sla-analytics, ai-review-queue, gap-analysis, reports |
| Evidence & Documentation | 3 | document-ingestion, evidence-vault, analysis-remediation |
| Client Assets | 2 | asset-tools, client-log-files, client-specs, client-cert-report |
| Additional | 4 | presentation, cert-planning, cert-decisioning, signoff-module, counterparty-profile, admin-specs |
| **TOTAL** | **60** | All screens captured |

---

## Key Navigation Principles

1. **Two-Role Architecture**: Admin and Client role-based navigation
2. **Hierarchical Workflows**: From planning → execution → certification → go-live
3. **Tool-Specific Flows**: Dedicated tools for ATDL, Testing, Configuration, and Analysis
4. **Comparison-First Design**: Multiple comparison views for specs, logs, and ATDL definitions
5. **Evidence-Driven**: Document ingestion → vault → analysis workflow
6. **Connectivity-Aware**: Setup and test connectivity before go-live

---

## Access the Screenshots

Visit the interactive gallery at: `/screenshots/index.html`

All 60 screens are organized in a visual grid with status indicators and transition information.
