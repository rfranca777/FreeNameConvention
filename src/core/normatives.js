'use strict';

/**
 * FreeNameConvention — International Normatives Database v2.0
 *
 * 25+ normatives from Brazil, USA, EU, Israel and global standards.
 * Each entry includes ready-to-use patterns.
 *
 * IMPORTANT: Examples use ONLY normative-neutral references.
 * No client names, no accounting-specific terminology in placeholders.
 */

const normatives = [

  // ═══════════════════════════════════════════════════════════════════════════
  // QUALITY & MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'iso9001',
    name: 'ISO 9001:2015',
    fullName: 'ISO 9001 — Quality Management System',
    area: 'Quality',
    sectors: ['Industry', 'Services', 'All'],
    countries: ['Global'],
    obligation: 'mandatory',
    requirement: 'Clause 7.5 requires control of documented information: identification (title, date, author, reference number), format, media, and review/approval. Documents must be identifiable and traceable.',
    patterns: [
      { name: 'Procedure / Policy',       template: '{ENUM:PRC|POL|INS|MAN}-{NUM:4}-{VERSION}-{DATE:YYYYMMDD}',       example: 'PRC-0042-v02-20260301',          extensions: ['pdf','docx'] },
      { name: 'Form / Record',            template: 'FRM-{NUM:4}-{DATE:YYYYMMDD}',                                     example: 'FRM-0015-20260301',              extensions: ['pdf','xlsx'] },
      { name: 'Work Instruction',          template: 'IT-{NUM:4}-{TEXT}-{VERSION}',                                     example: 'IT-0007-Assembly-v01',           extensions: ['pdf'] }
    ]
  },
  {
    id: 'iso13485',
    name: 'ISO 13485:2016',
    fullName: 'ISO 13485 — Medical Devices — QMS',
    area: 'Quality',
    sectors: ['Healthcare', 'Medical Devices', 'Pharmaceutical'],
    countries: ['Global'],
    obligation: 'mandatory',
    requirement: 'Clause 4.2.4 requires record control with identification, storage, protection, retrieval, retention time, and disposal. Batch/serial traceability is mandatory.',
    patterns: [
      { name: 'Batch Record',             template: 'RLO-{NUM:8}-{TEXT}-{DATE:YYYYMMDD}',                              example: 'RLO-20260001-DeviceX-20260301',  extensions: ['pdf'] },
      { name: 'Non-conformity',            template: 'NC-{NUM:5}-{DATE:YYYY-MM-DD}',                                   example: 'NC-00023-2026-03-01',            extensions: ['pdf','docx'] }
    ]
  },
  {
    id: 'iso15489',
    name: 'ISO 15489-1:2016',
    fullName: 'ISO 15489 — Records Management',
    area: 'Document Management',
    sectors: ['Government', 'Legal', 'All'],
    countries: ['Global'],
    obligation: 'recommended',
    requirement: 'Defines requirements for naming, classification, metadata, and retention of corporate records. Recommends controlled vocabulary in file names to ensure context without opening the document.',
    patterns: [
      { name: 'Corporate Document',        template: '{ENUM:CONT|REP|MIN|MEMO|OFF}-{NUM:5}-{TEXT}-{DATE:YYYY-MM-DD}',  example: 'REP-00123-Strategy-2026-03-01',  extensions: ['pdf'] },
      { name: 'Correspondence',             template: 'CORR-{DATE:YYYYMMDD}-{TEXT}',                                    example: 'CORR-20260301-Board',            extensions: ['pdf','msg'] }
    ]
  },
  {
    id: 'iso27001',
    name: 'ISO 27001:2022',
    fullName: 'ISO 27001 — Information Security Management System',
    area: 'Information Security',
    sectors: ['IT', 'Financial', 'All'],
    countries: ['Global'],
    obligation: 'mandatory',
    requirement: 'Control A.5.12 (Information classification) and A.5.13 (Labeling) require information assets to be identified and labeled according to classification level (Public, Internal, Confidential, Restricted).',
    patterns: [
      { name: 'Classified Document',       template: '{ENUM:PUB|INT|CONF|REST}-{TEXT}-{DATE:YYYYMMDD}',                example: 'CONF-SecurityPolicy-20260301',   extensions: ['pdf','docx'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FISCAL / TAX — BRAZIL
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'nfe',
    name: 'NF-e (SEFAZ)',
    fullName: 'NF-e — Electronic Invoice — Ajuste SINIEF 07/2005',
    area: 'Fiscal / Tax',
    sectors: ['Commerce', 'Industry', 'Services', 'All'],
    countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'The NF-e access key (44 digits) uniquely defines the document. XML and PDF (DANFE) files must be stored with nomenclature that enables traceability: cUF + AAAAMM + CNPJ + mod + serie + nNF.',
    patterns: [
      { name: 'NF-e XML (44-digit key)',   template: '{NUM:44}-nfe',                                                   example: '35260312345678000199550010000000011123456789-nfe', extensions: ['xml'] },
      { name: 'DANFE PDF',                  template: 'DANFE-{CNPJ}-{DATE:YYYYMMDD}-{NUM:9}',                          example: 'DANFE-12345678000199-20260301-000000001',         extensions: ['pdf'] },
      { name: 'NF-e simplified',            template: 'NF-{DATE:YYYY-MM-DD}-{CNPJ}-{NUM:9}-{ENUM:NF|NFS|NFC}',        example: 'NF-2026-03-01-12345678000199-000000001-NF',       extensions: ['pdf','xml'] }
    ]
  },
  {
    id: 'nfse',
    name: 'NFS-e (ABRASF)',
    fullName: 'NFS-e — Electronic Services Invoice',
    area: 'Fiscal / Tax',
    sectors: ['Services', 'All'],
    countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Service providers must maintain NFS-e XML/PDF files with identification of number, date, and CNPJ for tax filing and audit.',
    patterns: [
      { name: 'NFS-e XML/PDF',             template: 'NFS-{CNPJ}-{DATE:YYYYMMDD}-{NUM:7}',                            example: 'NFS-12345678000199-20260301-0000001',             extensions: ['xml','pdf'] }
    ]
  },
  {
    id: 'cte',
    name: 'CT-e (SEFAZ)',
    fullName: 'CT-e — Electronic Transport Document — Ajuste SINIEF 09/2007',
    area: 'Fiscal / Tax',
    sectors: ['Transport', 'Logistics'],
    countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Carriers must store CT-e XML files with the access key for SPED Fiscal filing and Federal Revenue audits.',
    patterns: [
      { name: 'CT-e XML (44-digit key)',    template: '{NUM:44}-cte',                                                   example: '35260312345678000199570010000000011987654321-cte', extensions: ['xml'] }
    ]
  },
  {
    id: 'sped',
    name: 'SPED (Receita Federal)',
    fullName: 'SPED — Public Digital Bookkeeping System — Law 11.638/2007',
    area: 'Fiscal / Tax',
    sectors: ['All'],
    countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'SPED files (ECD, ECF, EFD ICMS/IPI, EFD Contributions) must follow standardized naming per SPED layout for transmission and storage.',
    patterns: [
      { name: 'ECD',                        template: 'ECD-{CNPJ}-{DATE:YYYY}',                                        example: 'ECD-12345678000199-2025',                         extensions: ['txt'] },
      { name: 'ECF',                        template: 'ECF-{CNPJ}-{DATE:YYYY}',                                        example: 'ECF-12345678000199-2025',                         extensions: ['txt'] },
      { name: 'EFD ICMS/IPI',               template: 'EFDICMS-{CNPJ}-{DATE:YYYYMMDD}',                                example: 'EFDICMS-12345678000199-20260228',                 extensions: ['txt'] },
      { name: 'EFD Contributions',           template: 'EFDPIS-{CNPJ}-{DATE:YYYYMMDD}',                                example: 'EFDPIS-12345678000199-20260228',                  extensions: ['txt'] }
    ]
  },
  {
    id: 'esocial',
    name: 'eSocial (MTE/RFB)',
    fullName: 'eSocial — Decree 8.373/2014',
    area: 'Fiscal / HR',
    sectors: ['HR', 'Payroll', 'All'],
    countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'eSocial events must be stored identifying the event type (S-xxxx), competence period, employer CNPJ, and transmission protocol number for labor audits.',
    patterns: [
      { name: 'eSocial Event',              template: 'ESOCIAL-{ENUM:S1000|S1200|S2200|S2300|S5001}-{CNPJ}-{DATE:YYYYMMDD}', example: 'ESOCIAL-S1200-12345678000199-20260301',    extensions: ['xml','json'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FINANCIAL / REGULATORY — BRAZIL
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'bacen4893',
    name: 'BACEN Resolution 4.893/2021',
    fullName: 'Central Bank of Brazil — Cybersecurity Policy for Financial Institutions',
    area: 'Financial / Regulatory',
    sectors: ['Banking', 'Financial', 'Fintech', 'Insurance'],
    countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Requires information asset management with classification, access control, and traceability. Policy documents, incident records, and audit logs must be identifiable and preserved.',
    patterns: [
      { name: 'Security Policy',            template: '{ENUM:POL|PROC|GUIDE|REP}-SEC-{NUM:3}-{VERSION}-{DATE:YYYYMMDD}', example: 'POL-SEC-001-v02-20260301',                   extensions: ['pdf'] },
      { name: 'Incident Report',             template: 'INC-{NUM:8}-{DATE:YYYY-MM-DD}-{ENUM:CRITICAL|HIGH|MEDIUM|LOW}', example: 'INC-20260001-2026-03-01-HIGH',                extensions: ['pdf','docx'] }
    ]
  },
  {
    id: 'cvm',
    name: 'CVM (Instruction 480)',
    fullName: 'Securities and Exchange Commission of Brazil — CVM Instruction 480',
    area: 'Financial / Capital Markets',
    sectors: ['Publicly Traded Companies', 'Financial'],
    countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Publicly traded companies must maintain corporate documents, financial statements, and periodic reports with clear identification of competence period, document type, and version.',
    patterns: [
      { name: 'DFP/ITR Report',             template: '{ENUM:DFP|ITR|IAN|FRE}-{CNPJ}-{DATE:YYYY}-{VERSION}',          example: 'DFP-12345678000199-2025-v01',                    extensions: ['pdf','xlsx'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HEALTHCARE — BRAZIL
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'cfm1821',
    name: 'CFM 1.821/2007',
    fullName: 'Federal Medical Council — Electronic Medical Records',
    area: 'Healthcare',
    sectors: ['Hospital', 'Clinic', 'Laboratory'],
    countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Electronic medical records and attachments (reports, exams, images) must be identified to ensure uniqueness and traceability by patient number, date, and document type, with integrity ensured by ICP-Brasil digital signature.',
    patterns: [
      { name: 'Medical Record',             template: 'MR-{NUM:10}-{DATE:YYYYMMDD}-{ENUM:REPORT|EXAM|RX|EVOL}',       example: 'MR-0123456789-20260301-REPORT',                  extensions: ['pdf'] },
      { name: 'DICOM Image',                template: '{NUM:10}-{DATE:YYYYMMDD}-{ENUM:RX|CT|MRI|ECO|US}',              example: '0123456789-20260301-CT',                         extensions: ['dcm','pdf'] }
    ]
  },
  {
    id: 'anvisa',
    name: 'ANVISA RDC 204/2017',
    fullName: 'ANVISA — Good Manufacturing Practices (GMP)',
    area: 'Healthcare / Pharmaceutical',
    sectors: ['Pharmaceutical', 'Cosmetics', 'Food', 'Medical Devices'],
    countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'GMP documents (SOPs, batch records, certificates of analysis, deviation reports) must have unique identification, revision number, issue date and approval. Nomenclature must reflect type, code, and version.',
    patterns: [
      { name: 'SOP',                        template: '{ENUM:SOP|POP|IOP}-{NUM:5}-{VERSION}-{DATE:YYYYMMDD}',          example: 'SOP-00042-v03-20260301',                         extensions: ['pdf'] },
      { name: 'Batch Record',               template: 'BRD-{NUM:8}-{TEXT}-{DATE:YYYYMMDD}',                            example: 'BRD-20260001-ProductA-20260301',                 extensions: ['pdf'] },
      { name: 'Certificate of Analysis',     template: 'COA-{TEXT}-{NUM:8}-{DATE:YYYYMMDD}',                           example: 'COA-CompoundX-20260001-20260301',                extensions: ['pdf'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HEALTHCARE — INTERNATIONAL
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'hipaa',
    name: 'HIPAA (USA)',
    fullName: 'Health Insurance Portability and Accountability Act — 45 CFR §164.530',
    area: 'Healthcare',
    sectors: ['Healthcare', 'Health Insurance', 'Health IT'],
    countries: ['USA'],
    obligation: 'mandatory',
    requirement: 'Protected Health Information (PHI) records must be identified without revealing patient data in the filename (privacy protection), while remaining internally traceable by case number or hash.',
    patterns: [
      { name: 'Anonymous PHI',              template: '{NUM:10}-{DATE:YYYYMMDD}-{ENUM:ENCOUNTER|LAB|IMG|PHAR}',        example: '1234567890-20260301-LAB',                        extensions: ['pdf','hl7','json'] }
    ]
  },
  {
    id: 'fda21cfr11',
    name: 'FDA 21 CFR Part 11 (USA)',
    fullName: 'FDA — Electronic Records and Electronic Signatures',
    area: 'Pharmaceutical / Regulatory',
    sectors: ['Pharmaceutical', 'Biotech', 'Food', 'Medical Devices'],
    countries: ['USA'],
    obligation: 'mandatory',
    requirement: 'Electronic records must have audit trail, version control, and unique identification. Naming must include identifier, version, and date to support the audit trail required by FDA.',
    patterns: [
      { name: 'FDA Record',                 template: '{ENUM:IND|NDA|ANDA|BLA|PMA}-{NUM:6}-{VERSION}-{DATE:YYYYMMDD}', example: 'NDA-204709-v02-20260301',                        extensions: ['pdf','xml'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LEGAL
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'cnj065',
    name: 'CNJ Resolution 65/2008',
    fullName: 'National Council of Justice — Unique Case Number (NUP)',
    area: 'Legal',
    sectors: ['Legal', 'Law Firms', 'Judiciary'],
    countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Every judicial case must have a unique number in the format NNNNNNN-DD.YYYY.J.TT.OOOO. Petitions, decisions, and legal documents must reference this number for traceability.',
    patterns: [
      { name: 'Legal Filing',               template: '{NUM:7}-{NUM:2}-{DATE:YYYY}-{NUM:1}-{NUM:2}-{NUM:4}-{ENUM:PET|DEC|SEN|ACO|EMB}', example: '0001234-56-2026-8-26-0100-PET', extensions: ['pdf'] },
      { name: 'Contract',                    template: 'CONTRACT-{NUM:5}-{TEXT}-{DATE:YYYY-MM-DD}',                    example: 'CONTRACT-00042-SupplierA-2026-03-01',            extensions: ['pdf','docx'] }
    ]
  },
  {
    id: 'lgpd',
    name: 'LGPD (Law 13.709/2018)',
    fullName: 'Brazilian General Data Protection Law — Articles 46 and 48',
    area: 'Data Protection',
    sectors: ['All'],
    countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Art. 46 requires technical and administrative measures to protect personal data. Incident records, impact reports (RIPD), and consent logs must be identifiable and traceable for ANPD compliance.',
    patterns: [
      { name: 'RIPD / DPIA',                template: '{ENUM:RIPD|DPIA|LOG|INCI}-{TEXT}-{DATE:YYYY-MM-DD}',            example: 'RIPD-SystemX-2026-03-01',                        extensions: ['pdf','docx'] },
      { name: 'LGPD Incident',              template: 'INCI-LGPD-{NUM:5}-{DATE:YYYY-MM-DD}-{ENUM:CRITICAL|SEVERE|MINOR}', example: 'INCI-LGPD-00001-2026-03-01-CRITICAL',       extensions: ['pdf'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FINANCIAL — INTERNATIONAL
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'sox',
    name: 'SOX — Sarbanes-Oxley (USA)',
    fullName: 'Sarbanes-Oxley Act — Sections 302, 404, 802',
    area: 'Financial / Audit',
    sectors: ['Publicly Traded (USA)', 'Multinational Subsidiaries'],
    countries: ['USA', 'Global (NYSE/NASDAQ listed)'],
    obligation: 'mandatory',
    requirement: 'Section 802 requires retention of audit records for 7 years. Financial documents, internal controls (ICFR), and audit workpapers must have unambiguous identification with type, period, and version.',
    patterns: [
      { name: 'Audit Workpaper',            template: '{ENUM:WP|CTRL|TEST|EVD}-{NUM:5}-{DATE:YYYY}-{VERSION}',         example: 'WP-00042-2025-v01',                              extensions: ['xlsx','pdf'] }
    ]
  },
  {
    id: 'pci_dss',
    name: 'PCI DSS v4.0',
    fullName: 'Payment Card Industry Data Security Standard',
    area: 'Financial / Security',
    sectors: ['Financial', 'Retail', 'E-commerce'],
    countries: ['Global'],
    obligation: 'mandatory',
    requirement: 'Requirement 10.5 (log protection) and 12.5 (security policies) require logs and policies to be identified, intact, and traceable. ASV scan reports and penetration test results must be retained with clear identification.',
    patterns: [
      { name: 'PCI Report',                 template: '{ENUM:ASV|PEN|ROC|SAQ}-{DATE:YYYY-MM-DD}-{VERSION}',            example: 'ROC-2026-03-01-v01',                             extensions: ['pdf'] }
    ]
  },
  {
    id: 'gdpr',
    name: 'GDPR (EU 2016/679)',
    fullName: 'General Data Protection Regulation — Articles 5 and 30',
    area: 'Data Protection',
    sectors: ['All (EU resident data operations)'],
    countries: ['European Union', 'Global'],
    obligation: 'mandatory',
    requirement: 'Art. 30 requires Records of Processing Activities (ROPA). DPIAs, breach reports (72h), and Data Processing Agreements (DPA) must be identifiable. Art. 5 requires integrity and confidentiality.',
    patterns: [
      { name: 'DPIA / ROPA',                template: '{ENUM:DPIA|ROPA|DPA|BREACH}-{TEXT}-{DATE:YYYY-MM-DD}',          example: 'DPIA-WebPlatform-2026-03-01',                    extensions: ['pdf','docx'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ENGINEERING / CONSTRUCTION (AEC)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'iso19650',
    name: 'ISO 19650',
    fullName: 'ISO 19650 — Information Management using BIM',
    area: 'Engineering / Construction',
    sectors: ['Construction', 'Engineering', 'Infrastructure'],
    countries: ['Global'],
    obligation: 'recommended',
    requirement: 'Defines naming conventions for BIM models, design documents, and asset information. Naming must include: project field, asset type, discipline, number, revision, and status.',
    patterns: [
      { name: 'BIM / Design Document',      template: '{TEXT}-{ENUM:ARC|STR|HYD|ELE|MEP}-{NUM:4}-{VERSION}-{ENUM:S0|S1|S2|S3|S4|S5|S6|S7}', example: 'Building-ARC-0042-v03-S4', extensions: ['pdf','dwg','rvt','ifc'] },
      { name: 'Drawing / Plan',              template: '{TEXT}-{ENUM:PL|CR|DT|ES}-{NUM:4}-{VERSION}',                   example: 'Foundation-PL-0001-v02',                         extensions: ['pdf','dwg'] }
    ]
  },
  {
    id: 'abnt_nbr',
    name: 'ABNT NBR 13531',
    fullName: 'ABNT NBR 13531 — Building Design Development',
    area: 'Engineering / Construction',
    sectors: ['Architecture', 'Civil Engineering'],
    countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Establishes the structure for building design document presentation, including organization by discipline and project phase, with clear identification of the responsible professional and revision.',
    patterns: [
      { name: 'Design Sheet',               template: '{TEXT}-{ENUM:ARC|STR|ELE|HYD|HVAC}-{NUM:3}-{VERSION}',          example: 'Tower-ARC-001-v02',                              extensions: ['pdf','dwg'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GOVERNMENT / PUBLIC SECTOR
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'conarq',
    name: 'CONARQ / e-ARQ Brasil',
    fullName: 'National Archives Council — EDMS Requirements Model',
    area: 'Document Management / Government',
    sectors: ['Public Sector', 'Federal', 'State', 'Municipal'],
    countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'e-ARQ Brasil defines requirements for archival management systems, including classification plan, retention schedule, and digital document naming per document typology.',
    patterns: [
      { name: 'Public Document',            template: '{ENUM:OFF|MEMO|REP|ORD|DIS}-{NUM:5}-{DATE:YYYY}-{TEXT}',        example: 'OFF-00123-2026-Department',                      extensions: ['pdf'] }
    ]
  },
  {
    id: 'decreto10278',
    name: 'Decree 10.278/2020',
    fullName: 'Digitization of Public and Private Documents',
    area: 'Document Management / Government',
    sectors: ['Public Sector', 'Companies (legally valid documents)'],
    countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Digitized documents must have minimum metadata: document type, digitization date, page count, integrity hash, and subject. File naming must reflect the type and origin of the original document.',
    patterns: [
      { name: 'Digitized Document',         template: 'DIG-{ENUM:CONT|INV|CERT|ID|DIP}-{NUM:8}-{DATE:YYYYMMDD}',      example: 'DIG-CERT-00000042-20260301',                     extensions: ['pdf'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ENVIRONMENT
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'iso14001',
    name: 'ISO 14001:2015',
    fullName: 'ISO 14001 — Environmental Management System',
    area: 'Environment',
    sectors: ['Industry', 'Mining', 'Agribusiness', 'All'],
    countries: ['Global'],
    obligation: 'mandatory',
    requirement: 'Clause 7.5 requires control of environmental documented information: licenses, monitoring reports, management plans. Documents must be identifiable by type and validity period.',
    patterns: [
      { name: 'License / Permit',           template: '{ENUM:LI|LP|LO|AUF|LAS}-{TEXT}-{DATE:YYYY-MM-DD}',             example: 'LO-Boiler-2026-03-01',                           extensions: ['pdf'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HR / LABOR
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'clt_rh',
    name: 'CLT / eSocial / CAGED',
    fullName: 'Labor Laws + Ancillary Obligations',
    area: 'HR / Labor',
    sectors: ['HR', 'Payroll', 'All'],
    countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Labor documents (payslips, contracts, termination records, medical exams, NR training) must be identifiable by employee CPF/ID and competence period for MTE audits and labor lawsuits.',
    patterns: [
      { name: 'Payslip',                    template: 'PAY-{CPF}-{DATE:YYYY-MM}',                                      example: 'PAY-12345678901-2026-02',                        extensions: ['pdf'] },
      { name: 'Employment Contract',         template: 'EC-{CPF}-{DATE:YYYY-MM-DD}',                                   example: 'EC-12345678901-2026-03-01',                      extensions: ['pdf'] },
      { name: 'Medical Exam (ASO)',          template: 'ASO-{CPF}-{DATE:YYYY-MM-DD}-{ENUM:ADM|PER|DIS}',               example: 'ASO-12345678901-2026-03-01-ADM',                 extensions: ['pdf'] },
      { name: 'Safety Training (NR)',        template: 'TRN-{ENUM:NR10|NR12|NR35|NR-OTHER}-{CPF}-{DATE:YYYYMMDD}',     example: 'TRN-NR35-12345678901-20260301',                  extensions: ['pdf'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AGRIBUSINESS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'mapa_agro',
    name: 'MAPA / SISLEGIS / Traceability',
    fullName: 'Ministry of Agriculture — Traceability and Certification',
    area: 'Agribusiness',
    sectors: ['Agriculture', 'Food', 'Export'],
    countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Traceability of agricultural products (meat, grains, fruits) requires batch records, origin, animal/plant health records, and phytosanitary certificates identified by GTA number, NF, and production batch.',
    patterns: [
      { name: 'GTA (Animal Transit Guide)',  template: 'GTA-{NUM:10}-{DATE:YYYYMMDD}',                                 example: 'GTA-0012345678-20260301',                        extensions: ['pdf'] },
      { name: 'Phytosanitary Report',        template: 'PHY-{TEXT}-{NUM:8}-{DATE:YYYY-MM-DD}',                         example: 'PHY-Soybean-20260001-2026-03-01',                extensions: ['pdf'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADDITIONAL INTERNATIONAL
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'finra',
    name: 'FINRA Rule 4511 (USA)',
    fullName: 'Financial Industry Regulatory Authority — Records Retention',
    area: 'Financial / Capital Markets',
    sectors: ['Broker-Dealer', 'Investment Managers'],
    countries: ['USA'],
    obligation: 'mandatory',
    requirement: 'Requires retention of client, transaction, and communication records for 6 years. Files must be indexed by record type, date, and client/transaction identifier.',
    patterns: [
      { name: 'FINRA Record',               template: '{ENUM:TRADE|COMM|ACCT|COMP}-{NUM:10}-{DATE:YYYY-MM-DD}',       example: 'TRADE-0000123456-2026-03-01',                    extensions: ['pdf','msg','csv'] }
    ]
  },
  {
    id: 'dod5015',
    name: 'DoD 5015.02-STD',
    fullName: 'US DoD — Electronic Records Management Standard',
    area: 'Defense / Government',
    sectors: ['Defense', 'US Federal Government', 'DoD Contractors'],
    countries: ['USA'],
    obligation: 'mandatory',
    requirement: 'Defines naming standards and metadata for records management in defense systems. Classified documents must have security level, project code, and date in the name.',
    patterns: [
      { name: 'DoD Document',               template: '{ENUM:UNCLAS|CUI|SECRET}-{TEXT}-{NUM:8}-{DATE:YYYYMMDD}',       example: 'CUI-ProjectAlpha-20260001-20260301',             extensions: ['pdf'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ISRAEL
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'israel_archives',
    name: 'Israel Archives Law (תשט"ו-1955)',
    fullName: 'Israel State Archives Law — Document Preservation Requirements',
    area: 'Government / Archives',
    sectors: ['Government', 'Public Institutions'],
    countries: ['Israel'],
    obligation: 'mandatory',
    requirement: 'Israeli public institutions must preserve documents with systematic naming that enables retrieval by category, date, and institutional origin. Digital records must follow the Israel Archives Authority guidelines.',
    patterns: [
      { name: 'State Archive Document',      template: '{ENUM:GOV|MUN|EDU|SEC}-{TEXT}-{NUM:6}-{DATE:YYYY}',            example: 'GOV-Policy-000042-2026',                         extensions: ['pdf'] }
    ]
  },
  {
    id: 'israel_privacy',
    name: 'Israel Privacy Protection Law (5741-1981)',
    fullName: 'Protection of Privacy Law — Database Registration Requirements',
    area: 'Data Protection',
    sectors: ['All'],
    countries: ['Israel'],
    obligation: 'mandatory',
    requirement: 'Organizations processing personal data must maintain registered databases with documented processing activities. Records must be identifiable and traceable for the Privacy Protection Authority (PPA) audits.',
    patterns: [
      { name: 'PPA Compliance Record',       template: '{ENUM:DB-REG|CONSENT|AUDIT|BREACH}-{TEXT}-{DATE:YYYY-MM-DD}',  example: 'AUDIT-SystemY-2026-03-01',                       extensions: ['pdf','xlsx'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GENERIC / INTERNAL POLICIES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'internal_generic',
    name: 'Internal Corporate Policy',
    fullName: 'Templates for Internal Naming Policies',
    area: 'General / Internal',
    sectors: ['All'],
    countries: ['Any'],
    obligation: 'recommended',
    requirement: 'Organizations without specific external normative requirements can define internal naming policies to ensure organization, efficient search, automated backup, and internal audit readiness.',
    patterns: [
      { name: 'Generic Document',            template: '{ENUM:CONT|REP|MIN|PROP|PLAN}-{NUM:5}-{TEXT}-{DATE:YYYY-MM-DD}', example: 'REP-00001-Quarterly-2026-03-01',              extensions: ['pdf','docx','xlsx'] },
      { name: 'Spreadsheet / Report',         template: '{TEXT}-{DATE:YYYYMMDD}-{VERSION}',                              example: 'Metrics-20260301-v01',                        extensions: ['xlsx','csv'] },
      { name: 'Image / Photo',               template: '{TEXT}-{DATE:YYYYMMDD}-{NUM:4}',                                example: 'Event-Kickoff-20260301-0001',                 extensions: ['jpg','png','jpeg'] },
      { name: 'System Backup',               template: 'BKP-{TEXT}-{DATE:YYYYMMDD}-{ENUM:FULL|INCR|DIFF}',              example: 'BKP-Database-20260301-FULL',                  extensions: ['bak','zip','tar','gz'] }
    ]
  }
];

// ── Official URLs per normative ───────────────────────────────────────────────
const URLS = {
  iso9001:        'https://www.iso.org/standard/62085.html',
  iso13485:       'https://www.iso.org/standard/59752.html',
  iso15489:       'https://www.iso.org/standard/62183.html',
  iso27001:       'https://www.iso.org/standard/27001',
  nfe:            'https://www.nfe.fazenda.gov.br/',
  nfse:           'https://www.nfse.gov.br/',
  cte:            'https://www.cte.fazenda.gov.br/',
  sped:           'https://sped.rfb.gov.br/',
  esocial:        'https://esocial.fazenda.gov.br/',
  bacen4893:      'https://www.bcb.gov.br/estabilidadefinanceira/ciber_seguranca',
  cvm:            'https://conteudo.cvm.gov.br/legislacao/instrucoes/inst480.html',
  cfm1821:        'https://www.cfm.org.br/index.php?lid=10,0,0,1,0&lres=13707',
  anvisa:         'https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2018/publicada-rdc-204-sobre-boas-praticas',
  hipaa:          'https://www.hhs.gov/hipaa/for-professionals/security/index.html',
  fda21cfr11:     'https://www.ecfr.gov/current/title-21/part-11',
  cnj065:         'https://atos.cnj.jus.br/atos/detalhar/187',
  lgpd:           'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm',
  sox:            'https://www.sec.gov/about/laws/soa2002.pdf',
  pci_dss:        'https://www.pcisecuritystandards.org/document_library/',
  gdpr:           'https://gdpr-info.eu/',
  iso19650:       'https://www.iso.org/standard/68078.html',
  abnt_nbr:       'https://www.abnt.org.br/',
  conarq:         'https://www.gov.br/conarq/pt-br',
  decreto10278:   'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/decreto/d10278.htm',
  iso14001:       'https://www.iso.org/standard/60857.html',
  clt_rh:         'https://esocial.fazenda.gov.br/',
  mapa_agro:      'https://www.gov.br/agricultura/pt-br',
  finra:          'https://www.finra.org/rules-guidance/rulebooks/finra-rules/4511',
  dod5015:        'https://dodcio.defense.gov/Portals/0/Documents/FOIA/DoD5015.02-STD2007.pdf',
  israel_archives:'https://www.archives.gov.il/',
  israel_privacy: 'https://www.gov.il/en/departments/the_privacy_protection_authority',
  internal_generic: null,
};

/**
 * Normalize a normative entry: ensure category, scope, url are always present.
 */
function normalize(n) {
  return {
    ...n,
    category: n.category || n.area || 'General',
    scope:    n.scope    || (Array.isArray(n.countries) ? n.countries.join(', ') : (n.countries || '')),
    url:      URLS[n.id] || n.url || null,
  };
}

/**
 * Returns all normatives (normalized), sorted by area.
 */
function getAll() {
  return normatives.map(normalize).sort((a, b) => a.area.localeCompare(b.area));
}

/**
 * Returns a single normative by id (normalized), or null.
 */
function getById(id) {
  const n = normatives.find(x => x.id === id);
  return n ? normalize(n) : null;
}

/**
 * Returns all normatives grouped by area.
 */
function byArea() {
  const groups = {};
  for (const n of normatives) {
    if (!groups[n.area]) groups[n.area] = [];
    groups[n.area].push(normalize(n));
  }
  return groups;
}

module.exports = { normatives, getAll, getById, byArea };
