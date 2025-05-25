import { companies } from "../../lib/contactInfo";

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-35 sm:px-6 lg:px-8 lg:py-34">
      <h1 className="text-3xl font-bold text-center mb-8">
        Contact Information
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        {companies.map((company, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-2">{company.name}</h2>
            <p className="text-sm text-gray-600 mb-1">
              Business ID: {company.businessId}
            </p>
            <div className="text-sm mb-2">
              <p className="font-semibold">Contact:</p>
              <p>{company.contact.name}</p>
              <p>{company.contact.address}</p>
              {company.contact.postal && (
                <p>Postal: {company.contact.postal}</p>
              )}
              <p>📞 {company.contact.phone}</p>
              <p>✉️ {company.contact.email}</p>
            </div>
            <div className="text-sm mb-2">
              <p className="font-semibold">E-invoicing:</p>
              <p>📄 {company.eInvoicing.address}</p>
              <p>🔁 {company.eInvoicing.intermediary}</p>
            </div>
            <div className="text-sm">
              <p className="font-semibold">Billing:</p>
              <p>📧 {company.billing.email}</p>
              <p>📬 {company.billing.postal}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
