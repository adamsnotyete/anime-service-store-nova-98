
import { ServiceCard } from "@/types";
import { FormField } from "@/types";

export const services: ServiceCard[] = [
  {
    id: 1,
    name: "تغيير لقب",
    price: "500k",
    duration: "دائم",
    image: "https://wallpapercave.com/wp/wp6367626.jpg"
  },
  {
    id: 2,
    name: "تبديل لقب",
    price: "350k",
    duration: "دائم",
    image: "https://wallpapercave.com/wp/wp9268338.jpg"
  },
  {
    id: 3,
    name: "حجز لقب",
    price: "400k",
    duration: "أسبوع",
    image: "https://wallpapercave.com/wp/wp11230952.jpg"
  },
  {
    id: 4,
    name: "تغيير لقب مؤقت",
    price: "250k",
    duration: "يوم",
    image: "https://wallpapercave.com/wp/wp8349598.jpg"
  },
  {
    id: 5,
    name: "سرقة لقب",
    price: "1m",
    duration: "يوم",
    image: "https://wallpapercave.com/wp/wp4771870.jpg"
  },
  {
    id: 6,
    name: "تغيير لقب خارج الانمي",
    price: "5m",
    duration: "يوم",
    image: "https://wallpapercave.com/wp/wp9268321.jpg"
  },
  {
    id: 7,
    name: "دبل بيبي",
    price: "200k",
    duration: "يوم",
    image: "https://wallpapercave.com/wp/wp4709480.jpg"
  },
  {
    id: 8,
    name: "إهداء دبل بيبي",
    price: "200k",
    duration: "يوم",
    image: "https://wallpapercave.com/wp/wp8962892.jpg"
  },
  {
    id: 9,
    name: "حذف إنذار",
    price: "300k",
    duration: "إنذار واحد",
    image: "https://wallpapercave.com/wp/wp8907069.jpg"
  },
  {
    id: 10,
    name: "إلغاء طرد",
    price: "1m",
    duration: "يوم",
    image: "https://wallpapercave.com/wp/wp11473361.jpg"
  },
  {
    id: 11,
    name: "حماية من طرد",
    price: "400k",
    duration: "يوم",
    image: "https://wallpapercave.com/wp/wp8954342.jpg"
  },
  {
    id: 12,
    name: "تغيير لقب عضو",
    price: "200k",
    duration: "يوم",
    image: "https://wallpapercave.com/wp/wp8560297.jpg"
  },
  {
    id: 13,
    name: "إضافة إنذار",
    price: "300k",
    duration: "إنذار واحد",
    image: "https://wallpapercave.com/wp/wp9268399.jpg"
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
  10: [], // No additional fields for warning removal
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
      label: "عدد الانذارات ",
      type: "text",
      required: true
    }
  ]
};
