"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    FlutterwaveCheckout: (options: any) => void;
  }
}

export default function FlutterwavePayButton({ amount }: { amount: number }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!document.querySelector("#flutterwave-script")) {
      const script = document.createElement("script");
      script.id = "flutterwave-script";
      script.src = "https://checkout.flutterwave.com/v3.js";
      script.async = true;
      script.onload = () => setLoaded(true);
      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  const handlePayment = () => {
    console.log("Clicked!");
    if (!window.FlutterwaveCheckout) {
      alert("Payment system not ready, please try again.");
      return;
    }

    window.FlutterwaveCheckout({
      public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_KEY,
      tx_ref: Date.now().toString(),
      amount,
      currency: "UGX",
      payment_options: "card,mobilemoney,ussd",
      customer: {
        email: "customer@example.com",
        phonenumber: "0700000000",
        name: "John Doe",
      },
      customizations: {
        title: "Cawine Order Payment",
        description: "Payment for items in cart",
        logo: "/images/cawine_main_icon_round.png",
      },
      callback: (data: any) => {
        console.log("Payment callback:", data);
        if (data.status === "successful") {
          alert("✅ Payment successful!");
        } else {
          alert("❌ Payment failed!");
        }
      },
      onclose: () => console.log("Payment modal closed"),
    });
  };

  return (
    <button
      onClick={handlePayment}
      disabled={!loaded}
      className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold disabled:bg-gray-400"
    >
      {loaded ? "Pay with Mobile Money" : "Loading..."}
    </button>
  );
}