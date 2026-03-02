'use strict';

/**
 * FreeNameConvention — International Normatives Database v3.0 (Global)
 *
 * 60+ normatives from every continent.
 * Each entry includes ready-to-use file naming patterns, country/region
 * metadata, and references to the issuing authority.
 *
 * Regions: Global · Americas · Europe · Asia-Pacific · Middle East · Africa
 *
 * STRIDE-T: All string data is treated as untrusted and sanitized before
 * being used in filesystem operations.
 */

const normatives = [

  // ═══════════════════════════════════════════════════════════════════════════
  // GLOBAL / INTERNATIONAL STANDARDS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'iso9001', name: 'ISO 9001:2015',
    fullName: 'ISO 9001 — Quality Management System',
    area: 'Quality', sectors: ['Industry','Services','All'],
    region: 'Global', countries: ['Global'],
    obligation: 'mandatory',
    requirement: 'Clause 7.5: control of documented information — identification, format, media, review/approval. Documents must be identifiable and traceable.',
    patterns: [
      { name: 'Procedure / Policy',   template: '{ENUM:PRC|POL|INS|MAN}-{NUM:4}-{VERSION}-{DATE:YYYYMMDD}', example: 'PRC-0042-v02-20260301', extensions: ['pdf','docx'] },
      { name: 'Form / Record',        template: 'FRM-{NUM:4}-{DATE:YYYYMMDD}',                               example: 'FRM-0015-20260301',     extensions: ['pdf','xlsx'] },
      { name: 'Work Instruction',     template: 'IT-{NUM:4}-{TEXT}-{VERSION}',                                example: 'IT-0007-Assembly-v01',  extensions: ['pdf'] }
    ]
  },
  {
    id: 'iso13485', name: 'ISO 13485:2016',
    fullName: 'ISO 13485 — Medical Devices — QMS',
    area: 'Quality', sectors: ['Healthcare','Medical Devices','Pharmaceutical'],
    region: 'Global', countries: ['Global'],
    obligation: 'mandatory',
    requirement: 'Clause 4.2.4: record control with identification, storage, protection, retrieval, retention time, and disposal. Batch/serial traceability mandatory.',
    patterns: [
      { name: 'Batch Record',         template: 'RLO-{NUM:8}-{TEXT}-{DATE:YYYYMMDD}',   example: 'RLO-20260001-DeviceX-20260301', extensions: ['pdf'] },
      { name: 'Non-conformity',       template: 'NC-{NUM:5}-{DATE:YYYY-MM-DD}',         example: 'NC-00023-2026-03-01',           extensions: ['pdf','docx'] }
    ]
  },
  {
    id: 'iso15489', name: 'ISO 15489-1:2016',
    fullName: 'ISO 15489 — Records Management',
    area: 'Document Management', sectors: ['Government','Legal','All'],
    region: 'Global', countries: ['Global'],
    obligation: 'recommended',
    requirement: 'Naming, classification, metadata, and retention of corporate records. Controlled vocabulary in file names to ensure context.',
    patterns: [
      { name: 'Corporate Document',   template: '{ENUM:CONT|REP|MIN|MEMO|OFF}-{NUM:5}-{TEXT}-{DATE:YYYY-MM-DD}', example: 'REP-00123-Strategy-2026-03-01', extensions: ['pdf'] },
      { name: 'Correspondence',       template: 'CORR-{DATE:YYYYMMDD}-{TEXT}',                                    example: 'CORR-20260301-Board',           extensions: ['pdf','msg'] }
    ]
  },
  {
    id: 'iso27001', name: 'ISO 27001:2022',
    fullName: 'ISO 27001 — Information Security Management System',
    area: 'Information Security', sectors: ['IT','Financial','All'],
    region: 'Global', countries: ['Global'],
    obligation: 'mandatory',
    requirement: 'Control A.5.12/A.5.13: information classification and labeling (Public, Internal, Confidential, Restricted).',
    patterns: [
      { name: 'Classified Document',  template: '{ENUM:PUB|INT|CONF|REST}-{TEXT}-{DATE:YYYYMMDD}', example: 'CONF-SecurityPolicy-20260301', extensions: ['pdf','docx'] }
    ]
  },
  {
    id: 'iso14001', name: 'ISO 14001:2015',
    fullName: 'ISO 14001 — Environmental Management System',
    area: 'Environment', sectors: ['Industry','Mining','Agribusiness','All'],
    region: 'Global', countries: ['Global'],
    obligation: 'mandatory',
    requirement: 'Clause 7.5: control of environmental documented information — licenses, monitoring reports, management plans.',
    patterns: [
      { name: 'License / Permit',     template: '{ENUM:LI|LP|LO|AUF|LAS}-{TEXT}-{DATE:YYYY-MM-DD}', example: 'LO-Boiler-2026-03-01', extensions: ['pdf'] }
    ]
  },
  {
    id: 'iso45001', name: 'ISO 45001:2018',
    fullName: 'ISO 45001 — Occupational Health and Safety Management',
    area: 'Health & Safety', sectors: ['Industry','Construction','All'],
    region: 'Global', countries: ['Global'],
    obligation: 'mandatory',
    requirement: 'Clause 7.5: documented information for OH&S management including risk assessments, incident reports, and audit records.',
    patterns: [
      { name: 'Risk Assessment',      template: 'RA-{NUM:5}-{TEXT}-{DATE:YYYY-MM-DD}',              example: 'RA-00012-Factory-2026-03-01',   extensions: ['pdf','xlsx'] },
      { name: 'Incident Report',      template: 'IR-{NUM:5}-{DATE:YYYYMMDD}-{ENUM:FATAL|SERIOUS|MINOR|NEAR}', example: 'IR-00042-20260301-MINOR', extensions: ['pdf'] }
    ]
  },
  {
    id: 'iso19650', name: 'ISO 19650',
    fullName: 'ISO 19650 — Information Management using BIM',
    area: 'Engineering / Construction', sectors: ['Construction','Engineering','Infrastructure'],
    region: 'Global', countries: ['Global'],
    obligation: 'recommended',
    requirement: 'Naming conventions for BIM models: project, asset type, discipline, number, revision, and status.',
    patterns: [
      { name: 'BIM Document',         template: '{TEXT}-{ENUM:ARC|STR|HYD|ELE|MEP}-{NUM:4}-{VERSION}-{ENUM:S0|S1|S2|S3|S4|S5|S6|S7}', example: 'Building-ARC-0042-v03-S4', extensions: ['pdf','dwg','rvt','ifc'] },
      { name: 'Drawing / Plan',       template: '{TEXT}-{ENUM:PL|CR|DT|ES}-{NUM:4}-{VERSION}', example: 'Foundation-PL-0001-v02', extensions: ['pdf','dwg'] }
    ]
  },
  {
    id: 'pci_dss', name: 'PCI DSS v4.0',
    fullName: 'Payment Card Industry Data Security Standard',
    area: 'Financial / Security', sectors: ['Financial','Retail','E-commerce'],
    region: 'Global', countries: ['Global'],
    obligation: 'mandatory',
    requirement: 'Req. 10.5 and 12.5: logs and policies must be identified, intact, traceable. ASV scans and pen-test results retained.',
    patterns: [
      { name: 'PCI Report',           template: '{ENUM:ASV|PEN|ROC|SAQ}-{DATE:YYYY-MM-DD}-{VERSION}', example: 'ROC-2026-03-01-v01', extensions: ['pdf'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AMERICAS — BRAZIL
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'nfe', name: 'NF-e (SEFAZ)',
    fullName: 'NF-e — Electronic Invoice — Ajuste SINIEF 07/2005',
    area: 'Fiscal / Tax', sectors: ['Commerce','Industry','Services','All'],
    region: 'Americas', countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'The NF-e access key (44 digits) uniquely defines the document. XML and PDF files must enable traceability.',
    patterns: [
      { name: 'NF-e XML (44-digit key)', template: '{NUM:44}-nfe',                                         example: '35260312345678000199550010000000011123456789-nfe', extensions: ['xml'] },
      { name: 'DANFE PDF',               template: 'DANFE-{CNPJ}-{DATE:YYYYMMDD}-{NUM:9}',                example: 'DANFE-12345678000199-20260301-000000001',         extensions: ['pdf'] },
      { name: 'NF-e simplified',          template: 'NF-{DATE:YYYY-MM-DD}-{CNPJ}-{NUM:9}-{ENUM:NF|NFS|NFC}', example: 'NF-2026-03-01-12345678000199-000000001-NF', extensions: ['pdf','xml'] }
    ]
  },
  {
    id: 'nfse', name: 'NFS-e (ABRASF)',
    fullName: 'NFS-e — Electronic Services Invoice',
    area: 'Fiscal / Tax', sectors: ['Services','All'],
    region: 'Americas', countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Service providers must maintain NFS-e XML/PDF files identified by number, date, and CNPJ.',
    patterns: [
      { name: 'NFS-e XML/PDF',           template: 'NFS-{CNPJ}-{DATE:YYYYMMDD}-{NUM:7}', example: 'NFS-12345678000199-20260301-0000001', extensions: ['xml','pdf'] }
    ]
  },
  {
    id: 'cte', name: 'CT-e (SEFAZ)',
    fullName: 'CT-e — Electronic Transport Document — Ajuste SINIEF 09/2007',
    area: 'Fiscal / Tax', sectors: ['Transport','Logistics'],
    region: 'Americas', countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Carriers must store CT-e XML files with the access key for SPED Fiscal filing.',
    patterns: [
      { name: 'CT-e XML (44-digit key)', template: '{NUM:44}-cte', example: '35260312345678000199570010000000011987654321-cte', extensions: ['xml'] }
    ]
  },
  {
    id: 'sped', name: 'SPED (Receita Federal)',
    fullName: 'SPED — Public Digital Bookkeeping System — Law 11.638/2007',
    area: 'Fiscal / Tax', sectors: ['All'],
    region: 'Americas', countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'SPED files must follow standardized naming per SPED layout for transmission and storage.',
    patterns: [
      { name: 'ECD',             template: 'ECD-{CNPJ}-{DATE:YYYY}',         example: 'ECD-12345678000199-2025',         extensions: ['txt'] },
      { name: 'ECF',             template: 'ECF-{CNPJ}-{DATE:YYYY}',         example: 'ECF-12345678000199-2025',         extensions: ['txt'] },
      { name: 'EFD ICMS/IPI',   template: 'EFDICMS-{CNPJ}-{DATE:YYYYMMDD}', example: 'EFDICMS-12345678000199-20260228', extensions: ['txt'] },
      { name: 'EFD Contributions',template: 'EFDPIS-{CNPJ}-{DATE:YYYYMMDD}', example: 'EFDPIS-12345678000199-20260228', extensions: ['txt'] }
    ]
  },
  {
    id: 'esocial', name: 'eSocial (MTE/RFB)',
    fullName: 'eSocial — Decree 8.373/2014',
    area: 'Fiscal / HR', sectors: ['HR','Payroll','All'],
    region: 'Americas', countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'eSocial events must be stored identifying event type (S-xxxx), competence period, employer CNPJ, and protocol number.',
    patterns: [
      { name: 'eSocial Event',   template: 'ESOCIAL-{ENUM:S1000|S1200|S2200|S2300|S5001}-{CNPJ}-{DATE:YYYYMMDD}', example: 'ESOCIAL-S1200-12345678000199-20260301', extensions: ['xml','json'] }
    ]
  },
  {
    id: 'bacen4893', name: 'BACEN Resolution 4.893/2021',
    fullName: 'Central Bank of Brazil — Cybersecurity Policy',
    area: 'Financial / Regulatory', sectors: ['Banking','Financial','Fintech','Insurance'],
    region: 'Americas', countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Information asset management with classification, access control, and traceability.',
    patterns: [
      { name: 'Security Policy',  template: '{ENUM:POL|PROC|GUIDE|REP}-SEC-{NUM:3}-{VERSION}-{DATE:YYYYMMDD}', example: 'POL-SEC-001-v02-20260301', extensions: ['pdf'] },
      { name: 'Incident Report',  template: 'INC-{NUM:8}-{DATE:YYYY-MM-DD}-{ENUM:CRITICAL|HIGH|MEDIUM|LOW}',   example: 'INC-20260001-2026-03-01-HIGH', extensions: ['pdf','docx'] }
    ]
  },
  {
    id: 'cvm', name: 'CVM (Instruction 480)',
    fullName: 'Securities and Exchange Commission of Brazil',
    area: 'Financial / Capital Markets', sectors: ['Publicly Traded Companies','Financial'],
    region: 'Americas', countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Publicly traded companies must maintain corporate documents with clear identification of period, type, and version.',
    patterns: [
      { name: 'DFP/ITR Report',   template: '{ENUM:DFP|ITR|IAN|FRE}-{CNPJ}-{DATE:YYYY}-{VERSION}', example: 'DFP-12345678000199-2025-v01', extensions: ['pdf','xlsx'] }
    ]
  },
  {
    id: 'cfm1821', name: 'CFM 1.821/2007',
    fullName: 'Federal Medical Council — Electronic Medical Records',
    area: 'Healthcare', sectors: ['Hospital','Clinic','Laboratory'],
    region: 'Americas', countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Electronic medical records must be identified to ensure uniqueness and traceability.',
    patterns: [
      { name: 'Medical Record',   template: 'MR-{NUM:10}-{DATE:YYYYMMDD}-{ENUM:REPORT|EXAM|RX|EVOL}', example: 'MR-0123456789-20260301-REPORT', extensions: ['pdf'] },
      { name: 'DICOM Image',      template: '{NUM:10}-{DATE:YYYYMMDD}-{ENUM:RX|CT|MRI|ECO|US}',        example: '0123456789-20260301-CT',        extensions: ['dcm','pdf'] }
    ]
  },
  {
    id: 'anvisa', name: 'ANVISA RDC 204/2017',
    fullName: 'ANVISA — Good Manufacturing Practices (GMP)',
    area: 'Healthcare / Pharmaceutical', sectors: ['Pharmaceutical','Cosmetics','Food','Medical Devices'],
    region: 'Americas', countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'GMP documents must have unique identification, revision number, issue date and approval.',
    patterns: [
      { name: 'SOP',              template: '{ENUM:SOP|POP|IOP}-{NUM:5}-{VERSION}-{DATE:YYYYMMDD}', example: 'SOP-00042-v03-20260301',            extensions: ['pdf'] },
      { name: 'Batch Record',     template: 'BRD-{NUM:8}-{TEXT}-{DATE:YYYYMMDD}',                   example: 'BRD-20260001-ProductA-20260301',    extensions: ['pdf'] },
      { name: 'Certificate of Analysis', template: 'COA-{TEXT}-{NUM:8}-{DATE:YYYYMMDD}',            example: 'COA-CompoundX-20260001-20260301',   extensions: ['pdf'] }
    ]
  },
  {
    id: 'lgpd', name: 'LGPD (Law 13.709/2018)',
    fullName: 'Brazilian General Data Protection Law',
    area: 'Data Protection', sectors: ['All'],
    region: 'Americas', countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Art. 46: technical and administrative measures to protect personal data. Incident records and RIPD/DPIA must be traceable.',
    patterns: [
      { name: 'RIPD / DPIA',      template: '{ENUM:RIPD|DPIA|LOG|INCI}-{TEXT}-{DATE:YYYY-MM-DD}',                  example: 'RIPD-SystemX-2026-03-01',              extensions: ['pdf','docx'] },
      { name: 'LGPD Incident',    template: 'INCI-LGPD-{NUM:5}-{DATE:YYYY-MM-DD}-{ENUM:CRITICAL|SEVERE|MINOR}',   example: 'INCI-LGPD-00001-2026-03-01-CRITICAL',  extensions: ['pdf'] }
    ]
  },
  {
    id: 'cnj065', name: 'CNJ Resolution 65/2008',
    fullName: 'National Council of Justice — Unique Case Number (NUP)',
    area: 'Legal', sectors: ['Legal','Law Firms','Judiciary'],
    region: 'Americas', countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Every judicial case must have a unique number in the NUP format.',
    patterns: [
      { name: 'Legal Filing',     template: '{NUM:7}-{NUM:2}-{DATE:YYYY}-{NUM:1}-{NUM:2}-{NUM:4}-{ENUM:PET|DEC|SEN|ACO|EMB}', example: '0001234-56-2026-8-26-0100-PET', extensions: ['pdf'] },
      { name: 'Contract',         template: 'CONTRACT-{NUM:5}-{TEXT}-{DATE:YYYY-MM-DD}', example: 'CONTRACT-00042-SupplierA-2026-03-01', extensions: ['pdf','docx'] }
    ]
  },
  {
    id: 'clt_rh', name: 'CLT / eSocial / CAGED',
    fullName: 'Labor Laws + Ancillary Obligations',
    area: 'HR / Labor', sectors: ['HR','Payroll','All'],
    region: 'Americas', countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Labor documents must be identifiable by employee CPF/ID and competence period for MTE audits.',
    patterns: [
      { name: 'Payslip',          template: 'PAY-{CPF}-{DATE:YYYY-MM}',                                example: 'PAY-12345678901-2026-02',           extensions: ['pdf'] },
      { name: 'Employment Contract', template: 'EC-{CPF}-{DATE:YYYY-MM-DD}',                           example: 'EC-12345678901-2026-03-01',         extensions: ['pdf'] },
      { name: 'Medical Exam (ASO)', template: 'ASO-{CPF}-{DATE:YYYY-MM-DD}-{ENUM:ADM|PER|DIS}',        example: 'ASO-12345678901-2026-03-01-ADM',    extensions: ['pdf'] },
      { name: 'Safety Training (NR)', template: 'TRN-{ENUM:NR10|NR12|NR35|NR-OTHER}-{CPF}-{DATE:YYYYMMDD}', example: 'TRN-NR35-12345678901-20260301', extensions: ['pdf'] }
    ]
  },
  {
    id: 'conarq', name: 'CONARQ / e-ARQ Brasil',
    fullName: 'National Archives Council — EDMS Requirements',
    area: 'Document Management / Government', sectors: ['Public Sector','Federal','State','Municipal'],
    region: 'Americas', countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Requirements for archival management systems: classification, retention, and naming per document typology.',
    patterns: [
      { name: 'Public Document',   template: '{ENUM:OFF|MEMO|REP|ORD|DIS}-{NUM:5}-{DATE:YYYY}-{TEXT}', example: 'OFF-00123-2026-Department', extensions: ['pdf'] }
    ]
  },
  {
    id: 'decreto10278', name: 'Decree 10.278/2020',
    fullName: 'Digitization of Public and Private Documents',
    area: 'Document Management / Government', sectors: ['Public Sector','Companies'],
    region: 'Americas', countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Digitized documents must have metadata: type, date, page count, integrity hash, and subject.',
    patterns: [
      { name: 'Digitized Document', template: 'DIG-{ENUM:CONT|INV|CERT|ID|DIP}-{NUM:8}-{DATE:YYYYMMDD}', example: 'DIG-CERT-00000042-20260301', extensions: ['pdf'] }
    ]
  },
  {
    id: 'abnt_nbr', name: 'ABNT NBR 13531',
    fullName: 'ABNT NBR 13531 — Building Design Development',
    area: 'Engineering / Construction', sectors: ['Architecture','Civil Engineering'],
    region: 'Americas', countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Structure for building design document presentation by discipline and project phase.',
    patterns: [
      { name: 'Design Sheet',     template: '{TEXT}-{ENUM:ARC|STR|ELE|HYD|HVAC}-{NUM:3}-{VERSION}', example: 'Tower-ARC-001-v02', extensions: ['pdf','dwg'] }
    ]
  },
  {
    id: 'mapa_agro', name: 'MAPA / SISLEGIS',
    fullName: 'Ministry of Agriculture — Traceability and Certification',
    area: 'Agribusiness', sectors: ['Agriculture','Food','Export'],
    region: 'Americas', countries: ['Brazil'],
    obligation: 'mandatory',
    requirement: 'Traceability of agricultural products: batch records, GTA, phytosanitary certificates.',
    patterns: [
      { name: 'GTA',              template: 'GTA-{NUM:10}-{DATE:YYYYMMDD}',            example: 'GTA-0012345678-20260301',             extensions: ['pdf'] },
      { name: 'Phytosanitary Report', template: 'PHY-{TEXT}-{NUM:8}-{DATE:YYYY-MM-DD}', example: 'PHY-Soybean-20260001-2026-03-01',    extensions: ['pdf'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AMERICAS — USA
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'sox', name: 'SOX — Sarbanes-Oxley',
    fullName: 'Sarbanes-Oxley Act — Sections 302, 404, 802',
    area: 'Financial / Audit', sectors: ['Publicly Traded (USA)','Multinational Subsidiaries'],
    region: 'Americas', countries: ['USA'],
    obligation: 'mandatory',
    requirement: 'Section 802: audit records retention for 7 years. Financial documents and ICFR must have unambiguous identification.',
    patterns: [
      { name: 'Audit Workpaper',   template: '{ENUM:WP|CTRL|TEST|EVD}-{NUM:5}-{DATE:YYYY}-{VERSION}', example: 'WP-00042-2025-v01', extensions: ['xlsx','pdf'] }
    ]
  },
  {
    id: 'hipaa', name: 'HIPAA',
    fullName: 'Health Insurance Portability and Accountability Act — 45 CFR §164.530',
    area: 'Healthcare', sectors: ['Healthcare','Health Insurance','Health IT'],
    region: 'Americas', countries: ['USA'],
    obligation: 'mandatory',
    requirement: 'PHI records must be identified without revealing patient data in filenames while remaining internally traceable.',
    patterns: [
      { name: 'Anonymous PHI',    template: '{NUM:10}-{DATE:YYYYMMDD}-{ENUM:ENCOUNTER|LAB|IMG|PHAR}', example: '1234567890-20260301-LAB', extensions: ['pdf','hl7','json'] }
    ]
  },
  {
    id: 'fda21cfr11', name: 'FDA 21 CFR Part 11',
    fullName: 'FDA — Electronic Records and Electronic Signatures',
    area: 'Pharmaceutical / Regulatory', sectors: ['Pharmaceutical','Biotech','Food','Medical Devices'],
    region: 'Americas', countries: ['USA'],
    obligation: 'mandatory',
    requirement: 'Electronic records must have audit trail, version control, and unique identification.',
    patterns: [
      { name: 'FDA Record',       template: '{ENUM:IND|NDA|ANDA|BLA|PMA}-{NUM:6}-{VERSION}-{DATE:YYYYMMDD}', example: 'NDA-204709-v02-20260301', extensions: ['pdf','xml'] }
    ]
  },
  {
    id: 'finra', name: 'FINRA Rule 4511',
    fullName: 'Financial Industry Regulatory Authority — Records Retention',
    area: 'Financial / Capital Markets', sectors: ['Broker-Dealer','Investment Managers'],
    region: 'Americas', countries: ['USA'],
    obligation: 'mandatory',
    requirement: 'Retention of client, transaction, and communication records for 6 years.',
    patterns: [
      { name: 'FINRA Record',     template: '{ENUM:TRADE|COMM|ACCT|COMP}-{NUM:10}-{DATE:YYYY-MM-DD}', example: 'TRADE-0000123456-2026-03-01', extensions: ['pdf','msg','csv'] }
    ]
  },
  {
    id: 'dod5015', name: 'DoD 5015.02-STD',
    fullName: 'US DoD — Electronic Records Management Standard',
    area: 'Defense / Government', sectors: ['Defense','US Federal Government','DoD Contractors'],
    region: 'Americas', countries: ['USA'],
    obligation: 'mandatory',
    requirement: 'Naming standards and metadata for records in defense systems. Security level and project code required.',
    patterns: [
      { name: 'DoD Document',     template: '{ENUM:UNCLAS|CUI|SECRET}-{TEXT}-{NUM:8}-{DATE:YYYYMMDD}', example: 'CUI-ProjectAlpha-20260001-20260301', extensions: ['pdf'] }
    ]
  },
  {
    id: 'nist80053', name: 'NIST SP 800-53 Rev. 5',
    fullName: 'NIST — Security and Privacy Controls for Information Systems',
    area: 'Information Security', sectors: ['Federal Government','Defense','IT'],
    region: 'Americas', countries: ['USA'],
    obligation: 'mandatory',
    requirement: 'AU-9 (Audit protection), SI-12 (Information handling): system logs and security documents must be identifiable and protected.',
    patterns: [
      { name: 'NIST Security Doc', template: '{ENUM:SSP|POA|ATO|RA|SA}-{TEXT}-{VERSION}-{DATE:YYYYMMDD}', example: 'SSP-CloudApp-v03-20260301', extensions: ['pdf','docx'] }
    ]
  },
  {
    id: 'ferpa', name: 'FERPA',
    fullName: 'Family Educational Rights and Privacy Act — 20 U.S.C. §1232g',
    area: 'Education', sectors: ['Education','Universities','Schools'],
    region: 'Americas', countries: ['USA'],
    obligation: 'mandatory',
    requirement: 'Student education records must be identified by student ID (not name) to protect privacy. Consent records must be traceable.',
    patterns: [
      { name: 'Student Record',   template: 'STU-{NUM:9}-{DATE:YYYY}-{ENUM:TRANSCRIPT|GRADE|DISC|FIN}', example: 'STU-123456789-2026-TRANSCRIPT', extensions: ['pdf'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AMERICAS — MEXICO
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'cfdi_mx', name: 'CFDI (SAT México)',
    fullName: 'CFDI — Comprobante Fiscal Digital por Internet',
    area: 'Fiscal / Tax', sectors: ['Commerce','Services','All'],
    region: 'Americas', countries: ['Mexico'],
    obligation: 'mandatory',
    requirement: 'All invoices must be issued as CFDI with UUID (folio fiscal). XML and PDF must be stored with RFC and UUID identification.',
    patterns: [
      { name: 'CFDI XML',         template: 'CFDI-{TEXT}-{DATE:YYYYMMDD}-{UUID}',       example: 'CFDI-RFC123456789-20260301-A1B2C3D4', extensions: ['xml'] },
      { name: 'CFDI PDF',         template: 'CFDI-{TEXT}-{DATE:YYYYMMDD}-{NUM:8}',      example: 'CFDI-RFC123456789-20260301-00000001', extensions: ['pdf'] }
    ]
  },
  {
    id: 'lfpdppp_mx', name: 'LFPDPPP (Mexico Data Protection)',
    fullName: 'Ley Federal de Protección de Datos Personales — Mexico',
    area: 'Data Protection', sectors: ['All'],
    region: 'Americas', countries: ['Mexico'],
    obligation: 'mandatory',
    requirement: 'Privacy notices, consent records, and breach reports must be identifiable and traceable for INAI compliance.',
    patterns: [
      { name: 'Privacy Notice',   template: '{ENUM:AVPRIV|CONSENT|BREACH|ARCO}-{TEXT}-{DATE:YYYY-MM-DD}', example: 'AVPRIV-WebApp-2026-03-01', extensions: ['pdf'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AMERICAS — ARGENTINA
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'afip_ar', name: 'AFIP Factura Electrónica',
    fullName: 'AFIP — Administración Federal de Ingresos Públicos — Argentina',
    area: 'Fiscal / Tax', sectors: ['Commerce','Services','All'],
    region: 'Americas', countries: ['Argentina'],
    obligation: 'mandatory',
    requirement: 'Electronic invoices (Factura A, B, C) must include CUIT, point of sale, invoice number, and CAE code.',
    patterns: [
      { name: 'Factura Electrónica', template: 'FE-{ENUM:A|B|C}-{NUM:5}-{NUM:8}-{DATE:YYYYMMDD}', example: 'FE-A-00001-00000042-20260301', extensions: ['pdf','xml'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AMERICAS — COLOMBIA
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'dian_co', name: 'DIAN Facturación Electrónica',
    fullName: 'DIAN — Dirección de Impuestos y Aduanas Nacionales — Colombia',
    area: 'Fiscal / Tax', sectors: ['Commerce','Services','All'],
    region: 'Americas', countries: ['Colombia'],
    obligation: 'mandatory',
    requirement: 'Electronic invoices must follow DIAN technical resolution with NIT, invoice prefix and number.',
    patterns: [
      { name: 'Factura Electrónica CO', template: 'FE-{TEXT}-{NUM:10}-{DATE:YYYYMMDD}', example: 'FE-NIT900123456-0000000001-20260301', extensions: ['xml','pdf'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AMERICAS — CHILE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'sii_cl', name: 'SII DTE (Chile)',
    fullName: 'SII — Servicio de Impuestos Internos — Documento Tributario Electrónico',
    area: 'Fiscal / Tax', sectors: ['Commerce','Services','All'],
    region: 'Americas', countries: ['Chile'],
    obligation: 'mandatory',
    requirement: 'Electronic tax documents (DTE) must include RUT, document type code, and folio number.',
    patterns: [
      { name: 'DTE XML',          template: 'DTE-{ENUM:33|34|39|41|43|46|52|56|61}-{TEXT}-{NUM:10}', example: 'DTE-33-RUT12345678-0000000001', extensions: ['xml'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AMERICAS — CANADA
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'pipeda_ca', name: 'PIPEDA (Canada)',
    fullName: 'Personal Information Protection and Electronic Documents Act',
    area: 'Data Protection', sectors: ['All'],
    region: 'Americas', countries: ['Canada'],
    obligation: 'mandatory',
    requirement: 'Organizations must maintain records of consent, breaches, and data processing activities per OPC guidelines.',
    patterns: [
      { name: 'PIPEDA Record',    template: '{ENUM:CONSENT|BREACH|PIA|COMPLAINT}-{TEXT}-{DATE:YYYY-MM-DD}', example: 'PIA-MobileApp-2026-03-01', extensions: ['pdf','docx'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EUROPE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'gdpr', name: 'GDPR (EU 2016/679)',
    fullName: 'General Data Protection Regulation — Articles 5 and 30',
    area: 'Data Protection', sectors: ['All (EU resident data operations)'],
    region: 'Europe', countries: ['European Union'],
    obligation: 'mandatory',
    requirement: 'Art. 30: Records of Processing Activities. DPIAs, breach reports (72h), and DPAs must be identifiable.',
    patterns: [
      { name: 'DPIA / ROPA',      template: '{ENUM:DPIA|ROPA|DPA|BREACH}-{TEXT}-{DATE:YYYY-MM-DD}', example: 'DPIA-WebPlatform-2026-03-01', extensions: ['pdf','docx'] }
    ]
  },
  {
    id: 'eidas', name: 'eIDAS (EU 910/2014)',
    fullName: 'Electronic Identification and Trust Services Regulation',
    area: 'Digital Trust', sectors: ['Government','Financial','Legal'],
    region: 'Europe', countries: ['European Union'],
    obligation: 'mandatory',
    requirement: 'Electronic signatures, seals, and timestamps must follow eIDAS trust levels. Signed documents must reflect signer and timestamp.',
    patterns: [
      { name: 'Signed Document',   template: '{ENUM:QSIG|ASIG|SEAL}-{TEXT}-{DATE:YYYYMMDD}-{VERSION}', example: 'QSIG-Contract-20260301-v01', extensions: ['pdf'] }
    ]
  },
  {
    id: 'nis2_eu', name: 'NIS2 Directive (EU 2022/2555)',
    fullName: 'Network and Information Security Directive 2',
    area: 'Cybersecurity', sectors: ['Critical Infrastructure','Energy','Transport','Health','Banking','Digital'],
    region: 'Europe', countries: ['European Union'],
    obligation: 'mandatory',
    requirement: 'Essential and important entities must maintain incident reports, risk assessments, and security policies with clear identification.',
    patterns: [
      { name: 'NIS2 Report',      template: '{ENUM:INC|RISK|POL|AUDIT}-NIS2-{TEXT}-{DATE:YYYY-MM-DD}', example: 'INC-NIS2-EnergyGrid-2026-03-01', extensions: ['pdf'] }
    ]
  },
  {
    id: 'dora_eu', name: 'DORA (EU 2022/2554)',
    fullName: 'Digital Operational Resilience Act',
    area: 'Financial / IT', sectors: ['Banking','Insurance','Investment','Fintech'],
    region: 'Europe', countries: ['European Union'],
    obligation: 'mandatory',
    requirement: 'ICT risk management framework: incident reports, third-party risk assessments, and resilience test results.',
    patterns: [
      { name: 'DORA Report',      template: '{ENUM:ICT-INC|ICT-RISK|ICT-TPR|ICT-TEST}-{NUM:6}-{DATE:YYYY-MM-DD}', example: 'ICT-INC-000042-2026-03-01', extensions: ['pdf'] }
    ]
  },
  {
    id: 'uk_gdpr', name: 'UK GDPR + DPA 2018',
    fullName: 'UK General Data Protection Regulation + Data Protection Act 2018',
    area: 'Data Protection', sectors: ['All'],
    region: 'Europe', countries: ['United Kingdom'],
    obligation: 'mandatory',
    requirement: 'Mirrors EU GDPR. ICO requires Records of Processing, DPIAs, and breach notifications to be identifiable.',
    patterns: [
      { name: 'UK GDPR Record',   template: '{ENUM:DPIA|ROPA|BREACH|SAR}-UK-{TEXT}-{DATE:YYYY-MM-DD}', example: 'DPIA-UK-CRM-2026-03-01', extensions: ['pdf','docx'] }
    ]
  },
  {
    id: 'gobd_de', name: 'GoBD (Germany)',
    fullName: 'Grundsätze ordnungsmäßiger Buchführung — Germany',
    area: 'Fiscal / Tax', sectors: ['All'],
    region: 'Europe', countries: ['Germany'],
    obligation: 'mandatory',
    requirement: 'Tax-relevant electronic documents must be archived with original format, complete index, and traceable naming per BMF guidelines.',
    patterns: [
      { name: 'GoBD Archive',     template: '{ENUM:RECH|BELEG|KONTO|BUCH}-{NUM:8}-{DATE:YYYYMMDD}', example: 'RECH-00042000-20260301', extensions: ['pdf','xml'] }
    ]
  },
  {
    id: 'facturae_es', name: 'Factura-e (Spain)',
    fullName: 'Factura Electrónica — Ley 25/2013 — Spain',
    area: 'Fiscal / Tax', sectors: ['Commerce','Services','Public Sector'],
    region: 'Europe', countries: ['Spain'],
    obligation: 'mandatory',
    requirement: 'Electronic invoices to public administration must follow Factura-e XML format with NIF and invoice number.',
    patterns: [
      { name: 'Factura-e XML',    template: 'FE-{TEXT}-{NUM:8}-{DATE:YYYYMMDD}', example: 'FE-NIF12345678A-00000042-20260301', extensions: ['xml','pdf'] }
    ]
  },
  {
    id: 'fatturapa_it', name: 'FatturaPA (Italy)',
    fullName: 'Fatturazione Elettronica — SDI — Italy',
    area: 'Fiscal / Tax', sectors: ['Commerce','Services','All'],
    region: 'Europe', countries: ['Italy'],
    obligation: 'mandatory',
    requirement: 'All B2B and B2G invoices must be transmitted via SDI in XML format with Codice Fiscale/P.IVA.',
    patterns: [
      { name: 'FatturaPA XML',    template: '{TEXT}-{NUM:5}-{DATE:YYYYMMDD}', example: 'IT01234567890-00042-20260301', extensions: ['xml','p7m'] }
    ]
  },
  {
    id: 'cnil_fr', name: 'CNIL Guidelines (France)',
    fullName: 'Commission Nationale de l\'Informatique et des Libertés',
    area: 'Data Protection', sectors: ['All'],
    region: 'Europe', countries: ['France'],
    obligation: 'mandatory',
    requirement: 'CNIL requires DPIAs, breach notifications (within 72h), and register of processing activities per GDPR + French specificities.',
    patterns: [
      { name: 'CNIL Record',      template: '{ENUM:AIPD|REGISTRE|VIOLATION|CONSENT}-{TEXT}-{DATE:YYYY-MM-DD}', example: 'AIPD-SiteWeb-2026-03-01', extensions: ['pdf'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ASIA-PACIFIC
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'appi_jp', name: 'APPI (Japan)',
    fullName: 'Act on Protection of Personal Information — Japan',
    area: 'Data Protection', sectors: ['All'],
    region: 'Asia-Pacific', countries: ['Japan'],
    obligation: 'mandatory',
    requirement: 'PPC requires records of data handling, third-party provisions, and breach reports with clear identification.',
    patterns: [
      { name: 'APPI Record',      template: '{ENUM:HANDLING|PROVISION|BREACH|CONSENT}-{TEXT}-{DATE:YYYY-MM-DD}', example: 'BREACH-AppService-2026-03-01', extensions: ['pdf'] }
    ]
  },
  {
    id: 'privacy_au', name: 'Privacy Act 1988 (Australia)',
    fullName: 'Australian Privacy Act — APP Guidelines',
    area: 'Data Protection', sectors: ['All'],
    region: 'Asia-Pacific', countries: ['Australia'],
    obligation: 'mandatory',
    requirement: 'APPs require privacy impact assessments, NDB scheme breach reports, and consent records.',
    patterns: [
      { name: 'AU Privacy Record', template: '{ENUM:PIA|NDB|CONSENT|TIA}-{TEXT}-{DATE:YYYY-MM-DD}', example: 'NDB-DataBreach-2026-03-01', extensions: ['pdf'] }
    ]
  },
  {
    id: 'apra_au', name: 'APRA CPS 234 (Australia)',
    fullName: 'Australian Prudential Regulation Authority — Information Security',
    area: 'Financial / Security', sectors: ['Banking','Insurance','Superannuation'],
    region: 'Asia-Pacific', countries: ['Australia'],
    obligation: 'mandatory',
    requirement: 'Regulated entities must maintain information security incident reports, risk assessments, and control testing records.',
    patterns: [
      { name: 'APRA Security Doc', template: '{ENUM:ISP|INC|RISK|TEST}-CPS234-{NUM:5}-{DATE:YYYY-MM-DD}', example: 'INC-CPS234-00042-2026-03-01', extensions: ['pdf'] }
    ]
  },
  {
    id: 'dpdp_in', name: 'DPDP Act 2023 (India)',
    fullName: 'Digital Personal Data Protection Act — India',
    area: 'Data Protection', sectors: ['All'],
    region: 'Asia-Pacific', countries: ['India'],
    obligation: 'mandatory',
    requirement: 'Data fiduciaries must maintain records of consent, processing activities, and breach notifications per DPA Board.',
    patterns: [
      { name: 'DPDP Record',      template: '{ENUM:CONSENT|DPIA|BREACH|NOTICE}-{TEXT}-{DATE:YYYY-MM-DD}', example: 'BREACH-FinApp-2026-03-01', extensions: ['pdf'] }
    ]
  },
  {
    id: 'pipa_kr', name: 'PIPA (South Korea)',
    fullName: 'Personal Information Protection Act — South Korea',
    area: 'Data Protection', sectors: ['All'],
    region: 'Asia-Pacific', countries: ['South Korea'],
    obligation: 'mandatory',
    requirement: 'PIPC requires impact assessments, processing records, and breach reports with identification by system and date.',
    patterns: [
      { name: 'PIPA Record',      template: '{ENUM:PIA|BREACH|CONSENT|AUDIT}-{TEXT}-{DATE:YYYY-MM-DD}', example: 'PIA-EcommPlatform-2026-03-01', extensions: ['pdf'] }
    ]
  },
  {
    id: 'pipl_cn', name: 'PIPL (China)',
    fullName: 'Personal Information Protection Law — China',
    area: 'Data Protection', sectors: ['All'],
    region: 'Asia-Pacific', countries: ['China'],
    obligation: 'mandatory',
    requirement: 'Art. 55-56: PIAs for sensitive data, cross-border transfers, and automated decision-making. Records must be kept for 3+ years.',
    patterns: [
      { name: 'PIPL Record',      template: '{ENUM:PIA|CROSS-BORDER|ADM|BREACH}-{TEXT}-{DATE:YYYY-MM-DD}', example: 'CROSS-BORDER-CloudService-2026-03-01', extensions: ['pdf'] }
    ]
  },
  {
    id: 'pdpa_sg', name: 'PDPA (Singapore)',
    fullName: 'Personal Data Protection Act — Singapore',
    area: 'Data Protection', sectors: ['All'],
    region: 'Asia-Pacific', countries: ['Singapore'],
    obligation: 'mandatory',
    requirement: 'PDPC requires data protection policies, breach notification records, and impact assessments.',
    patterns: [
      { name: 'PDPA Record',      template: '{ENUM:DPP|DPIA|BREACH|CONSENT}-SG-{TEXT}-{DATE:YYYY-MM-DD}', example: 'BREACH-SG-AppService-2026-03-01', extensions: ['pdf'] }
    ]
  },
  {
    id: 'pdpa_th', name: 'PDPA (Thailand)',
    fullName: 'Personal Data Protection Act B.E. 2562 — Thailand',
    area: 'Data Protection', sectors: ['All'],
    region: 'Asia-Pacific', countries: ['Thailand'],
    obligation: 'mandatory',
    requirement: 'Data controllers must maintain records of processing activities, DPIAs, and breach notifications.',
    patterns: [
      { name: 'TH PDPA Record',   template: '{ENUM:ROPA|DPIA|BREACH|CONSENT}-TH-{TEXT}-{DATE:YYYY-MM-DD}', example: 'ROPA-TH-HRSystem-2026-03-01', extensions: ['pdf'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MIDDLE EAST
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'israel_archives', name: 'Israel Archives Law (תשט"ו-1955)',
    fullName: 'Israel State Archives Law — Document Preservation',
    area: 'Government / Archives', sectors: ['Government','Public Institutions'],
    region: 'Middle East', countries: ['Israel'],
    obligation: 'mandatory',
    requirement: 'Public institutions must preserve documents with systematic naming enabling retrieval by category, date, and origin.',
    patterns: [
      { name: 'State Archive Document', template: '{ENUM:GOV|MUN|EDU|SEC}-{TEXT}-{NUM:6}-{DATE:YYYY}', example: 'GOV-Policy-000042-2026', extensions: ['pdf'] }
    ]
  },
  {
    id: 'israel_privacy', name: 'Israel Privacy Protection Law (5741-1981)',
    fullName: 'Protection of Privacy Law — Database Registration',
    area: 'Data Protection', sectors: ['All'],
    region: 'Middle East', countries: ['Israel'],
    obligation: 'mandatory',
    requirement: 'Organizations must maintain registered databases with documented processing activities for PPA audits.',
    patterns: [
      { name: 'PPA Compliance Record', template: '{ENUM:DB-REG|CONSENT|AUDIT|BREACH}-{TEXT}-{DATE:YYYY-MM-DD}', example: 'AUDIT-SystemY-2026-03-01', extensions: ['pdf','xlsx'] }
    ]
  },
  {
    id: 'pdpl_sa', name: 'PDPL (Saudi Arabia)',
    fullName: 'Personal Data Protection Law — Royal Decree M/19',
    area: 'Data Protection', sectors: ['All'],
    region: 'Middle East', countries: ['Saudi Arabia'],
    obligation: 'mandatory',
    requirement: 'SDAIA requires records of processing, impact assessments, and breach notifications.',
    patterns: [
      { name: 'PDPL Record',      template: '{ENUM:ROPA|DPIA|BREACH|CONSENT}-SA-{TEXT}-{DATE:YYYY-MM-DD}', example: 'DPIA-SA-CloudPlatform-2026-03-01', extensions: ['pdf'] }
    ]
  },
  {
    id: 'difc_ae', name: 'DIFC Data Protection Law (UAE)',
    fullName: 'Dubai International Financial Centre — Data Protection Law No. 5/2020',
    area: 'Data Protection', sectors: ['Financial','All'],
    region: 'Middle East', countries: ['UAE'],
    obligation: 'mandatory',
    requirement: 'DIFC-regulated entities must maintain DPIAs, processing records, and breach logs.',
    patterns: [
      { name: 'DIFC Record',      template: '{ENUM:DPIA|ROPA|BREACH|CONSENT}-DIFC-{TEXT}-{DATE:YYYY-MM-DD}', example: 'DPIA-DIFC-TradingApp-2026-03-01', extensions: ['pdf'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AFRICA
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'popia_za', name: 'POPIA (South Africa)',
    fullName: 'Protection of Personal Information Act — South Africa',
    area: 'Data Protection', sectors: ['All'],
    region: 'Africa', countries: ['South Africa'],
    obligation: 'mandatory',
    requirement: 'Information Regulator requires PIAs, breach notifications, and processing records per POPIA sections 18-22.',
    patterns: [
      { name: 'POPIA Record',     template: '{ENUM:PIA|BREACH|CONSENT|MANUAL}-ZA-{TEXT}-{DATE:YYYY-MM-DD}', example: 'PIA-ZA-CRMSystem-2026-03-01', extensions: ['pdf'] }
    ]
  },
  {
    id: 'ndpr_ng', name: 'NDPR / NDPA (Nigeria)',
    fullName: 'Nigeria Data Protection Regulation / Act 2023',
    area: 'Data Protection', sectors: ['All'],
    region: 'Africa', countries: ['Nigeria'],
    obligation: 'mandatory',
    requirement: 'NDPC requires data audits, DPIAs, breach notifications, and processing records.',
    patterns: [
      { name: 'NDPR Record',      template: '{ENUM:DPIA|AUDIT|BREACH|CONSENT}-NG-{TEXT}-{DATE:YYYY-MM-DD}', example: 'AUDIT-NG-BankApp-2026-03-01', extensions: ['pdf'] }
    ]
  },
  {
    id: 'dpa_ke', name: 'Data Protection Act 2019 (Kenya)',
    fullName: 'Kenya Data Protection Act — ODPC',
    area: 'Data Protection', sectors: ['All'],
    region: 'Africa', countries: ['Kenya'],
    obligation: 'mandatory',
    requirement: 'ODPC requires DPIAs, data audits, and breach reports for data controllers and processors.',
    patterns: [
      { name: 'KE DPA Record',    template: '{ENUM:DPIA|AUDIT|BREACH|CONSENT}-KE-{TEXT}-{DATE:YYYY-MM-DD}', example: 'DPIA-KE-HealthApp-2026-03-01', extensions: ['pdf'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GENERIC / INTERNAL POLICIES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'internal_generic', name: 'Internal Corporate Policy',
    fullName: 'Templates for Internal Naming Policies',
    area: 'General / Internal', sectors: ['All'],
    region: 'Global', countries: ['Any'],
    obligation: 'recommended',
    requirement: 'Internal naming policies for organization, search, backup, and audit readiness.',
    patterns: [
      { name: 'Generic Document',     template: '{ENUM:CONT|REP|MIN|PROP|PLAN}-{NUM:5}-{TEXT}-{DATE:YYYY-MM-DD}', example: 'REP-00001-Quarterly-2026-03-01', extensions: ['pdf','docx','xlsx'] },
      { name: 'Spreadsheet / Report', template: '{TEXT}-{DATE:YYYYMMDD}-{VERSION}',                                example: 'Metrics-20260301-v01',           extensions: ['xlsx','csv'] },
      { name: 'Image / Photo',        template: '{TEXT}-{DATE:YYYYMMDD}-{NUM:4}',                                  example: 'Event-Kickoff-20260301-0001',    extensions: ['jpg','png','jpeg'] },
      { name: 'System Backup',        template: 'BKP-{TEXT}-{DATE:YYYYMMDD}-{ENUM:FULL|INCR|DIFF}',                example: 'BKP-Database-20260301-FULL',     extensions: ['bak','zip','tar','gz'] }
    ]
  }
];

// ── Official URLs per normative ───────────────────────────────────────────────
const URLS = {
  // Global
  iso9001:        'https://www.iso.org/standard/62085.html',
  iso13485:       'https://www.iso.org/standard/59752.html',
  iso15489:       'https://www.iso.org/standard/62183.html',
  iso27001:       'https://www.iso.org/standard/27001',
  iso14001:       'https://www.iso.org/standard/60857.html',
  iso45001:       'https://www.iso.org/standard/63787.html',
  iso19650:       'https://www.iso.org/standard/68078.html',
  pci_dss:        'https://www.pcisecuritystandards.org/document_library/',
  // Brazil
  nfe:            'https://www.nfe.fazenda.gov.br/',
  nfse:           'https://www.nfse.gov.br/',
  cte:            'https://www.cte.fazenda.gov.br/',
  sped:           'https://sped.rfb.gov.br/',
  esocial:        'https://esocial.fazenda.gov.br/',
  bacen4893:      'https://www.bcb.gov.br/estabilidadefinanceira/ciber_seguranca',
  cvm:            'https://conteudo.cvm.gov.br/legislacao/instrucoes/inst480.html',
  cfm1821:        'https://www.cfm.org.br/',
  anvisa:         'https://www.gov.br/anvisa/',
  lgpd:           'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm',
  cnj065:         'https://atos.cnj.jus.br/atos/detalhar/187',
  clt_rh:         'https://esocial.fazenda.gov.br/',
  conarq:         'https://www.gov.br/conarq/pt-br',
  decreto10278:   'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/decreto/d10278.htm',
  abnt_nbr:       'https://www.abnt.org.br/',
  mapa_agro:      'https://www.gov.br/agricultura/pt-br',
  // USA
  sox:            'https://www.sec.gov/about/laws/soa2002.pdf',
  hipaa:          'https://www.hhs.gov/hipaa/',
  fda21cfr11:     'https://www.ecfr.gov/current/title-21/part-11',
  finra:          'https://www.finra.org/rules-guidance/rulebooks/finra-rules/4511',
  dod5015:        'https://dodcio.defense.gov/',
  nist80053:      'https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final',
  ferpa:          'https://studentprivacy.ed.gov/',
  // Mexico
  cfdi_mx:        'https://www.sat.gob.mx/consultas/43074/factura-electronica',
  lfpdppp_mx:     'https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf',
  // Argentina
  afip_ar:        'https://www.afip.gob.ar/',
  // Colombia
  dian_co:        'https://www.dian.gov.co/',
  // Chile
  sii_cl:         'https://www.sii.cl/',
  // Canada
  pipeda_ca:      'https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/',
  // Europe
  gdpr:           'https://gdpr-info.eu/',
  eidas:          'https://digital-strategy.ec.europa.eu/en/policies/eidas-regulation',
  nis2_eu:        'https://digital-strategy.ec.europa.eu/en/policies/nis2-directive',
  dora_eu:        'https://eur-lex.europa.eu/eli/reg/2022/2554/oj',
  uk_gdpr:        'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/',
  gobd_de:        'https://www.bundesfinanzministerium.de/',
  facturae_es:    'https://www.facturae.gob.es/',
  fatturapa_it:   'https://www.fatturapa.gov.it/',
  cnil_fr:        'https://www.cnil.fr/',
  // Asia-Pacific
  appi_jp:        'https://www.ppc.go.jp/en/',
  privacy_au:     'https://www.oaic.gov.au/',
  apra_au:        'https://www.apra.gov.au/',
  dpdp_in:        'https://www.meity.gov.in/',
  pipa_kr:        'https://www.pipc.go.kr/eng/',
  pipl_cn:        'https://digichina.stanford.edu/work/translation-personal-information-protection-law-of-the-peoples-republic-of-china-effective-nov-1-2021/',
  pdpa_sg:        'https://www.pdpc.gov.sg/',
  pdpa_th:        'https://www.mdes.go.th/',
  // Middle East
  israel_archives:'https://www.archives.gov.il/',
  israel_privacy: 'https://www.gov.il/en/departments/the_privacy_protection_authority',
  pdpl_sa:        'https://sdaia.gov.sa/',
  difc_ae:        'https://www.difc.ae/business/operating/data-protection/',
  // Africa
  popia_za:       'https://www.justice.gov.za/inforeg/',
  ndpr_ng:        'https://ndpc.gov.ng/',
  dpa_ke:         'https://www.odpc.go.ke/',
  // Generic
  internal_generic: null,
};

/** Normalize a normative entry. */
function normalize(n) {
  return {
    ...n,
    category: n.category || n.area || 'General',
    scope:    n.scope    || (Array.isArray(n.countries) ? n.countries.join(', ') : (n.countries || '')),
    url:      URLS[n.id] || n.url || null,
  };
}

function getAll()    { return normatives.map(normalize).sort((a, b) => a.area.localeCompare(b.area)); }
function getById(id) { const n = normatives.find(x => x.id === id); return n ? normalize(n) : null; }

function byArea() {
  const groups = {};
  for (const n of normatives) { if (!groups[n.area]) groups[n.area] = []; groups[n.area].push(normalize(n)); }
  return groups;
}

function byRegion() {
  const groups = {};
  for (const n of normatives) { const r = n.region || 'Global'; if (!groups[r]) groups[r] = []; groups[r].push(normalize(n)); }
  return groups;
}

function byCountry() {
  const groups = {};
  for (const n of normatives) {
    for (const c of (n.countries || ['Global'])) {
      if (!groups[c]) groups[c] = [];
      groups[c].push(normalize(n));
    }
  }
  return groups;
}

/** Get list of all unique regions. */
function getRegions() { return [...new Set(normatives.map(n => n.region || 'Global'))].sort(); }

/** Get list of all unique countries. */
function getCountries() { return [...new Set(normatives.flatMap(n => n.countries || ['Global']))].sort(); }

module.exports = { normatives, getAll, getById, byArea, byRegion, byCountry, getRegions, getCountries };
