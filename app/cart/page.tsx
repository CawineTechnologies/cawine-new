"use client";

import { useEffect, useState } from "react";
import { getToken } from "firebase/messaging";
import CheckoutDialog from "@/components/checkoutDialog";
import { db, auth, messaging } from "@/lib/firebase";
import { doc, getDoc, getDocs, collection, updateDoc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useCartContext } from "@/lib/CartContext"; // our context

type CartItem = {
  id: string;
  name: string;
  poster: string;
  price: number;
  count: number;
  vendorID: string;
  userID: string;
};

export default function CartPage() {
  const { setUserUid, setVendorUid, setVendorTitle, setCurrency, setItemCount, setDlgCartItemsTotal, setDeviceToken } = useCartContext();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [vendorName, setVendorName] = useState("Loading...");
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryFee] = useState(5000);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // ===== Client-only: request notification permission =====
  useEffect(() => {
    if (typeof window === "undefined") return; // skip server
    const requestPermissionAndToken = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted" && messaging) {
          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_WEB_PUSH_CERTIFICATE_KEY_PAIR,
          });
          console.log("Device token:", token);
          setDeviceToken(token);
        }
      } catch (error) {
        console.error("Error getting token:", error);
      }
    };
    requestPermissionAndToken();
  }, [setDeviceToken]);

  // ===== Listen for logged-in user =====
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        setUserUid(user.uid);
        await loadCart(user.uid);
      }
    });
    return () => unsub();
  }, [setUserUid]);

  // ===== Load cart items =====
  const loadCart = async (uid: string) => {
    const querySnap = await getDocs(collection(db, "Cart", uid, "Items"));
    const items: CartItem[] = [];
    let total = 0;
    let totalCount = 0;

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
      totalCount += item.count;
    });

    setCart(items);
    setSubTotal(total + deliveryFee);
    setItemCount(totalCount);
    setDlgCartItemsTotal(total);

    if (items.length > 0) {
      const vendorID = items[0].vendorID;
      setVendorUid(vendorID);

      const vendorSnap = await getDoc(doc(db, "Vendors", vendorID));
      if (vendorSnap.exists()) {
        setVendorName(vendorSnap.data().name);
        setCurrency(vendorSnap.data().currency);
        setVendorTitle(vendorSnap.data().name);
      }
    }
  };

  // ===== Update cart quantity =====
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
          <div key={item.id} className="flex items-center justify-between border p-2 rounded-lg shadow-sm">
            <img src={item.poster} alt={item.name} className="w-16 h-16" />
            <p className="flex-1 ml-3">{item.name}</p>
            <p className="font-semibold">UGX {(item.price * item.count).toLocaleString()}</p>
            <div className="flex items-center space-x-2">
              <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => updateQuantity(item, "minus")}>-</button>
              <span>{item.count}</span>
              <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => updateQuantity(item, "plus")}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 shadow-lg">
        <h2 className="font-semibold">Summary</h2>
        <p>Delivery fee UGX {deliveryFee.toLocaleString()}</p>
        <h3 className="font-semibold">Sub total: UGX {subTotal.toLocaleString()}</h3>
        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg"
        >
          PROCEED TO CHECKOUT
        </button>
      </div>

      <CheckoutDialog open={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
}
