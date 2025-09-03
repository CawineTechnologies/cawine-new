"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import FlutterwavePayButton from "@/components/ui/buttons/FlutterwavePayButton";
import {
  dlgCartItemsTotal,
  vendorUid,
  emailAdd,"use client";

import { getToken } from 'firebase/messaging';
import React, { useEffect, useState } from "react";
import CheckoutDialog from '@/components/checkoutDialog';

import { db, auth, messaging } from "@/lib/firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

type CartItem = {
  id: string;
  name: string;
  poster: string;
  price: number;
  count: number;
  vendorID: string;
  userID: string;
};

let userUidV = "";
let emailAddV = "";
let vendorUidV = "";
let currencyV = "";
let deviceTokenV = "";
let vendorTitleV = "";
let itemCountV = 0;
let dlgCartItemsTotal = 0;
async function requestPermissionAndToken() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: process.env.WEB_PUSH_CERTIFICATE_KEY_PAIR,
      });
      console.log("Device token:", token);
      deviceTokenV = token;
    } else {
      console.warn("Notification permission not granted.");
    }
  } catch (error) {
    console.error("Error getting token:", error);
  }
}

export default function MyOrderPage() {
  requestPermissionAndToken();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [vendorName, setVendorName] = useState<string>("Loading...");
  const [subTotal, setSubTotal] = useState<number>(0);
  const [deliveryFee] = useState<number>(5000);
  const [status, setStatus] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  async function sendPush() {

    const res = await fetch("/api/send-push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: deviceTokenV,
        title: "New order",
        body: "From Sarah needs items of UGX 1,200,000 now!"
      }),
    });
    console.log("Message sent successfully to " + deviceTokenV);

    const data = await res.json();
    setStatus(JSON.stringify(data));

    console.log(deviceTokenV);
  }

  async function sendEmail() {

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "mcqueensarah48@gmail.com",
        subject: "Hi there!",
        html: "<strong>How are you today!</strong>"
      }),
    });
    console.log("Email sent successfully to: mcqueensarah48@gmail.com");

    const data = await res.json();
    setEmailStatus(JSON.stringify(data));

    sendPush();
    console.log(deviceTokenV);
  }

  // Listen for logged in user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        await loadCart(user.uid);
      }
    });
    return () => unsub();
  }, []);

  // Load cart items
  const loadCart = async (uid: string) => {
    const querySnap = await getDocs(collection(db, "Cart", uid, "Items"));
    const items: CartItem[] = [];
    let total = 0;

    querySnap.forEach((docSnap) => {
      const data = docSnap.data();
      const item: CartItem = {
        id: docSnap.id,
        name: data.name,
        poster: data.poster,
        price: parseInt(data.price),
        count: parseInt(data.itemCount),
        vendorID: data.vendorID,
        userID: data.userID,
      };
      items.push(item);
      total += item.price * item.count;
      itemCountV += data.itemCount;
    });

    setCart(items);
    setSubTotal(total + deliveryFee);
    vendorUidV = items[0].vendorID;
    userUidV = items[0].userID;
    dlgCartItemsTotal = total

    // Fetch vendor name
    if (items.length > 0) {
      const vendorSnap = await getDoc(doc(db, "Vendors", items[0].vendorID));
      if (vendorSnap.exists()) {
        setVendorName(vendorSnap.data().name);
        currencyV = vendorSnap.data().currency;
        vendorTitleV = vendorSnap.data().name;
        emailAddV = vendorSnap.data().email;
      }
    }
  };

  // Update cart quantity
  const updateQuantity = async (item: CartItem, type: "plus" | "minus") => {
    if (!userId) return;
    let newCount = item.count;

    if (type === "plus") newCount++;
    else newCount--;

    if (newCount > 0) {
      await updateDoc(doc(db, "Cart", userId, "Items", item.id), {
        itemCount: newCount,
        orderPrice: item.price * newCount,
      });
    } else {
      await deleteDoc(doc(db, "Cart", userId, "Items", item.id));
    }

    await loadCart(userId);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">My Order</h1>
      <p className="text-gray-600">{vendorName}</p>

      <div className="mt-4 space-y-3">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-2 rounded-lg shadow-sm"
          >
            <img src={item.poster} alt={item.name} className="w-16 h-16" />
            <p className="flex-1 ml-3">{item.name}</p>
            <p className="font-semibold">
              UGX {(item.price * item.count).toLocaleString()}
            </p>
            <div className="flex items-center space-x-2">
              <button
                className="px-2 py-1 bg-gray-200 rounded"
                onClick={() => updateQuantity(item, "minus")}
              >
                -
              </button>
              <span>{item.count}</span>
              <button
                className="px-2 py-1 bg-gray-200 rounded"
                onClick={() => updateQuantity(item, "plus")}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 shadow-lg">
        <h2 className="font-semibold">Summary</h2>
        <p>Delivery fee UGX 5000</p>
        <h3 className="font-semibold">Sub total: UGX {subTotal.toLocaleString()}</h3>
        <button onClick={() => setIsCheckoutOpen(true)} className="mt-3 w-full bg-green-500 pointer text-white py-2 rounded-lg">
          PROCEED TO CHECKOUT
        </button>
      </div>
      <CheckoutDialog
        open={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}
export { 
  userUidV,
  currencyV,
  itemCountV,
  vendorTitleV,
  emailAddV,
  vendorUidV,
  dlgCartItemsTotal
}
  vendorTitle,
  userUid,
  currencyV,
  itemCountV
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

let userName;
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
      currency: currencyV,
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
        to: emailAdd,
        subject: "New order",
        html: `<strong>From ${userName} at ${deliverTo} ordered ${itemCountV} items for ${currencyV} ${cartTotal.toLocaleString()}</strong>`
      }),
    });
    console.log("Email sent successfully to: " + emailAdd);

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
        body: `From ${userName} at ${deliverTo} ordered ${itemCountV} items for ${currencyV} ${cartTotal.toLocaleString()}`
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
export { userUid }

