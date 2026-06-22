// Legal Copy Configuration for Client Cascade
// Editing this file will update the Privacy Policy and Terms of Service pages instantly.

const LEGAL_CONTENT = {
    privacyPolicy: {
        title: "Privacy Policy",
        lastUpdated: "June 22, 2026",
        introduction: "At Client Cascade, we respect your privacy and are committed to protecting the personal data of our users (contractors, business owners, and operators) as well as the clients they serve. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you use our SaaS CRM, dispatching, invoicing, marketing, payroll, and lead generation tools.",
        sections: [
            {
                id: "info-collection",
                title: "1. Information We Collect",
                paragraphs: [
                    "We collect information that you provide directly to us when creating an account, configuring your company profile, or communicating with us. This includes contact details (such as your name, business name, email, physical address, and phone number) and financial information required to process subscription payments.",
                    "To provide our CRM and dispatching platform, we also process 'Customer Data' uploaded or captured on behalf of your business, including:"
                ],
                list: [
                    "Contact details of your clients and leads (names, addresses, phone numbers, emails).",
                    "Project details, scheduling notes, dispatch logs, and service history.",
                    "Invoices, estimates, transaction details, and payment statuses.",
                    "Outbound and inbound communications facilitated through the platform (emails, text messages, call logs, and call recordings)."
                ]
            },
            {
                id: "sms-compliance",
                title: "2. SMS Messaging & Carrier Compliance",
                paragraphs: [
                    "Our platform integrates SMS capabilities to allow you to communicate with your customers, send scheduling reminders, and run automated follow-ups. We take mobile subscriber privacy extremely seriously.",
                    "Mobile Information Sharing & Consent Opt-In Exclusion:",
                    "Specifically, mobile phone numbers and opt-in consent data collected for the purpose of receiving SMS notifications and marketing messages will not be shared with, sold, or rented to third parties, partners, or affiliates for marketing or promotional purposes under any circumstances.",
                    "All SMS consent data is strictly isolated and used solely for the technical delivery of messages initiated by you to your customers, or by Client Cascade to you regarding your account."
                ]
            },
            {
                id: "how-we-use-info",
                title: "3. How We Use Your Information",
                paragraphs: [
                    "We use the collected information to operate, maintain, and improve the Client Cascade platform, including:"
                ],
                list: [
                    "Managing your account, billing, and subscription access.",
                    "Processing transactions and facilitating payouts via integrated payment processors (e.g., Stripe).",
                    "Routing emails, SMS messages, and phone calls between you and your customers.",
                    "Generating leads via LeadSpotter™ and optimizing your localized marketing campaigns.",
                    "Providing customer support, debugging technical issues, and preventing fraudulent activity."
                ]
            },
            {
                id: "data-sharing",
                title: "4. How We Share Your Information",
                paragraphs: [
                    "We do not sell, rent, or trade your personal data. We only share information with third-party vendors and service providers who assist us in operating our platform, under strict contractual privacy obligations:",
                    "Hosting and Infrastructure: Secure cloud service providers (such as AWS and Google Cloud) where account data is encrypted and stored.",
                    "Communications Gateways: SMS and email delivery partners (such as Twilio and Mailgun) responsible for processing text messages, voice routing, and emails.",
                    "Payment Gateways: Certified payment gateways (such as Stripe) that securely handle credit cards and banking information. We do not store raw card numbers on our servers.",
                    "We may also disclose information if required by law, subpoena, or to protect the safety, rights, and property of Client Cascade and our users."
                ]
            },
            {
                id: "call-recording",
                title: "5. Call Recording & Consent",
                paragraphs: [
                    "Client Cascade provides features that allow users to record phone calls for quality assurance, training, and record-keeping purposes.",
                    "By using these call-recording features, you acknowledge and agree that you are solely responsible for complying with all applicable state, local, and federal call-recording laws (including single-party or two-party consent regulations). Client Cascade acts solely as a technical provider and accepts no liability for your failure to obtain required consent from callers."
                ]
            },
            {
                id: "security",
                title: "6. Data Security",
                paragraphs: [
                    "We implement industry-standard security measures, including SSL/TLS encryption for data in transit and AES-256 encryption for data at rest. While we take commercial-grade measures to secure your data, no method of transmission or electronic storage is 100% secure, and we cannot guarantee absolute security."
                ]
            },
            {
                id: "your-rights",
                title: "7. Your Choices and Rights",
                paragraphs: [
                    "Account Information: You can update, correct, or delete your account information at any time by logging into your Client Cascade dashboard.",
                    "SMS Communications: You or your customers can opt out of SMS communications at any time by replying 'STOP' to any text message received. To request assistance, reply 'HELP'.",
                    "Email Opt-Out: You can unsubscribe from marketing emails by clicking the 'unsubscribe' link at the bottom of our emails."
                ]
            },
            {
                id: "changes",
                title: "8. Changes to this Policy",
                paragraphs: [
                    "We reserve the right to update this Privacy Policy at any time and without prior notice. Any changes will be posted on this page with an updated 'Last Updated' date. Your continued use of the platform after updates are made constitutes acceptance of the revised policy."
                ]
            },
            {
                id: "contact-us",
                title: "9. Contact Us",
                paragraphs: [
                    "If you have any questions or concerns about this Privacy Policy, please contact our support team at support@clientcascade.com."
                ]
            }
        ]
    },
    termsOfService: {
        title: "Terms of Service",
        lastUpdated: "June 22, 2026",
        introduction: "Welcome to Client Cascade. These Terms of Service ('Terms') govern your access to and use of the Client Cascade website, software application, and services ('Platform') provided by Client Cascade. By creating an account or using the Platform, you agree to be bound by these Terms. If you are entering into these Terms on behalf of a company or other legal entity (such as a contracting business), you represent that you have the authority to bind such entity.",
        sections: [
            {
                id: "use-license",
                title: "1. Software License and Permitted Use",
                paragraphs: [
                    "Client Cascade grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Platform solely for your internal business operations.",
                    "You agree not to modify, reverse engineer, decompile, or attempt to extract the source code of the Platform. You shall not lease, sell, resell, or distribute the Platform or use it to build a competing product."
                ]
            },
            {
                id: "account-security",
                title: "2. Account Registration and Security",
                paragraphs: [
                    "To access the Platform, you must register for an account. You agree to provide accurate, complete, and current information. You are solely responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.",
                    "You must notify Client Cascade immediately of any unauthorized use or security breach of your account."
                ]
            },
            {
                id: "sms-compliance-terms",
                title: "3. Text Messaging, Outbound Calls, & TCPA Compliance",
                paragraphs: [
                    "The Platform provides tools that enable you to send text messages (SMS) and place phone calls to your clients. You agree that you are the sole sender of all communications initiated through your account.",
                    "TCPA & SMS Regulations:",
                    "You represent and warrant that you have obtained prior express written consent from each recipient before sending any automated text messages or marketing communications.",
                    "You must include clear, standard opt-out language in all outbound SMS messages (e.g., 'Reply STOP to cancel'). You must immediately honor all opt-out requests.",
                    "You agree to comply with the Telephone Consumer Protection Act (TCPA), the CAN-SPAM Act, and all CTIA guidelines. You are responsible for any carrier fees, compliance registration fees (such as A2P 10DLC brand and campaign registration), and any penalties or fines resulting from non-compliant messaging.",
                    "Client Cascade reserves the right to suspend your messaging access immediately if we detect spam, high bounce rates, or carrier compliance violations."
                ]
            },
            {
                id: "payments-billing",
                title: "4. Subscription Fees, Invoicing, & Payments",
                paragraphs: [
                    "Pricing and Billing: Access to Client Cascade is billed on a subscription basis (monthly or annually) in advance. Fees are non-refundable once processed.",
                    "Changes in Fees: We reserve the right to modify subscription pricing at any time. We will provide you with reasonable prior notice before any price adjustments take effect.",
                    "Customer Payments & Stripe: If you use our integrated invoicing tools to collect payments from your clients, those transactions are processed through Stripe. By using these tools, you agree to Stripe's Terms of Service. Client Cascade is not responsible for transaction disputes, chargebacks, or refunds between you and your customers."
                ]
            },
            {
                id: "customer-data-terms",
                title: "5. Customer Data & Proprietary Rights",
                paragraphs: [
                    "Your Data: You own all rights, title, and interest in and to the data you upload or collect through the CRM (such as contact records, client lists, schedules, and job history). You grant Client Cascade a worldwide, royalty-free, non-exclusive license to host, transmit, and process your data solely to provide the services under these Terms.",
                    "Platform Rights: Client Cascade owns all rights, title, and interest in and to the software, branding, code, systems, and databases. Except for the limited license granted herein, no ownership rights are transferred to you."
                ]
            },
            {
                id: "liability-disclaimer",
                title: "6. Disclaimer of Warranties",
                paragraphs: [
                    "The Client Cascade Platform is provided on an 'as-is' and 'as-available' basis. To the maximum extent permitted by law, we disclaim all warranties of any kind, whether express, implied, or statutory, including warranties of merchantability, fitness for a particular purpose, and non-infringement.",
                    "We do not warrant that the Platform will be uninterrupted, error-free, secure, or that it will generate a specific volume of leads, sales, or revenue for your business."
                ]
            },
            {
                id: "limitation-of-liability",
                title: "7. Limitation of Liability",
                paragraphs: [
                    "To the maximum extent permitted by law, Client Cascade, its officers, employees, and partners will not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, loss of data, loss of business goodwill, or service interruption, arising out of or in connection with these Terms or your use of the Platform.",
                    "Our total liability for any claim arising out of these Terms shall not exceed the total amount paid by you to Client Cascade in the three (3) months preceding the event giving rise to the claim."
                ]
            },
            {
                id: "indemnification-terms",
                title: "8. Indemnification",
                paragraphs: [
                    "You agree to defend, indemnify, and hold harmless Client Cascade and its affiliates from and against any claims, liabilities, damages, losses, and expenses (including legal fees) arising out of or in any way connected with your violation of these Terms, your misuse of the Platform, your violation of any laws (including TCPA or payroll regulations), or disputes between you and your customers."
                ]
            },
            {
                id: "termination",
                title: "9. Subscription Termination & Account Closure",
                paragraphs: [
                    "You may cancel your subscription at any time through your account settings or by contacting support. Upon cancellation, you will retain access until the end of your billing cycle. No partial refunds are provided.",
                    "We reserve the right to suspend or terminate your account immediately if you breach these Terms, engage in fraudulent activity, or fail to pay fees when due."
                ]
            },
            {
                id: "governing-law-terms",
                title: "10. Governing Law & Jurisdiction",
                paragraphs: [
                    "These Terms and any disputes arising out of them shall be governed by the laws of the State of Delaware, without regard to conflicts of law principles. You agree to submit to the exclusive jurisdiction of the state and federal courts located in Delaware to resolve any legal matter arising from these Terms."
                ]
            },
            {
                id: "terms-changes",
                title: "11. Modifications to Terms",
                paragraphs: [
                    "We reserve the right to update or modify these Terms at any time without notice. We will indicate the date of the latest update at the top of this document. Your continued use of Client Cascade after such changes constitutes your acceptance of the updated Terms."
                ]
            }
        ]
    }
};
