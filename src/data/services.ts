
import { ServiceCard } from "@/types";
import { FormField } from "@/types";

export const services: ServiceCard[] = [
  {
    id: 1,
    name: "تغيير لقب",
    price: "500k",
    duration: "دائم",
    image: "https://i.imgur.com/wT4Vmnz.jpg" // One Piece
  },
  {
    id: 2,
    name: "تبديل لقب",
    price: "350k",
    duration: "دائم",
    image: "https://i.imgur.com/dvQIrPZ.jpg" // Naruto
  },
  {
    id: 3,
    name: "حجز لقب",
    price: "400k",
    duration: "أسبوع",
    image: "https://i.imgur.com/0Fr2A1k.jpg" // Attack on Titan
  },
  {
    id: 4,
    name: "تغيير لقب مؤقت",
    price: "250k",
    duration: "يوم",
    image: "https://i.imgur.com/y3wGgGU.jpg" // My Hero Academia
  },
  {
    id: 5,
    name: "سرقة لقب",
    price: "1m",
    duration: "يوم",
    image: "https://i.imgur.com/EgOWnWT.jpg" // Demon Slayer
  },
  {
    id: 6,
    name: "تغيير لقب خارج الانمي",
    price: "5m",
    duration: "يوم",
    image: "https://i.imgur.com/Jh5VlVj.jpg" // Jujutsu Kaisen
  },
  {
    id: 7,
    name: "دبل بيبي",
    price: "200k",
    duration: "يوم",
    image: "https://i.imgur.com/HwOZYNi.jpg" // Dragon Ball
  },
  {
    id: 8,
    name: "إهداء دبل بيبي",
    price: "200k",
    duration: "يوم",
    image: "https://i.imgur.com/vP3xPzC.jpg" // Hunter x Hunter
  },
  {
    id: 9,
    name: "حذف إنذار",
    price: "300k",
    duration: "إنذار واحد",
    image: "https://i.imgur.com/JWe8CDV.jpg" // Death Note
  },
  {
    id: 10,
    name: "إلغاء طرد",
    price: "1m",
    duration: "يوم",
    image: "https://i.imgur.com/KRezDAV.jpg" // Fullmetal Alchemist
  },
  {
    id: 11,
    name: "حماية من طرد",
    price: "400k",
    duration: "يوم",
    image: "https://i.imgur.com/vXBvGGp.jpg" // Tokyo Ghoul
  },
  {
    id: 12,
    name: "تغيير لقب عضو",
    price: "200k",
    duration: "يوم",
    image: "https://i.imgur.com/vNOMqrI.jpg" // Your Name
  },
  {
    id: 13,
    name: "إضافة إنذار",
    price: "300k",
    duration: "إنذار واحد",
    image: "https://i.imgur.com/3MOnhAm.jpg" // Violet Evergarden
  }
];

export const serviceFormFields: Record<number, FormField[]> = {
  1: [
    {
      id: "newNickname",
      label: "اللقب الجديد المطلوب",
      type: "text",
      required: true
    }
  ],
  2: [
    {
      id: "otherNickname",
      label: "لقب الشخص الآخر",
      type: "text",
      required: true
    },
    {
      id: "otherUserId",
      label: "رقم المستخدم الآخر",
      type: "text",
      required: true
    },
    {
      id: "otherConfirmation",
      label: "تأكيد من الطرف الآخر",
      type: "select",
      required: true,
      options: ["نعم", "لا"]
    }
  ],
  3: [
    {
      id: "reservedNickname",
      label: "اللقب المراد حجزه",
      type: "text",
      required: true
    }
  ],
  4: [
    {
      id: "tempNickname",
      label: "اللقب المؤقت المطلوب",
      type: "text",
      required: true
    }
  ],
  5: [
    {
      id: "targetNickname",
      label: "اللقب المراد سرقته",
      type: "text",
      required: true
    },
    {
      id: "targetUserId",
      label: "رقم المستخدم المراد سرقة لقبه",
      type: "text",
      required: true
    }
  ],
  6: [
    {
      id: "externalNickname",
      label: "اللقب الخارجي المطلوب",
      type: "text",
      required: true
    }
  ],
  7: [], // No additional fields
  8: [
    {
      id: "giftRecipientId",
      label: "رقم المستخدم المراد إهداؤه",
      type: "text",
      required: true
    }
  ],
  9: [], // No additional fields for warning removal
  10: [
    {
      id: "banReason",
      label: "سبب الطرد الأصلي",
      type: "text",
      required: true
    }
  ],
  11: [], // No additional fields for ban protection
  12: [
    {
      id: "targetMemberId",
      label: "رقم العضو المراد تغيير لقبه",
      type: "text",
      required: true
    },
    {
      id: "newMemberNickname",
      label: "اللقب الجديد للعضو",
      type: "text",
      required: true
    }
  ],
  13: [
    {
      id: "targetWarningId",
      label: "رقم المستخدم المراد إضافة إنذار له",
      type: "text",
      required: true
    },
    {
      id: "warningReason",
      label: "سبب الإنذار",
      type: "text",
      required: true
    }
  ]
};
