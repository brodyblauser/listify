import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Listify Privacy Policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-brown-400 mb-3">Legal</p>
          <h1 className="text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-navy-400 text-sm">Effective Date: June 4, 2026 · Last Updated: June 4, 2026</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-navy-300 leading-relaxed">

          <section>
            <p>
              Listify (&quot;Listify,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
              use our website and Service. Please read this policy carefully. By using the Service, you consent
              to the practices described in this policy.
            </p>
          </section>

          <Section title="1. Information We Collect">
            <p><strong className="text-white">A. Information You Provide Directly</strong></p>
            <ul>
              <li><strong className="text-white">Account Information:</strong> When you create an account, we collect your name, email address, and password (stored in hashed form — we never store your plain-text password).</li>
              <li><strong className="text-white">Property Data:</strong> When you generate listing descriptions, we collect the property details you enter, including address, bedrooms, bathrooms, square footage, price, property type, highlights, neighborhood, and tone preference.</li>
              <li><strong className="text-white">Agent Voice/Style:</strong> If you use our writing style feature, we store the listing examples you provide to personalize your generations.</li>
              <li><strong className="text-white">Generated Listings:</strong> We store the AI-generated listing descriptions associated with your account so you can access your history.</li>
              <li><strong className="text-white">Communications:</strong> If you contact us for support, we retain those communications.</li>
            </ul>

            <p className="mt-4"><strong className="text-white">B. Information Collected Automatically</strong></p>
            <ul>
              <li><strong className="text-white">Usage Data:</strong> We collect information about how you use the Service, including pages visited, features used, generation count, and timestamps.</li>
              <li><strong className="text-white">Device and Log Data:</strong> We collect your IP address, browser type, operating system, referring URLs, and other standard log data when you access the Service.</li>
              <li><strong className="text-white">Cookies and Similar Technologies:</strong> We use session cookies necessary for authentication and service functionality. We do not currently use advertising or third-party tracking cookies. You can disable cookies in your browser settings, but doing so may prevent you from using certain features of the Service.</li>
            </ul>

            <p className="mt-4"><strong className="text-white">C. Information from Third Parties</strong></p>
            <ul>
              <li><strong className="text-white">Payment Information:</strong> When you subscribe to a paid plan, Stripe processes your payment information directly. Listify receives only limited payment confirmation data (e.g., subscription status, last 4 digits of card) and does not have access to your full payment card details.</li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul>
              <li>Create and manage your account and authenticate your identity</li>
              <li>Provide, operate, and improve the Service</li>
              <li>Generate AI listing descriptions based on your inputs</li>
              <li>Store and display your listing history</li>
              <li>Personalize generations using your saved writing style</li>
              <li>Process payments and manage your subscription</li>
              <li>Send transactional emails (account creation, password reset, subscription confirmations)</li>
              <li>Respond to your support requests and communications</li>
              <li>Monitor for and prevent fraud, abuse, and violations of our Terms of Service</li>
              <li>Analyze aggregate usage patterns to improve the Service (using anonymized or aggregated data)</li>
              <li>Comply with applicable legal obligations</li>
            </ul>
            <p>
              We do not sell your personal information. We do not use your property data or generated listings
              to train AI models without your explicit consent.
            </p>
          </Section>

          <Section title="3. How We Share Your Information">
            <p>We do not sell or rent your personal information. We may share your information only in the following circumstances:</p>
            <ul>
              <li>
                <strong className="text-white">Service Providers:</strong> We share information with trusted third-party service providers who assist us in operating the Service, including:
                <ul className="mt-2 ml-4 space-y-1">
                  <li><strong className="text-white">Anthropic, Inc.</strong> — AI text generation. Your property inputs are transmitted to Anthropic&apos;s API to generate listing descriptions. Anthropic&apos;s use of this data is governed by their API usage policies.</li>
                  <li><strong className="text-white">Stripe, Inc.</strong> — Payment processing. Stripe handles all payment card data under PCI-DSS compliance.</li>
                  <li><strong className="text-white">Vercel, Inc.</strong> — Website hosting and infrastructure.</li>
                  <li><strong className="text-white">Turso / ChiselStrike</strong> — Database hosting for your account and listing data.</li>
                  <li><strong className="text-white">Resend</strong> — Transactional email delivery.</li>
                </ul>
              </li>
              <li><strong className="text-white">Legal Requirements:</strong> We may disclose your information if required to do so by law, court order, or governmental authority, or if we believe disclosure is necessary to protect our rights, prevent fraud, or protect the safety of any person.</li>
              <li><strong className="text-white">Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or substantially all of our assets, your information may be transferred as part of that transaction. We will notify you via email or a prominent notice on our website before your information becomes subject to a different privacy policy.</li>
              <li><strong className="text-white">With Your Consent:</strong> We may share your information for any other purpose with your prior consent.</li>
            </ul>
          </Section>

          <Section title="4. Data Retention">
            <p>
              We retain your personal information for as long as your account is active or as needed to provide the Service.
              Specifically:
            </p>
            <ul>
              <li>Account information is retained until you delete your account.</li>
              <li>Generated listings and property data are retained until you delete them or delete your account.</li>
              <li>Payment records are retained as required by law and by Stripe for billing and tax purposes.</li>
              <li>Log data is typically retained for up to 90 days for security and debugging purposes.</li>
            </ul>
            <p>
              You may request deletion of your account and associated data at any time by contacting us at the address below.
              Note that some information may be retained in backup systems for a limited period after deletion.
            </p>
          </Section>

          <Section title="5. Data Security">
            <p>
              We implement reasonable technical and organizational measures to protect your personal information against
              unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul>
              <li>Passwords are hashed using bcrypt before storage — we never store or transmit plain-text passwords</li>
              <li>All data is transmitted over encrypted HTTPS connections</li>
              <li>Database access is restricted and protected by authentication tokens</li>
              <li>Payment card data is handled exclusively by Stripe and never passes through our servers</li>
            </ul>
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure.
              We cannot guarantee absolute security. In the event of a data breach that affects your personal
              information, we will notify you as required by applicable law.
            </p>
          </Section>

          <Section title="6. Your Rights and Choices">
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul>
              <li><strong className="text-white">Access:</strong> You may request a copy of the personal information we hold about you.</li>
              <li><strong className="text-white">Correction:</strong> You may update or correct your account information at any time through your Account Settings.</li>
              <li><strong className="text-white">Deletion:</strong> You may request deletion of your account and personal data by contacting us. We will process deletion requests within 30 days, subject to legal retention requirements.</li>
              <li><strong className="text-white">Portability:</strong> You may export your saved listings at any time using the CSV export feature in your My Listings page.</li>
              <li><strong className="text-white">Opt-Out of Marketing:</strong> We do not currently send marketing emails. If we do so in the future, you will have the ability to unsubscribe from any such communications.</li>
              <li><strong className="text-white">Cookie Preferences:</strong> You can disable non-essential cookies through your browser settings.</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at the address in Section 11.
              We will respond to verified requests within 30 days.
            </p>
          </Section>

          <Section title="7. California Privacy Rights (CCPA)">
            <p>
              If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
            </p>
            <ul>
              <li>The right to know what personal information we collect, use, disclose, and sell</li>
              <li>The right to delete personal information we have collected from you</li>
              <li>The right to opt out of the sale of personal information — <strong className="text-white">we do not sell personal information</strong></li>
              <li>The right to non-discrimination for exercising your CCPA rights</li>
            </ul>
            <p>
              To submit a CCPA request, contact us at the address below. We do not discriminate against users who
              exercise their CCPA rights.
            </p>
          </Section>

          <Section title="8. Nevada Privacy Rights">
            <p>
              Nevada residents may opt out of the sale of their personal information. We do not sell personal information,
              but if you have questions or concerns, contact us at the address in Section 11.
            </p>
          </Section>

          <Section title="9. Children's Privacy">
            <p>
              The Service is not directed to, and we do not knowingly collect personal information from, individuals
              under the age of 18. If we become aware that we have collected personal information from a minor under 18,
              we will take steps to delete such information promptly. If you believe we may have collected information
              from a minor, please contact us immediately.
            </p>
          </Section>

          <Section title="10. Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
              legal requirements, or other factors. If we make material changes, we will notify you by email
              (to the address associated with your account) or by displaying a prominent notice on the Service
              before the changes take effect. Your continued use of the Service after the effective date of the
              updated policy constitutes your acceptance of the changes.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
              please contact us at:
            </p>
            <div className="bg-navy-800 border border-navy-700 rounded-xl p-4 mt-3">
              <p className="text-white font-semibold">Listify</p>
              <p>Email: <a href="mailto:support@listify-silk.vercel.app" className="text-brown-400 hover:underline">support@listify-silk.vercel.app</a></p>
            </div>
            <p className="mt-3 text-sm text-navy-500">
              We will respond to all legitimate privacy requests within 30 days.
            </p>
          </Section>

          <div className="border-t border-navy-700 pt-6 mt-8">
            <p className="text-sm text-navy-500">
              By using Listify, you acknowledge that you have read and understood this Privacy Policy.
              See also our <Link href="/terms" className="text-brown-400 hover:underline">Terms of Service</Link>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-white mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
