/**
 * Automotive Audit & Consulting - Interactive Workshop Workflow Modal & Engine
 * Provides interactive detailed breakdowns for all 22 workshop stages, 
 * Auditor's Eyes control checks, and Live Control Tower metrics.
 */

const WORKFLOW_DATA = {
  1: {
    num: "01",
    title: "Appointment Booking",
    phase: "Phase 1: Inbound & Reception",
    department: "Customer Relations (CRM) & Service Marketing",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    activities: [
      "Online, telephone, mobile app, and walk-in appointment recording.",
      "Customer contact, vehicle VIN, registration, and service history lookup.",
      "Checking open recalls, warranty eligibility, and active AMC packages.",
      "Preliminary service advisor assignment and bay slot scheduling."
    ],
    dmsMapping: "Appointments Register, Customer Master Database, Service History Register",
    auditChecks: [
      "Unrecorded walk-ins bypassing appointment queue logs.",
      "Fabricated/dummy appointments created to artificially inflate booking conversion KPIs.",
      "Failure to check open OEM recall campaigns resulting in missed warranty recovery.",
      "Appointment-to-actual arrival drop-off rates unanalyzed."
    ],
    verificationRule: "Compare timestamp of appointment booking vs actual vehicle entry in Gate In register.",
    redFlag: "High variance (>30%) between booked appointments and actual workshop arrivals without documented cancellation reason.",
    financialImpact: "Loss of customer retention, missed AMC renewals, and forfeited OEM campaign reimbursements."
  },
  2: {
    num: "02",
    title: "Vehicle Arrival at Dealership",
    phase: "Phase 1: Inbound & Reception",
    department: "Customer Reception & Floor Coordination",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`,
    activities: [
      "Greeting customer at workshop reception canopy.",
      "Digital token generation and queue management assignment.",
      "Directing vehicle to designated arrival inspection bay.",
      "Customer lounge guidance and preliminary advisor introduction."
    ],
    dmsMapping: "Arrival / Queue Register, Token Management Log, Gate Pass Register",
    auditChecks: [
      "Customer wait-time exceeding OEM standard (>10 mins without advisor greeting).",
      "Vehicles entering workshop premises without token generation.",
      "Token order manipulation allowing favored customers to jump the queue.",
      "Customer drive-aways due to unmanaged reception chaos."
    ],
    verificationRule: "Timestamp delta: Arrival Token Generation vs Service Advisor Greeting Time.",
    redFlag: "Queue tokens cancelled or deleted post-generation to conceal customer waiting times.",
    financialImpact: "Drop in OEM Customer Satisfaction Index (CSI), customer defection to independent garages."
  },
  3: {
    num: "03",
    title: "Security Gate Entry",
    phase: "Phase 1: Inbound & Reception",
    department: "Security Gate & Loss Prevention",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    activities: [
      "Exact entry timestamp recording at security boom barrier.",
      "Vehicle registration number & VIN chassis number physical verification.",
      "Digital photo capture of odometer reading and dashboard fuel level gauge.",
      "Four-sided vehicle exterior condition and pre-existing dent/scratch photography."
    ],
    dmsMapping: "Gate Pass Register (Inward), Security Entry Log, Vehicle Photo Repository",
    auditChecks: [
      "Vehicles entering workshop without Gate In timestamp entry.",
      "Missing odometer and fuel level photos enabling staff unauthorized driving.",
      "Unrecorded pre-existing body dents leading to false customer claims against workshop.",
      "Chassis number mismatch between physical VIN plate and DMS database."
    ],
    verificationRule: "100% reconciliation: Every vehicle physically present on premises must have a valid Gate In timestamp within 10 minutes of arrival.",
    redFlag: "Gate In registers missing odometer readings or fuel level documentation.",
    financialImpact: "False damage claim payouts, vehicle theft exposure, and unauthorized vehicle joyriding liabilities."
  },
  4: {
    num: "04",
    title: "Job Card Creation",
    phase: "Phase 1: Inbound & Reception",
    department: "Service Advisory Desk",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    activities: [
      "Customer primary and secondary complaints detailed transcription.",
      "Odometer reading, fuel gauge, and tyre condition capture in DMS.",
      "Reviewing past service records, pending warranty claims, and service due history.",
      "Recording customer insurance validity, policy number, and contact info."
    ],
    dmsMapping: "Job Card Master Register, Service History Log, Customer Complaints Register",
    auditChecks: [
      "Vague or missing complaint descriptions (e.g. 'General Checkup') masking specific issues.",
      "Backdated Job Cards opened to manipulate monthly intake figures.",
      "Dummy Job Cards opened for internal dealership vehicles to meet OEM targets.",
      "Job Cards opened without customer physical or digital signature."
    ],
    verificationRule: "Cross-reference Job Card opening timestamp with Security Gate In entry (maximum allowed delta: 30 minutes).",
    redFlag: "Cluster of Job Cards opened during closing hours of the last day of the month.",
    financialImpact: "Distorted workshop productivity figures, unbilled repairs, and audit disallowances."
  },
  5: {
    num: "05",
    title: "Service Advisor Inspection",
    phase: "Phase 1: Inbound & Reception",
    department: "Service Advisory & Diagnostics",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    activities: [
      "Comprehensive 360-degree vehicle exterior and interior walkaround inspection.",
      "Customer personal valuables, spare tyre, toolkit, and boot accessories checklist.",
      "Vehicle documents (RC, Insurance copy, PUC) verification.",
      "Preliminary diagnostic road test with customer if unusual noise or fault reported."
    ],
    dmsMapping: "Road Test Register, Estimate Register, Pre-Service Inspection Checklist",
    auditChecks: [
      "Skipped 360° inspection checklist leading to disputes over missing toolkits.",
      "Unauthorized diagnostic road tests conducted outside designated test routes.",
      "Road tests conducted without trade certificate (TC) plates or fuel logs.",
      "Warning lights (Check Engine, ABS) observed on dashboard but omitted from Job Card."
    ],
    verificationRule: "Physical or digital inspection checklist signed by customer and advisor linked to Job Card.",
    redFlag: "Missing vehicle condition checklist on high-value luxury and commercial vehicles.",
    financialImpact: "Dealership compensation for alleged missing customer property and legal risk during road tests."
  },
  6: {
    num: "06",
    title: "Estimate Preparation",
    phase: "Phase 2: Estimation & Bay Allocation",
    department: "Service Advisory & Estimation Desk",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    activities: [
      "Preparation of itemized estimate: labour operations, spare parts, and consumables.",
      "Verification of manufacturer warranty coverage, EW packages, and AMC entitlements.",
      "Calculation of applicable discounts strictly according to written management policy.",
      "Printing and digital transmission (WhatsApp / SMS link) of official estimate to customer."
    ],
    dmsMapping: "Estimate Register, Package / AMC Register, Master Price Catalog",
    auditChecks: [
      "Inflated preliminary estimates used to push unneeded work on customers.",
      "Unauthorized manual discount promises made verbally without management sign-off.",
      "Non-OEM or aftermarket parts quoted at genuine OEM prices.",
      "Unverified AMC / warranty claims quoted as chargeable customer work."
    ],
    verificationRule: "Compare initial estimate line items against DMS master flat-rate price catalog.",
    redFlag: "Estimate variance exceeding 20% on final tax invoice without documented revision approval.",
    financialImpact: "Customer billing disputes, cancelled invoices, and revenue leakage from unauthorized discounts."
  },
  7: {
    num: "07",
    title: "Customer Approval",
    phase: "Phase 2: Estimation & Bay Allocation",
    department: "Customer Service Management",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    activities: [
      "Capturing written or digital approval from customer before initiating repairs.",
      "Documenting customer acceptance of itemized scope, parts, labour, and estimated delivery time.",
      "Securing explicit approval evidence: Digital OTP, WhatsApp confirmation, or physical signature.",
      "Archiving approval evidence directly into DMS Job Card file."
    ],
    dmsMapping: "Estimate Register, Digital Customer Approval Log, Document Repository",
    auditChecks: [
      "Repairs initiated on verbal promises without verifiable approval records.",
      "Additional work executed without documented revised approval.",
      "Backdated approvals forged by service advisors after customer complaints at delivery.",
      "Missing customer signature on high-value repair estimates (>₹25,000)."
    ],
    verificationRule: "Customer approval timestamp must strictly precede technician labour clocking and parts store issuance.",
    redFlag: "Customer approval timestamp logged AFTER the final tax invoice generation date.",
    financialImpact: "Forced credit notes, disputed bills, write-offs of unapproved parts and labour."
  },
  8: {
    num: "08",
    title: "Workshop Manager Allocation",
    phase: "Phase 2: Estimation & Bay Allocation",
    department: "Workshop Management & Floor Control",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    activities: [
      "Bay allocation based on job nature (Quick Service, Periodic Maintenance, Heavy Mechanical, Body Shop).",
      "Work prioritization based on promised customer delivery schedule.",
      "Balancing workshop bay workload to eliminate bottlenecks.",
      "Monitoring open Work-In-Progress (WIP) and vehicles awaiting parts or approvals."
    ],
    dmsMapping: "Job Card Master Register, Bay Allocation Log, WIP Dashboard",
    auditChecks: [
      "Idle bays while vehicles sit unassigned in the parking yard.",
      "Favorite customers jumping queue without management priority tag.",
      "Delayed bay allocation causing overall turnaround time (TAT) blowouts.",
      "Stalled repair orders lingering for days without reason codes in DMS."
    ],
    verificationRule: "Bay allocation timestamp vs Job Card approval timestamp (SLA: <= 20 minutes).",
    redFlag: "More than 15% of daily active vehicles parked without bay assignment during operating hours.",
    financialImpact: "Sub-optimal workshop capacity utilization, inflated overheads, and lost daily revenue."
  },
  9: {
    num: "09",
    title: "Technician Assignment",
    phase: "Phase 2: Estimation & Bay Allocation",
    department: "Floor Supervision & Technical Lead",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    activities: [
      "Skill-matching technician capabilities to job complexity (Electrical, Engine Overhaul, Diagnostic DTC).",
      "Verifying technician OEM certifications and training validity.",
      "Issuing physical work ticket and job instructions.",
      "Capturing official technician job start clocking timestamp."
    ],
    dmsMapping: "Technician Skill Matrix, Tech Attendance Register, Technician Clocking Log",
    auditChecks: [
      "Uncertified helpers or apprentices assigned to safety-critical brake/steering repairs.",
      "Ghost technician clocking (clocking in jobs under absent technicians).",
      "Technicians clocked on multiple active jobs simultaneously.",
      "Discrepancies between biometric door attendance and job card clocked hours."
    ],
    verificationRule: "Cross-reference technician biometric gate attendance with active job card clocking logs.",
    redFlag: "Technician billed for more than 12 hours of labour in a single 8-hour shift.",
    financialImpact: "Technician over-incentivization fraud, improper workmanship, and OEM warranty claim rejection."
  },
  10: {
    num: "10",
    title: "Parts Requirement",
    phase: "Phase 3: Parts & Service Bay Operations",
    department: "Service Bay & Technical Store Liaison",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    activities: [
      "Technical identification of required spare parts and repair kits.",
      "Cross-checking OEM parts catalog and electronic parts fiche.",
      "Recommending genuine manufacturer parts over aftermarket substitutes.",
      "Generating electronic Store Requisition Slip linked to active Job Card."
    ],
    dmsMapping: "Labour Operation Register, Parts Requisition Slip, Parts Catalog Master",
    auditChecks: [
      "Parts requisitioned that do not correspond to customer complaints or SOP diagnostic codes.",
      "Ordering full assembly replacements where child parts or repair kits were OEM-prescribed.",
      "Duplicate part requests submitted under separate lines for the same repair.",
      "High-value components requested without diagnostic scanner DTC attachment."
    ],
    verificationRule: "Requisitioned parts must map directly to authorized labour operation codes in OEM flat-rate manual.",
    redFlag: "Engine control modules (ECMs) or turbochargers ordered without diagnostic trouble code proof.",
    financialImpact: "Excess parts inventory holding, customer overcharging, and OEM warranty rejection."
  },
  11: {
    num: "11",
    title: "Parts Issue from Store",
    phase: "Phase 3: Parts & Service Bay Operations",
    department: "Spare Parts Store & Warehouse",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18"/></svg>`,
    activities: [
      "Physical stock availability check across warehouse bin locations.",
      "Strict enforcement of First-In-First-Out (FIFO) inventory issuance.",
      "Generating official DMS Issue Slip capturing part number, description, and bin.",
      "Physical parts handover to technician and updating real-time store ledger."
    ],
    dmsMapping: "Parts Issue to JC Register, Stock Register (Month-End), Requisition Log",
    auditChecks: [
      "Parts issued on hand-written slips or verbal requests without DMS issue entry.",
      "Parts physically issued to bay but never entered on customer Job Card.",
      "Storekeeper applying negative stock overrides to hide stockout conditions.",
      "Parts issued from high-value bins without technician physical signature."
    ],
    verificationRule: "Three-way match: Requisition Slip == DMS Parts Issue Register == Physical Bin Stock Deduction.",
    redFlag: "Persistent negative stock balances in fast-moving service items (filters, brake pads, fluids).",
    financialImpact: "Spare parts shrinkage, inventory balance sheet write-offs, and unbilled parts leakage."
  },
  12: {
    num: "12",
    title: "Repair / Service in Progress",
    phase: "Phase 3: Parts & Service Bay Operations",
    department: "Service Bays & Technicians",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    activities: [
      "Executing mechanical, electrical, and scheduled servicing strictly as per OEM SOP.",
      "Real-time labour time capture and milestone updates in DMS.",
      "Actual parts consumption, fitment, and old part tagging.",
      "Fluid dispensing via calibrated digital meter oil dispensers."
    ],
    dmsMapping: "Labour Operation Register, Warranty JC Register, Fluid Dispenser Logs",
    auditChecks: [
      "Technicians skipping mandated checklist operations to rush jobs.",
      "Billed labour operations not actually performed on the vehicle.",
      "Parts issued from store pocketed or set aside instead of fitted onto vehicle.",
      "Bulk oil dispenser meter readings drifting from invoiced litre counts."
    ],
    verificationRule: "Reconcile digital oil meter dispenser dispatches with Job Card billed oil quantities.",
    redFlag: "Jobs marked complete in 15 minutes that require a mandatory 90-minute OEM service schedule.",
    financialImpact: "Fluid shrinkage, customer vehicle breakdown liability, and loss of brand goodwill."
  },
  13: {
    num: "13",
    title: "Additional Work (If Any)",
    phase: "Phase 3: Parts & Service Bay Operations",
    department: "Service Advisory & Technical Inspection",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
    activities: [
      "Documenting unforeseen mechanical or safety defects uncovered during teardown.",
      "Photographing or recording video of worn components (brake discs, belts, leaks).",
      "Sharing video evidence with customer and explaining necessity of additional repairs.",
      "Generating revised estimate and securing explicit authorization before proceeding."
    ],
    dmsMapping: "Estimate Register (Revised), Customer Communication Log, Media Repository",
    auditChecks: [
      "Additional work carried out on customer vehicles without prior written/digital consent.",
      "Unscrupulous replacement of components that had substantial remaining useful life.",
      "Failure to preserve replaced defective parts for customer inspection at handover.",
      "Advisor verbally quoting one price and billing an inflated amount on final invoice."
    ],
    verificationRule: "Revised estimate approval timestamp must precede secondary parts requisition and labour clocking.",
    redFlag: "Customer refusal to clear invoice at delivery citing unauthorized additional repairs.",
    financialImpact: "Billing disputes, forced credit note concessions, and customer defection."
  },
  14: {
    num: "14",
    title: "Quality Check (QC) & Road Test",
    phase: "Phase 3: Parts & Service Bay Operations",
    department: "Quality Assurance & Road Test Inspector",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
    activities: [
      "Executing comprehensive technical QC checklist covering all repaired systems.",
      "Post-repair diagnostic OBD scanner scan to confirm zero active trouble codes (DTCs).",
      "Final supervisory road test to verify resolving of rattles, braking, and steering.",
      "Logging official Pass / Fail QC inspection result in DMS."
    ],
    dmsMapping: "Road Test Register, Quality Inspection Checklist, OBD Diagnostic Log",
    auditChecks: [
      "QC checklists rubber-stamped without opening bonnet or lifting vehicle.",
      "Missing road test logs where major suspension or engine work was performed.",
      "Vehicles passed with active dashboard check lights or low fluid levels.",
      "Road tests conducted without trade certificate (TC) plates."
    ],
    verificationRule: "Quality Controller digital credential sign-off recorded in DMS prior to vehicle moving to washing bay.",
    redFlag: "Customer returns within 48 hours for the exact same unresolved complaint.",
    financialImpact: "Catastrophic road safety liability, OEM penalty points, and customer warranty chargebacks."
  },
  15: {
    num: "15",
    title: "Rework (If QC Fails)",
    phase: "Phase 3: Parts & Service Bay Operations",
    department: "Quality Assurance & Bay Supervisor",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
    activities: [
      "Root cause analysis of failed repair or incomplete complaint resolution.",
      "Generating internal Rework Job Ticket with zero customer billing.",
      "Reassigning vehicle to original technician or master technician for rectification.",
      "Mandatory re-inspection and secondary road test sign-off by Quality Head."
    ],
    dmsMapping: "Labour Operation Register (Rework Tag), Rework Log, QA Discrepancy Log",
    auditChecks: [
      "Rework hours disguised as new chargeable customer labour.",
      "Additional parts damaged during rework billed to the vehicle owner.",
      "Failure to log rework events hiding technician incompetence from management.",
      "Delivery delay resulting from rework without informing customer."
    ],
    verificationRule: "Rework labour must carry an internal zero-charge code linked directly to the responsible technician.",
    redFlag: "Unrecorded internal rework causing unexplainable multi-hour delivery delays.",
    financialImpact: "Wasted workshop bay hours, technician productivity loss, and customer friction."
  },
  16: {
    num: "16",
    title: "Vehicle Washing & Cleaning",
    phase: "Phase 4: Billing, Gate-Out & Follow-Up",
    department: "Washing Bay & Detailing Division",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
    activities: [
      "Thorough underbody wash, pressure exterior wash, and interior deep vacuuming.",
      "Cleaning glass, dashboard conditioning, and tyre dressing application.",
      "Accessories fitment (floor mats, perfume, seat covers) if ordered.",
      "Wash completion checklist sign-off and vehicle transfer to delivery bay."
    ],
    dmsMapping: "Job Card Master Register (Wash Stage), Washing Bay Queue Log",
    auditChecks: [
      "Vehicles stuck in washing bottleneck causing delivery time commitment breaches.",
      "Poor washing quality: water spots, dirty windshields, wet floor mats.",
      "Washing consumables (shampoos, waxes) over-consumed or pilfered.",
      "Wash checklist signed off without vacuuming interior boot area."
    ],
    verificationRule: "Washing completion timestamp recorded in DMS before vehicle moves to Customer Delivery zone.",
    redFlag: "Vehicles idling in wash queue for more than 60 minutes after technical repair completion.",
    financialImpact: "Direct damage to Customer Satisfaction Index (CSI) scores and OEM dealer bonus deductions."
  },
  17: {
    num: "17",
    title: "Final Inspection by Service Advisor",
    phase: "Phase 4: Billing, Gate-Out & Follow-Up",
    department: "Service Advisory Desk",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
    activities: [
      "Service advisor inspects vehicle against original complaint list.",
      "Verifying clean interior, steering wheel wrap removal, and paper mat placement.",
      "Confirming replaced old parts are packaged in boot for customer verification.",
      "Notifying customer via automated SMS / Call that vehicle is ready for collection."
    ],
    dmsMapping: "Job Card Master Register, Customer Notification Log",
    auditChecks: [
      "Advisor notifies customer before bill is reviewed and generated.",
      "Customer arrives to find vehicle still unwashed or undergoing inspection.",
      "Replaced parts discarded in scrap bin instead of placed in customer boot.",
      "Customer personal property or toll cards missing from dashboard."
    ],
    verificationRule: "Advisor digital confirmation of delivery readiness in DMS prior to billing supervisor review.",
    redFlag: "Customer waiting in reception while advisor scrambles to locate the vehicle.",
    financialImpact: "Severe CSI penalties, customer dissatisfaction, and post-service complaints."
  },
  18: {
    num: "18",
    title: "Pre-Invoicing (Bill Review)",
    phase: "Phase 4: Billing, Gate-Out & Follow-Up",
    department: "Billing Supervision & Internal Controls",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    activities: [
      "Detailed reconciliation of parts issued from store against billable invoice lines.",
      "Verifying technician clocked hours against standard billable flat-rate codes.",
      "Auditing discount percentages against written management authorization matrices.",
      "Splitting line items accurately between Customer Paid, Insurance Claim, and OEM Warranty."
    ],
    dmsMapping: "Parts on Invoice Lines, Labour Operation Register, Stock Register (Month-End)",
    auditChecks: [
      "Parts issued from store dropped or omitted from final tax invoice (major leak!).",
      "Unauthorized discounts inserted at cashier level without GM approval code.",
      "Customer-paid items misallocated to warranty accounts or vice-versa.",
      "Missing consumables charges (brake cleaner, greases, shop supplies)."
    ],
    verificationRule: "Quantitative match: Total Store Parts Issued == Total Invoice Parts Billed (Zero Discrepancy).",
    redFlag: "High variance between pre-invoice draft and final tax invoice value.",
    financialImpact: "Direct monthly revenue leakage of ₹3,00,000 to ₹10,00,000 per dealership branch."
  },
  19: {
    num: "19",
    title: "Invoice Preparation",
    phase: "Phase 4: Billing, Gate-Out & Follow-Up",
    department: "Service Accounts & Billing Section",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`,
    activities: [
      "Generating official GST tax invoice with sequential alphanumeric series.",
      "Applying exact statutory tax rates (CGST, SGST, IGST) and HSN/SAC codes.",
      "Applying approved discount codes with mandatory authorization stamp.",
      "Printing official tax invoice and dispatching digital copy via email/WhatsApp."
    ],
    dmsMapping: "Tax Invoice Register, Cancelled Invoice Register, Credit/Debit Note Register",
    auditChecks: [
      "Cancelled tax invoices without senior management signed explanation.",
      "Missing sequence numbers in tax invoice series (tax evasion / audit risk).",
      "Manual tax rate overrides applied to bypass standard GST rates.",
      "Invoices split into multiple smaller bills to circumvent discount authorization caps."
    ],
    verificationRule: "Sequential invoice series audit: 100% check for missing, skipped, or duplicate invoice numbers.",
    redFlag: "Invoices cancelled hours after the vehicle has already left the dealership premises.",
    financialImpact: "Statutory GST penalties, tax scrutiny notices, and uncollected revenue."
  },
  20: {
    num: "20",
    title: "Payment Collection",
    phase: "Phase 4: Billing, Gate-Out & Follow-Up",
    department: "Cashier Desk & Financial Accounts",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
    activities: [
      "Collecting invoice balance across approved channels (Cash, Dynamic UPI, Credit/Debit Card POS, NEFT).",
      "Issuing official computerized receipt linked directly to the tax invoice number.",
      "Checking customer account for unallocated advance deposits or outstanding debits.",
      "Performing day-end cashier settlement and preparing daily bank deposit slip."
    ],
    dmsMapping: "Cash & Collection Summary, Advance Receipts Register, Debtors Outstanding, Tally Extract",
    auditChecks: [
      "Cash collections delayed in bank deposit (>24 hours) for personal cash-float use.",
      "Credit card POS settlement fees miscalculated or unverified against merchant bank.",
      "Advance booking payments left unallocated in suspense accounts.",
      "Uncollected insurance policy excess deductibles allowed to exit without payment."
    ],
    verificationRule: "Daily Bank Statement Credits + Cash in Hand = Total Day-End Invoiced Receipts.",
    redFlag: "Cash receipts held overnight by cashier without locked safe storage or bank slip.",
    financialImpact: "Cashier embezzlement, bank charge overbilling, and bad debt write-offs."
  },
  21: {
    num: "21",
    title: "Vehicle Delivery to Customer",
    phase: "Phase 4: Billing, Gate-Out & Follow-Up",
    department: "Customer Service Delivery & Security Desk",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`,
    activities: [
      "Customer vehicle physical handover ceremony at designated delivery bay.",
      "Detailed explanation of tax invoice line items, parts replaced, and warranty terms.",
      "Returning replaced old parts in protective packaging to customer.",
      "Generating computerized Barcode Gate Pass upon verified payment settlement."
    ],
    dmsMapping: "Gate Pass Register, Delivery Acknowledgment Slip, Customer Handover Form",
    auditChecks: [
      "Vehicles released on handwritten paper gate passes without paid invoice verification.",
      "Security gate barrier lifted on verbal promises or internal management requests.",
      "Vehicles exiting with Gate Pass issued hours after physical exit (GOR).",
      "Customer signs delivery receipt without receiving replaced old parts."
    ],
    verificationRule: "Paid Tax Invoice Number must match Barcode Gate Pass scanned at the exit barrier.",
    redFlag: "Vehicle exit timestamp logged PRIOR to the tax invoice creation timestamp.",
    financialImpact: "Vehicle release without payment, customer payment default, and loss of legal recourse."
  },
  "21A": {
    num: "21A",
    title: "Pre-Invoicing Stage (Critical Audit Gate)",
    phase: "Phase 4: Billing, Gate-Out & Follow-Up",
    department: "Internal Quality Audit & Risk Management",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
    activities: [
      "1. Verify Job Card Completeness: All customer complaints addressed with diagnostic findings.",
      "2. Verify Parts Issued vs Used: 100% check that every store issue slip appears on billing lines.",
      "3. Check Labour Time & Rate Accuracy: Match standard flat-rate hours against technician clocking.",
      "4. Verify Discounts, Taxes & Rounding: Ensure discount codes comply with delegation of authority.",
      "5. Warranty Authorization Check: Confirm causal parts and pre-approvals meet OEM guidelines.",
      "6. Customer Approval for Additional Work: Confirm written consent exists for every extra charge.",
      "7. Exception Logging & Hold Options: Automated hold placed on invoice if discrepancy detected."
    ],
    dmsMapping: "Labour Operation Register, Technician Idle Time, Stock Register (Month-End), Warranty JC Register, Estimate Register",
    auditChecks: [
      "The single most powerful operational control gate in the entire dealership workflow.",
      "Catches 85% of revenue leakage before invoices are permanently locked in DMS.",
      "Prevents post-invoicing credit notes, customer disputes, and warranty debit notes.",
      "Enforces multi-departmental accountability before customer vehicle leaves."
    ],
    verificationRule: "Automated pre-invoice exception rule engine runs 100% algorithmic validation.",
    redFlag: "Job Cards closed directly by advisors bypassing the billing supervisor pre-invoice review desk.",
    financialImpact: "Arrests ₹4,00,000 to ₹12,00,000 of monthly profit leakage across parts, labour, and discounts."
  },
  22: {
    num: "22",
    title: "Post Service Follow-Up (PSF & CSI)",
    phase: "Phase 4: Billing, Gate-Out & Follow-Up",
    department: "Customer Relationship Management (CRM) & OEM Liaison",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    activities: [
      "Conducting mandatory 3-day post-service follow-up telephone call / WhatsApp inquiry.",
      "Checking for repeat complaint recurrence or unresolved vehicle symptoms.",
      "Recording detailed Customer Satisfaction Index (CSI) score (1 to 5 scale).",
      "Updating customer service reminder due lists for next scheduled periodic maintenance."
    ],
    dmsMapping: "CSI Feedback Register, Complaint Escalation Log, Service Reminder Due List",
    auditChecks: [
      "Fabricated PSF call entries submitted by CRM telecallers without making calls.",
      "Dissatisfied customer feedback suppressed or deleted to prevent GM escalation.",
      "Repeat complaint reports not shared with Quality Controller for root cause analysis.",
      "Customer contact numbers altered in DMS to block third-party OEM survey calls."
    ],
    verificationRule: "Triangulate CRM call recordings and telecom call logs against logged CSI satisfaction ratings.",
    redFlag: "Dealership reports 98% positive CSI internally while OEM third-party survey reports <80%.",
    financialImpact: "Loss of lucrative OEM quarterly quality bonuses (often ₹10–25 Lakhs per quarter)."
  }
};

