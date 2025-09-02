"use client";

import { useEffect, useState } from "react";
import { userUid } from "@/components/checkoutDialog";
import { db } from "@/lib/firebase";
import { currencyV } from "@/app/cart/page";
import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

declare global {
  interface Window {
    FlutterwaveCheckout: (options: any) => void;
  }
}

let fName = "", emailAdd = "", phoneNo = "", lName = "";
async function userDetails() {
  const userSnap = await getDoc(doc(db, "Users", userUid));
  if (userSnap.exists()) {
    fName = userSnap.data().fName;
    lName = userSnap.data().lName;
    emailAdd = userSnap.data().email;
    phoneNo = userSnap.data().phoneNumber;
  }
}

export default function FlutterwavePayButton({ amount }: { amount: number }) {
  const [loaded, setLoaded] = useState(false);
  userDetails();
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
      currency: currencyV,
      payment_options: "card,mobilemoney,ussd",
      customer: {
        email: "cawinetechnologies@gmail.com",
        phonenumber: phoneNo,
        name: fName,
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
