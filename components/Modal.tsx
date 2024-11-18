"use client";

import { useState } from "react";

interface Props {
  productId: string;
  productTitle: string;
  productUrl: string;
}

const Modal = ({ productId, productTitle, productUrl }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    const product = {
      title: productTitle,
      url: productUrl,
    };

    const notificationType = "WELCOME"; // Or based on your logic

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          product,
          notificationType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Email sent successfully!");
        setEmail("");
        closeModal();
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        onClick={openModal}
      >
        Track Product
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 w-full max-w-md rounded-lg shadow-lg space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Track Product</h3>
              <button onClick={closeModal} className="text-gray-600 hover:text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <p className="text-sm text-gray-600 text-center mt-2">
              Enter your email to receive product updates and pricing alerts.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="youremail@example.com"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Track Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