// Control Checks Data
const CONTROL_CHECKS_DATA = {
  leakage: {
    title: "Revenue Leakage Control Checks",
    tag: "Financial Defense",
    checks: [
      "Labour operations performed by technicians but omitted from customer billing.",
      "Spare parts issued from warehouse bin but dropped from final tax invoice lines.",
      "Discounts granted at cash counter exceeding manager Delegation of Authority (DOA).",
      "Free-of-Cost (FOC) repairs approved verbally without Director / GM written code.",
      "Consumables and shop supplies (greases, rust cleaners, rags) given away unbilled.",
      "Split repair orders used to keep invoice discount totals below approval thresholds."
    ]
  },
  warranty: {
    title: "Warranty & OEM Compliance Checks",
    tag: "OEM Recovery",
    checks: [
      "Warranty eligibility verification: vehicle age, odometer limits, and maintenance history.",
      "Causal part code validation: ensuring failed part accurately matches OEM warranty schedule.",
      "Labour operation code compliance: preventing rejected claims from incorrect labour codes.",
      "Duplicate warranty claims lodged across separate branches for the same component.",
      "Quarantine room physical failed parts audit: verifying parts exist before OEM scrap inspection.",
      "Re-submission tracking for claims rejected due to minor paperwork or photo deficiencies."
    ]
  },
  inventory: {
    title: "Parts & Inventory Control Checks",
    tag: "Asset Protection",
    checks: [
      "Negative stock resolution: eliminating storekeeper overrides that mask physical stockouts.",
      "Duplicate / excess issue slips generated for the same repair order.",
      "High-value parts (ECUs, catalytic converters, headlights) physical bin count reconciliation.",
      "Non-moving and dead stock ageing (>90, >180, >365 days) return program liquidation.",
      "Bin location accuracy: preventing lost parts stored in incorrect warehouse racks.",
      "Returned parts credit check: ensuring unused parts returned to store are credited to Job Card."
    ]
  },
  labour: {
    title: "Labour Productivity & Bay Efficiency Checks",
    tag: "Operational Efficiency",
    checks: [
      "Billed labour hours vs Standard OEM flat-rate manual hours.",
      "Technician idle time and bay downtime root cause analysis.",
      "Job Card open duration exceeding standard turnaround time (TAT) SLA.",
      "Technician efficiency and productivity ratio calculation.",
      "Ghost technician clocking (clocking absent mechanics on active repair orders).",
      "Over-clocking fraud: technicians billing >12 hours in a standard 8-hour shift."
    ]
  },
  fraud: {
    title: "Fraud & Internal Pilferage Detection",
    tag: "Risk Governance",
    checks: [
      "Dummy job cards opened for internal staff vehicles to consume dealership parts.",
      "Fake labour operations billed on company demo or loaner fleet.",
      "Backdated job cards opened during month-end closing hours to meet intake quotas.",
      "Unauthorized credit notes and invoice cancellations after vehicle has exited premises.",
      "Old battery scrap and copper scrap cash proceeds diverted from dealership bank accounts.",
      "Cashier cash float diversion (holding cash collections for days before banking)."
    ]
  },
  customer: {
    title: "Customer Protection & Safety Checks",
    tag: "Brand Protection",
    checks: [
      "Verifying written / digital customer estimate approvals exist for every billed rupee.",
      "Mandatory 360° vehicle photography protecting against pre-existing dent claims.",
      "Quality road test logging on designated test routes with Trade Certificate (TC) plates.",
      "Customer waiting time compliance at service reception canopy (<15 mins).",
      "Complete inventory checklist of customer toolkit, spare tyre, and boot accessories.",
      "Zero tolerance for dirty interiors, grease marks on steering wheels, or wet floor mats."
    ]
  },
  compliance: {
    title: "Statutory & Regulatory Compliance Checks",
    tag: "Legal Assurance",
    checks: [
      "GST classification, sequential invoice numbering, and HSN/SAC code compliance.",
      "TDS deduction on sublet repairs and third-party towing vendor contracts.",
      "AMC deferred revenue recognition and accounting ledger reconciliation.",
      "Environmental compliance: hazardous waste oil disposal logs and PCB certificates.",
      "Workshop hydraulic lifts and torque wrench calibration certification validity.",
      "Fire safety equipment inspection and workshop insurance policy coverage compliance."
    ]
  }
};

