"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import FlutterwavePayButton from "@/components/ui/buttons/FlutterwavePayButton";
import {
  dlgCartItemsTotal,
  vendorUid,
  email,
  vendorTitle,
  userUid,
  currency,
  itemCount
} from "@/app/cart/page";
import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

interface CheckoutDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CheckoutDialog({ open, onClose }: CheckoutDialogProps) {
  const [orderNotes, setOrderNotes] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [deliverTo, setDeliverTo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const router = useRouter();

  async function sendOrder() {
    console.log(userUid);
    const userSnap = await getDoc(doc(db, "Users", userUid));
    if (userSnap.exists()) {
      setUserName(userSnap.data().fName);
      setPhoneNumber(userSnap.data().phoneNumber);
      setDeliverTo(userSnap.data().deliverTo);
    }
    const d = new Date();

    // 📅 formatted date (dd mm yyyy)
    const date = `${String(d.getDate()).padStart(2, "0")} ${String(
      d.getMonth() + 1
    ).padStart(2, "0")} ${d.getFullYear()}`;

    // ⏰ formatted time (hh:mm am/pm)
    const time = d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    let order = {
      dest: deliverTo,
      phone: phoneNumber,
      vendorTitle: vendorTitle,
      orderTime: `Placed at: ${time}`,
      orderDate: date,
      vendorID: vendorUid,
      client: userUid,
      name: userName,
      order: "pending",
      price: String(subTotal),
      deliveryFee: "5000",
      paymentType: "Cash",
      currency: currency,
      notes: orderNotes,
    };

    try {
      await setDoc(doc(db, "New orders", userUid), order);
      sendEmail();
      router.push("/order");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const cartTotal = dlgCartItemsTotal;
  const deliveryFee = 5000;
  const subTotal = cartTotal + deliveryFee;

  if (!open) return null;

  let deviceToken = "";

  async function sendEmail() {

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        subject: "New order",
        html: `<strong>From ${userName} at ${deliverTo} ordered ${itemCount} items for ${currency} ${cartTotal.toLocaleString()}</strong>`
      }),
    });
    console.log("Email sent successfully to: " + email);

    const data = await res.json();
    setEmailStatus(JSON.stringify(data));

    sendPush();
    console.log(deviceToken);
  }

  async function sendPush() {
    const vendorSnap = await getDoc(doc(db, "Vendors FCM Tokens", vendorUid));
    if (vendorSnap.exists()) {
      deviceToken = vendorSnap.data().token;
    }

    const res = await fetch("/api/send-push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: deviceToken,
        title: "New order",
        body: `From ${userName} at ${deliverTo} ordered ${itemCount} items for ${currency} ${cartTotal.toLocaleString()}`
      }),
    });
    console.log("Message sent successfully to " + deviceToken);

    const data = await res.json();
    setStatus(JSON.stringify(data));

    console.log(deviceToken);
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Checkout</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* ASAP / Schedule */}
          <div className="flex justify-center gap-4">
            <button className="px-4 py-2 border rounded-md bg-gray-100 text-sm font-semibold">
              As soon as possible
            </button>
            <button
              onClick={() => setIsScheduleDialogOpen(true)}
              className="px-4 py-2 border rounded-md bg-gray-100 text-sm font-semibold"
            >
              Schedule
            </button>
          </div>

          {/* Notes */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Delivery notes</p>
            <input
              type="text"
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="E.g opposite supermarket"
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>

          {/* Payment method */}
          <div>
            <h2 className="text-base font-semibold mb-2">Payment method</h2>
            <div className="bg-green-100 p-3 rounded flex justify-between items-center">
              <span className="text-sm font-medium">Cash on delivery</span>
              <span className="text-green-600">✔</span>
            </div>
            <div className="mt-3">
              {/* Flutterwave Button (Script-based) */}
              <FlutterwavePayButton amount={subTotal} />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 p-3 rounded space-y-2">
            <div className="flex justify-between text-sm">
              <span>Products</span>
              <span>UGX {cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery fee</span>
              <span>UGX {deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-semibold text-green-600 text-sm">
              <span>Sub total</span>
              <span>UGX {subTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <button
            onClick={sendOrder}
            className="w-full bg-green-600 text-white py-2 rounded-md font-semibold"
          >
            CONFIRM ORDER
          </button>
        </div>
      </div>

      {/* Nested Schedule Dialog */}
      {isScheduleDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-60">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">Schedule order</h2>
            <p className="text-sm text-gray-600 mb-3">
              Select delivery date and time
            </p>

            <div className="flex flex-col gap-3">
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              />
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setIsScheduleDialogOpen(false)}
                className="px-3 py-1 rounded border text-sm"
              >
                Close
              </button>
              <button
                onClick={() => setIsScheduleDialogOpen(false)}
                className="px-3 py-1 rounded bg-green-600 text-white text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}