import { useState } from "react";

const Body = () => {
  const [countryCode, setCountryCode] = useState("65");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [messageType, setMessageType] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [messages, setMessages] = useState({
    Promotion: "Hello! Check out our latest sale: 20% off all items! ",
    Support: "Hi there, how can we help you with your order today? ",
    Custom: "",
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (error) setError(null);
    setMessages((prev) => ({
      ...prev,
      [messageType]: e.target.value,
    }));
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and limit to 3 digits via logic (as fallback to maxLength)
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 3) {
      setCountryCode(val);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const currentMessage = messages[messageType as keyof typeof messages];

    if (!countryCode.trim()) {
      setError("Please enter a country code.");
      return;
    }
    if (!phoneNumber.trim()) {
      setError("Please enter a phone number.");
      return;
    }
    if (!currentMessage.trim()) {
      setError("The message body cannot be empty.");
      return;
    }

    const fullNumber = `${countryCode}${phoneNumber}`.replace(/\D/g, "");
    if (fullNumber.length < 7) {
      setError("Invalid phone number. Please check again.");
      return;
    }

    const encodedMessage = encodeURIComponent(currentMessage);
    const whatsappUrl = `https://wa.me/${fullNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Error:</strong> {error}
              <button type="button" className="btn-close" onClick={() => setError(null)}></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              {/* LEFT SIDE: Inputs */}
              <div className="col-12 col-md-6">

                <div className="row g-2 mb-3">
                  <div className="col-4 col-sm-3">
                    <label className="form-label fw-bold text-nowrap">Code</label>
                    <div className="input-group">
                      <span className="input-group-text px-2">+</span>
                      <input
                        type="text"
                        className="form-control px-2"
                        value={countryCode}
                        maxLength={3} // Prevents typing more than 3 chars
                        onChange={handleCountryCodeChange}
                      />
                    </div>
                  </div>
                  <div className="col-8 col-sm-9">
                    <label className="form-label fw-bold">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="e.g. 81234567"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4 mt-4">
                  <label className="form-label d-block fw-bold">Message Template</label>
                  {["Promotion", "Support", "Custom"].map((type) => (
                    <div key={type} className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="msgType"
                        id={type.toLowerCase()}
                        checked={messageType === type}
                        onChange={() => {
                          setMessageType(type);
                          setError(null);
                        }}
                      />
                      <label className="form-check-label" htmlFor={type.toLowerCase()}>
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE: Textarea and Submit */}
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="messageBox" className="form-label fw-bold">
                    Message Preview
                  </label>
                  <textarea
                    className="form-control"
                    id="messageBox"
                    rows={8}
                    value={messages[messageType as keyof typeof messages]}
                    onChange={handleTextChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-success w-100 py-2 fw-bold">
                  Continue on WhatsApp
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;