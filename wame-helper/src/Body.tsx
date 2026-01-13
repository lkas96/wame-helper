import { useState } from "react";

const Body = () => {
  const [countryCode, setCountryCode] = useState("65");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [messageType, setMessageType] = useState("");
  // State for error handling
  const [error, setError] = useState<string | null>(null);

  const [messages, setMessages] = useState({
    Promotion: "Hello! Check out our latest sale: 20% off all items! ",
    Support: "Hi there, how can we help you with your order today? ",
    Custom: "",
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Clear error when user starts typing
    if (error) setError(null);
    
    setMessages((prev) => ({
      ...prev,
      [messageType]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state on new attempt

    const currentMessage = messages[messageType as keyof typeof messages];

    // --- VALIDATION LOGIC ---
    if (!phoneNumber.trim()) {
      setError("Please enter a phone number.");
      return;
    }
    if (!currentMessage.trim()) {
      setError("The message body cannot be empty.");
      return;
    }

    const fullNumber = `${countryCode}${phoneNumber}`.replace(/\D/g, "");
    
    // Check if number is long enough after stripping non-digits
    if (fullNumber.length < 7) {
      setError("Invalid phone number. Please check again.");
      return;
    }

    const encodedMessage = encodeURIComponent(currentMessage);
    const whatsappUrl = `https://wa.me/${fullNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    // Reset form
    setCountryCode("65");
    setPhoneNumber("");
    setMessageType("Custom");
    setMessages({
      Promotion: "Hello! Check out our latest sale: 20% off all items!",
      Support: "Hi there, how can we help you with your order today?",
      Custom: "",
    });
  };

  return (
    <div className="container mt-5 ">
      {/* BOOTSTRAP RED WARNING BOX */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error:</strong> {error}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setError(null)} 
            aria-label="Close"
          ></button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Country Code (+XX)</label>
          <input
            type="text"
            className="form-control"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="form-label d-block">Message Template</label>
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
                    setError(null); // Clear error when switching templates
                }}
              />
              <label className="form-check-label" htmlFor={type.toLowerCase()}>
                {type}
              </label>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <label htmlFor="messageBox" className="form-label">
            Message Content
          </label>
          <textarea
            className="form-control"
            id="messageBox"
            rows={5}
            value={messages[messageType as keyof typeof messages]}
            onChange={handleTextChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success w-100">
          Send via WhatsApp
        </button>
      </form>
    </div>
  );
};

export default Body;