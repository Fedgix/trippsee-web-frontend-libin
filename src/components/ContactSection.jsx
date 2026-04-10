import { useState } from "react";
import toast from "react-hot-toast";
import "../style/contact.css";

const INBOX_EMAIL = "trippseeofficial@gmail.com";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const web3AccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (web3AccessKey) {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3AccessKey,
            subject: `[Trippsee contact] ${formData.subject}`,
            name: formData.name,
            email: formData.email,
            from_name: formData.name,
            message: `From: ${formData.name} <${formData.email}>\n\n${formData.message}`,
          }),
        });
        const data = await res.json();
        if (data.success) {
          toast.success("Message sent! We’ll get back to you soon.");
          setFormData({ name: "", email: "", subject: "", message: "" });
        } else {
          toast.error(data.message || "Could not send. Try again.");
        }
        return;
      }

      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
      const mailto = `mailto:${INBOX_EMAIL}?subject=${encodeURIComponent(
        `[Trippsee] ${formData.subject}`
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      toast.success(
        "Your email app should open—tap Send to deliver to Trippsee."
      );
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner">
        <h2 className="contact-heading">Contact us</h2>
        <p className="contact-lead">
          Questions about homestays or Trippsee? Send us a message—we’ll get
          back to you.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Full name
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </label>
          <label>
            Subject
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="What is this about?"
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your message..."
            />
          </label>
          <button
            type="submit"
            className="contact-submit"
            disabled={loading}
          >
            {loading ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}
