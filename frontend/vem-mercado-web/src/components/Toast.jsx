import React from "react";

export default function Toast({ message, type = "info" }) {
  if (!message) return null;

  return (
    <>
      <style>{`
        .toast {
          position: fixed;
          bottom: 20px;
          right: 20px;

          padding: 14px 20px;
          font-size: 15px;

          color: #fff;
          border-radius: 10px;

          box-shadow: 0 4px 10px rgba(0,0,0,0.25);

          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.4s forwards;

          z-index: 9999;
        }

        .toast.info {
          background: #0d6efd;
        }

        .toast.success {
          background: #28a745;
        }

        .toast.error {
          background: #dc3545;
        }

        .toast.warning {
          background: #ffc107;
          color: #000;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-out {
          animation: fadeOutDown 0.4s forwards;
        }

        @keyframes fadeOutDown {
          to {
            opacity: 0;
            transform: translateY(20px);
          }
        }
      `}</style>

      <div className={`toast ${type}`} role="alert">
        {message}
      </div>
    </>
  );
}
