// import admin from 'firebase-admin';
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

// const serviceAccount = {
//     "type": "service_account",
//     "project_id": "cawine-736ac",
//     "private_key_id": "92e2938fcf5febf5ffc95d9aeabcdbb840b13aba",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDj85e8BZAA/gfv\nh/OXy1CJSrtu5v1vO4t80r/pwcwHHPOhTtQsi08hQuxz7y1S5zRqfygyiHCobxeZ\nXvQMNvzrLDDz8swrDpw0x3vm7LD27CfXWG02pzjGylwdpeu3G85anK4XftWdXC2M\nbEaByTXzWFw2H1x0X20kaUkwTXoEY1UzWxZJ+KwVda4IYJybewLkcKSk+ui0UZtS\nOk0Ih/XXA1xfrZwnu04oUykGtHQ5DERdutA5RklVv2dZ2IMy/XBNZuqX1x6fgFrA\nXtd54fB3yhfF2Arfh3QL3gSKv1NADwGS0TMyBtDC5jO/PfT6oRE2FWBGRQpnvjy7\n/pQQnRxVAgMBAAECggEAbylx49uUk59OEGXsiSg5gJJEoDsd+RoBFmCR/TUoQYnB\nV3chKg3Pi2le9NR89lJQseSLnkUCJ2lxiTYQbkp8gVTeFIDhRtgLngNv7TecvvWA\nIlh5fe8DVZIGZODud6+kLHT+wu9zzZbPkYyVv6H3YNHEuhIGHKwShfCgI+GMcMly\ncd+0hPIq5TwkA7Zec6xiD5u96n+dcNygGg+/qmTziLYb20qmHqR+vYdn2bGfjKD5\nssef9nCXGiImxaA5UKkJ1DDhTuw+i0vgH504S2Nhv3OAtnIBGwVZ4YOn+nP9iyM5\n3Hn6XwopXziwZEKlIQV0DF5pm6uOXNzM3VAE8q456wKBgQD2bTxYJAj3kllQzo0F\nWuhrJJAFeyN0mkEWMYauR1YTfbXfNNPmIaq1cgS7XaB/4hFlnTMKroW8INMAW8Oj\n6OVWsomENbfopSWKlu4GkSzX+5/GVX6yfLzuwjf/p6w70ABOAHoJ+i4b5nWevHv7\n+Frsa+v5bH9SB0s+HaN5NeIdewKBgQDszp4d6H47FElHbW7KOXLtRAzfoIoi2uyR\nGvvNOnSUxwEfrYgi8XY657xaOiE2mgM54Jq3ul407+4a8CLLWFlvTr0jnMOC1LUu\nHetbGmGAMZCcOt0TWKibRMIN/FOoRJu4TdO5T/gBvksKqgFNPf4wJkVG+DvMImjM\nxUUikAS8bwKBgQDeh/qMZc4rM1+wlzXF9jgYOSZNrMtxyrKoBgVncEgMxeLtM9l+\n4jw0KkiXoo8DrPSk3HZxWPSv1Lx2gGeFpxUjW4rPd2sija//HRjJmWPzjujTw/Tr\n3bUHrx++oH3qbYU46zlJtUDaNR1WQUN9YONKyJKJ5S58ttV9vGoZVU1h7QKBgQCL\nz41Q8SQd82M0VarUoEh3RvcmzNzhqUmEfl7uEzYjZL8IGedHYjJAovL0fl9/ojyH\nXlFaaiEWthVpOCAC2H2tFtrafMJ9quHxgV6kYhXwntLXOnWt52lciqLbqP8nWKJr\nlR+MyGcPeG9Ls4WjOheqC95ZAVQkuKgRReMEfe0d5wKBgGlVzpKDJt5eIhVytVJn\nBJ7jf71ZkLTcNqLEoCi2OVo5XwUXi1fHpFvYY8PhT4kXsEdE4OFde/XZzRI9uMrt\n8oHqKcDkFPgxPOG65OvdCWjhZfuCr/Sza1WJEsL+/qM+8eJr+GVQRb3Wp3CaRotb\nwfucEYAXmIaPr7jNu2zDBOZp\n-----END PRIVATE KEY-----\n",
//     "client_email": "firebase-adminsdk-u1fvf@cawine-736ac.iam.gserviceaccount.com",
//     "client_id": "112783330048503845871",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-u1fvf%40cawine-736ac.iam.gserviceaccount.com",
//     "universe_domain": "googleapis.com"
// }

// const privateKey = serviceAccount.private_key.replace(/\\n/g, '\n');

initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });

  export const adminMessaging = getMessaging();

  // admin.initializeApp({
  //   credential: admin.credential.cert({
  //     ...serviceAccount,
  //     privateKey,
  //   })
  // }, "secondaryApp");

  // export const adminMessaging = admin.messaging()