// Initialize interactive modal engine
document.addEventListener('DOMContentLoaded', () => {
  createModalMarkup();
  attachStageClickListeners();
  attachControlCheckClickListeners();
  attachTowerKpiClickListeners();
  initPhaseTabs();
});

function createModalMarkup() {
  if (document.getElementById('workflowModalOverlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'workflowModalOverlay';
  overlay.className = 'workflow-modal-overlay';
  overlay.innerHTML = `
    <div class="workflow-modal-container" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div class="workflow-modal-header">
        <div class="workflow-modal-title-wrap">
          <span id="modalStageBadge" class="modal-stage-badge">STAGE 01</span>
          <div>
            <h3 id="modalTitle" class="modal-title">Stage Title</h3>
            <span id="modalDepartment" class="modal-department">Department</span>
          </div>
        </div>
        <button id="modalCloseBtn" class="workflow-modal-close" aria-label="Close modal">&times;</button>
      </div>

      <div class="workflow-modal-body" id="modalBody">
        <!-- Injected via JavaScript -->
      </div>

      <div class="workflow-modal-footer">
        <button id="modalActionBtn" class="btn btn-primary btn-sm">Close Protocol</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Close handlers
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
  document.getElementById('modalActionBtn').addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
  });
}

function openStageModal(stageId) {
  const data = WORKFLOW_DATA[stageId];
  if (!data) return;

  const overlay = document.getElementById('workflowModalOverlay');
  document.getElementById('modalStageBadge').textContent = `STAGE ${data.num}`;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalDepartment').textContent = `${data.phase} • ${data.department}`;

  const body = document.getElementById('modalBody');
  body.innerHTML = `
    <!-- Activities -->
    <div class="modal-section-block">
      <div class="modal-section-heading">
        <span class="modal-icon-badge">1</span>
        <h4>Ground Operating Activities (Floor Level)</h4>
      </div>
      <ul class="modal-bullet-list">
        ${data.activities.map(a => '<li>' + a + '</li>').join('')}
      </ul>
    </div>

    <!-- DMS Mapping -->
    <div class="modal-section-block" style="background:#F0FDF4; border:1px solid #BBF7D0;">
      <div class="modal-section-heading">
        <span class="modal-icon-badge" style="background:#16A34A; color:#FFFFFF;">2</span>
        <h4 style="color:#166534;">Corresponding DMS Report & Register Mapping</h4>
      </div>
      <p style="font-size:0.9rem; font-weight:700; color:#15803D; margin-bottom:0.25rem;">
        ${data.dmsMapping}
      </p>
      <span style="font-size:0.8rem; color:#4B5563;">Data Fields: Timestamps, Part Numbers, Serial Numbers, Authorized Personnel IDs, and Transaction Keys.</span>
    </div>

    <!-- Audit Scrutiny -->
    <div class="modal-section-block" style="background:#FFF1F2; border:1px solid #FECDD3;">
      <div class="modal-section-heading">
        <span class="modal-icon-badge" style="background:#E11D48; color:#FFFFFF;">3</span>
        <h4 style="color:#9F1239;">Auditor's Forensic Scrutiny & Vulnerabilities</h4>
      </div>
      <ul class="modal-bullet-list" style="color:#881337;">
        ${data.auditChecks.map(c => '<li>' + c + '</li>').join('')}
      </ul>
    </div>

    <!-- Verification Rule & Red Flags -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1rem; margin-top:1rem;">
      <div style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:8px; padding:1rem;">
        <strong style="color:#1E40AF; font-size:0.85rem; display:block; margin-bottom:0.3rem;">Verification Rule / Test:</strong>
        <p style="font-size:0.825rem; color:#1E3A8A; margin-bottom:0; line-height:1.5;">${data.verificationRule}</p>
      </div>
      <div style="background:#FFFBEB; border:1px solid #FDE68A; border-radius:8px; padding:1rem;">
        <strong style="color:#92400E; font-size:0.85rem; display:block; margin-bottom:0.3rem;">🚨 Anomaly Red Flag:</strong>
        <p style="font-size:0.825rem; color:#78350F; margin-bottom:0; line-height:1.5;">${data.redFlag}</p>
      </div>
    </div>

    <!-- Financial Impact -->
    <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:0.85rem 1rem; margin-top:1rem;">
      <span style="font-size:0.8rem; color:#475569;"><strong>Financial Exposure:</strong> ${data.financialImpact}</span>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function openControlCheckModal(categoryKey) {
  const data = CONTROL_CHECKS_DATA[categoryKey];
  if (!data) return;

  const overlay = document.getElementById('workflowModalOverlay');
  document.getElementById('modalStageBadge').textContent = data.tag;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalDepartment').textContent = "Auditor's Eyes • Forensic Control Scrutiny";

  const body = document.getElementById('modalBody');
  body.innerHTML = `
    <div class="modal-section-block">
      <div class="modal-section-heading">
        <span class="modal-icon-badge">✓</span>
        <h4>Standard Forensic Checkpoints</h4>
      </div>
      <ul class="modal-bullet-list">
        ${data.checks.map(c => '<li>' + c + '</li>').join('')}
      </ul>
    </div>
    <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:1rem; margin-top:1rem;">
      <p style="font-size:0.85rem; color:#475569; margin-bottom:0;">
        <strong>Audit Deliverable:</strong> Every verified non-compliance is recorded in the Dealership Exception Register with source Job Card ID, monetary leakage value, root cause analysis, and assigned CAPA implementation owner.
      </p>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('workflowModalOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function attachStageClickListeners() {
  document.querySelectorAll('[data-workflow-stage]').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const stageId = card.getAttribute('data-workflow-stage');
      openStageModal(stageId);
    });
  });
}

function attachControlCheckClickListeners() {
  document.querySelectorAll('[data-control-category]').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const cat = card.getAttribute('data-control-category');
      openControlCheckModal(cat);
    });
  });
}


const TOWER_KPI_DATA = {
  wip: {
    metric: "Vehicles in Workshop (WIP)",
    value: "45 Vehicles",
    benchmark: "Optimal Bay Load: 40–50 Vehicles",
    department: "Workshop Floor Control & Capacity Planning",
    definition: "Total inventory of vehicles physically located within the dealership workshop perimeter undergoing inspection, awaiting parts, active repair, or final delivery.",
    auditFocus: [
      "Identify aging job cards (>48 hours in shop) lacking active technician clock-ins.",
      "Reconcile security gate physical count against open DMS Job Cards to catch ghost or unlogged vehicles.",
      "Check vehicle damage, scratch, and parts pilferage risks during prolonged workshop stay."
    ]
  },
  "wait-advisor": {
    metric: "Waiting for Service Advisor",
    value: "06 Vehicles",
    benchmark: "SLA: < 15 Minutes from Security Gate In",
    department: "Customer Reception & Advisory Desk",
    definition: "Vehicles entered through the security gate awaiting Service Advisor walkaround, customer symptom recording, and formal Job Card opening in DMS.",
    auditFocus: [
      "Audit gate-in timestamp vs DMS Job Card creation timestamp.",
      "Detect customer abandonment risk and advisor allocation bottleneck during morning peak rush.",
      "Ensure reception token number discipline and eliminate unauthorized advisor bypass."
    ]
  },
  "wait-parts": {
    metric: "Waiting for Spare Parts (Backorder)",
    value: "07 Vehicles",
    benchmark: "Target: Zero Critical PMS Part Stoppages",
    department: "Spare Parts Store & OEM Supply Chain",
    definition: "Vehicles where work is halted due to non-availability of fast-moving spare parts, accident repair sheet metals, or back-ordered OEM aggregates.",
    auditFocus: [
      "Inspect DMS Lost Sales Register and parts requisition age vs OEM delivery SLA.",
      "Check for cannibalization (transferring parts from one customer car to another).",
      "Verify emergency / VOR (Vehicle Off Road) parts ordering compliance and freight fee audit."
    ]
  },
  repair: {
    metric: "Under Active Repair",
    value: "18 Vehicles",
    benchmark: "Bay Load Factor: 70–85% Capacity",
    department: "Workshop Floor Technicians",
    definition: "Vehicles actively stationed on two-post lifts, PMS bays, diagnostic stalls, or alignment rigs with active technician clock-time punched.",
    auditFocus: [
      "Compare actual technician clock time against OEM standard flat-rate labour hours.",
      "Audit floor safety, mandatory PPE, torque wrench calibrations, and diagnostic DTC scans.",
      "Verify parts requisitioned from store match the exact components being installed on the bay."
    ]
  },
  "wait-qc": {
    metric: "Waiting for Quality Control (QC)",
    value: "04 Vehicles",
    benchmark: "SLA: < 20 Minutes post-repair completion",
    department: "Quality Assurance & Road Test Inspector",
    definition: "Repairs reported complete by floor technicians; vehicles queued for 40-point quality checksheet validation and mandatory road testing.",
    auditFocus: [
      "Verify that quality inspection is performed by certified independent QC supervisor, not the repairing technician.",
      "Audit road test log sheet, fuel consumption, odometer start/end readings, and scan tool pass printouts.",
      "Ensure zero vehicles proceed to washing without documented QC sign-off."
    ]
  },
  "ready-delivery": {
    metric: "Ready for Delivery",
    value: "05 Vehicles",
    benchmark: "Zero Unbilled Gate-Out Risk",
    department: "Delivery Desk & Washing Bay",
    definition: "Vehicles washed, detailed, and inspected awaiting customer arrival, invoice settlement, and physical gate-out clearance.",
    auditFocus: [
      "Verify pre-invoicing review is 100% complete with all parts and labour reconciled.",
      "Check old replaced parts returned to customer boot in OEM clean packaging.",
      "Ensure customer notification (WhatsApp/SMS bill link) was delivered accurately with estimate matching."
    ]
  },
  delivered: {
    metric: "Delivered Today",
    value: "28 Vehicles",
    benchmark: "Daily Budget Target: 25–30 Deliveries",
    department: "Customer Delivery & Cashier Counter",
    definition: "Total vehicles successfully handed over to customers with settled tax invoices and verified security gate passes.",
    auditFocus: [
      "Reconcile daily tax invoice register against gate-out register (100% serial match).",
      "Audit cashier settlement: Cash, UPI QR credit, POS card slips, and corporate credit aging.",
      "Verify customer signature on delivery gate pass and work explanation acknowledgement."
    ]
  },
  tat: {
    metric: "Average Turnaround Time (TAT)",
    value: "8.2 Hours",
    benchmark: "PMS Target: < 4.5 Hours | Major Repairs: < 12 Hours",
    department: "Workshop Management & Process Engineering",
    definition: "Average elapsed time from security gate inward timestamp to final customer gate-out clearance.",
    auditFocus: [
      "Deconstruct TAT into stage bottlenecks: Reception wait, Parts wait, Bay time, Washing delay, Billing delay.",
      "Audit promised delivery time adherence (SLA > 90% on-time delivery).",
      "Correlate excessive TAT with customer dissatisfaction complaints in PSF."
    ]
  },
  "bay-util": {
    metric: "Workshop Bay Utilization",
    value: "72%",
    benchmark: "Industry Standard Benchmark: 75%–85%",
    department: "Workshop Controller & General Management",
    definition: "Ratio of total productive technician repair hours booked on workshop bays divided by total available bay operating hours.",
    auditFocus: [
      "Audit idle bay hours caused by delayed parts issues or delayed customer supplementary approvals.",
      "Verify bay allocation balance between quick-service (Express PMS) and heavy mechanical jobs.",
      "Prevent technician over-clocking on single job cards."
    ]
  },
  csi: {
    metric: "Customer Satisfaction Index (CSI / PSF)",
    value: "4.6 / 5.0 (92%)",
    benchmark: "OEM Standard Benchmark: >= 4.5 / 5.0",
    department: "Customer Relations Management (CRM)",
    definition: "Aggregated customer satisfaction rating gathered through post-service telephonic follow-ups conducted at T+3 and T+7 days.",
    auditFocus: [
      "Audit PSF calling records for call authenticity (zero fake 5-star logging by internal staff).",
      "Inspect customer dissatisfaction escalations and resolution TAT (<24 hours).",
      "Cross-check repeat repair complaints (rework within 30 days) against CSI dips."
    ]
  }
};

function openTowerKpiModal(kpiKey) {
  const data = TOWER_KPI_DATA[kpiKey];
  if (!data) return;

  const overlay = document.getElementById('workflowModalOverlay');
  document.getElementById('modalStageBadge').textContent = "CONTROL TOWER KPI";
  document.getElementById('modalTitle').textContent = data.metric;
  document.getElementById('modalDepartment').textContent = data.department + " • Current: " + data.value;

  const body = document.getElementById('modalBody');
  body.innerHTML = `
    <div class="modal-section-block" style="background:#EFF6FF; border:1px solid #BFDBFE;">
      <div class="modal-section-heading">
        <span class="modal-icon-badge" style="background:#2563EB; color:#FFFFFF;">ℹ</span>
        <h4 style="color:#1E40AF;">Metric Definition & Benchmark Target</h4>
      </div>
      <p style="font-size:0.875rem; color:#1E3A8A; margin-bottom:0.4rem; line-height:1.5;">${data.definition}</p>
      <div style="font-size:0.8rem; font-weight:700; color:#1D4ED8;">
        Target Benchmark: <span style="background:#DBEAFE; padding:2px 8px; border-radius:4px;">${data.benchmark}</span>
      </div>
    </div>

    <div class="modal-section-block" style="background:#FFFDF7; border:1px solid #FDE68A;">
      <div class="modal-section-heading">
        <span class="modal-icon-badge" style="background:#D97706; color:#FFFFFF;">🔍</span>
        <h4 style="color:#92400E;">Auditor's Surveillance & Floor Verification Focus</h4>
      </div>
      <ul class="modal-bullet-list" style="color:#78350F;">
        ${data.auditFocus.map(f => '<li>' + f + '</li>').join('')}
      </ul>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function attachTowerKpiClickListeners() {
  document.querySelectorAll('[data-tower-kpi]').forEach(tile => {
    tile.addEventListener('click', () => {
      const kpi = tile.getAttribute('data-tower-kpi');
      openTowerKpiModal(kpi);
    });
  });
}


// ==========================================
// Phase-Wise Protocol Tab Filtering & Scroll
// ==========================================
function initPhaseTabs() {
  const tabs = document.querySelectorAll('.phase-tab-btn');
  const phaseCards = document.querySelectorAll('[data-phase-block]');
  if (!tabs.length || !phaseCards.length) return;

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-phase-target');

      // Update active tab button
      tabs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');

      if (target === 'all') {
        phaseCards.forEach(card => {
          card.style.display = 'block';
        });
      } else {
        phaseCards.forEach(card => {
          if (card.getAttribute('data-phase-block') === target) {
            card.style.display = 'block';
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else {
            card.style.display = 'none';
          }
        });
      }
    });
  });
}
