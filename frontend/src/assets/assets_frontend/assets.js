import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import logo_icon from './logo_icon.svg'
import convience_icon from './convience_icon.svg'
import efficiency_icon from './efficiency_icon.svg'
import personalisation_icon from './personalisation_icon.svg'


import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'



export const assets = {
    appointment_img,
    logo_icon,
    header_img,
    group_profiles,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    efficiency_icon,
    convience_icon,
    personalisation_icon


}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        date: "2025-03-14",
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Larson',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Christopher Davis',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Timothy White',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Ava Mitchell',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
]
export const bloodTestServices = [
    {
        name: "Glucose, Fasting",
        price: 100,
        description: "Assesses blood sugar levels after 8 hours of fasting."
    },
    {
        name: "Glucose, Post Prandial (PP), 2 Hours",
        price: 100,
        description: "Checks blood sugar levels 2 hours post-meal."
    },
    {
        name: "Glucose, Random",
        price: 100,
        description: "Measures blood sugar levels at a random time."
    },
    {
        name: "Uric Acid Serum",
        price: 200,
        description: "Evaluates uric acid concentration in the blood."
    },
    {
        name: "SGOT; Aspartate Aminotransferase (AST); SGPT/ALT",
        price: 350,
        description: "Tests liver enzymes for liver health assessment."
    },
    {
        name: "Bilirubin, Total",
        price: 150,
        description: "Measures bilirubin levels for liver function evaluation."
    },
    {
        name: "Alkaline Phosphatase (ALP)",
        price: 150,
        description: "Assesses enzyme levels linked to liver and bone health."
    },
    {
        name: "Serum Electrolytes",
        price: 450,
        description: "Tests sodium, potassium, and chloride levels in the blood."
    },
    {
        name: "Amylase, Serum",
        price: 400,
        description: "Evaluates pancreatic function through enzyme measurement."
    },
    {
        name: "Lipase",
        price: 500,
        description: "Measures lipase enzyme to check pancreas health."
    },
    {
        name: "Rheumatoid Factor (RA), Serum",
        price: 500,
        description: "Detects rheumatoid factor for arthritis diagnosis."
    },
    {
        name: "C-Reactive Protein (CRP)",
        price: 400,
        description: "Measures inflammation levels in the body."
    },
    {
        name: "HbA1c; Glycosylated Hemoglobin",
        price: 500,
        description: "Indicates average blood sugar levels over months."
    },
    {
        name: "Lipid Profile",
        price: 500,
        description: "Assesses cholesterol and triglycerides for heart health."
    },
    {
        name: "Hemoglobin (Hb)",
        price: 100,
        description: "Measures hemoglobin levels for anemia diagnosis."
    },
    {
        name: "Platelet Count",
        price: 100,
        description: "Counts platelets to evaluate clotting ability."
    },
    {
        name: "Prothrombin Time Studies",
        price: 100,
        description: "Measures blood clotting time and function."
    },
    {
        name: "Blood Group ABO & RH Factor",
        price: 100,
        description: "Determines blood type and Rh factor."
    },
    {
        name: "Widal Tube Agglutination Test",
        price: 1500,
        description: "Diagnoses typhoid by detecting antibodies."
    },
    {
        name: "HIV/HBV/HCV",
        price: 500,
        description: "Screens for HIV, Hepatitis B, and C infections."
    },
    {
        name: "Liver Panel (LFT)",
        price: 300,
        description: "Comprehensive test for liver health."
    },
    {
        name: "Kidney Panel (KFT)",
        price: 350,
        description: "Evaluates kidney function thoroughly."
    },
    {
        name: "Complete Blood Count (CBC)",
        price: 150,
        description: "Detailed analysis of blood components."
    },
    {
        name: "Bilirubin (Total, Direct & Indirect)",
        price: 500,
        description: "Differentiates types of bilirubin in the blood."
    },
    {
        name: "Lipid Profile, Screen",
        price: 400,
        description: "Screens cholesterol and triglycerides levels."
    },
    {
        name: "CBC with ESR",
        price: 100,
        description: "Includes inflammation measurement via ESR."
    },
    {
        name: "Urine RM",
        price: 100,
        description: "Routine examination of urine for health check."
    },
    {
        name: "BT/CT",
        price: 100,
        description: "Tests blood bleeding and clotting time."
    },
];
// assets.js

export const ultrasoundServices = [
    {
      name: "Anomaly Scan",
      price: 3000,
      description: "Detailed fetal anatomy assessment during pregnancy."
    },
    {
      name: "Bilateral Upper/Lower Limb Arterial Doppler",
      price: 3500,
      description: "Examines blood flow in the arteries of both upper or lower limbs."
    },
    {
      name: "Bilateral Upper/Lower Limb Venous Doppler",
      price: 3500,
      description: "Evaluates veins for clots or other abnormalities in both limbs."
    },
    {
      name: "Breast Ultrasound",
      price: 1500,
      description: "Imaging of breast tissue to detect lumps or other issues."
    },
    {
      name: "Color Doppler (Fetus)",
      price: 2500,
      description: "Assesses fetal blood flow and placental function."
    },
    {
      name: "KUB Female Ultrasound",
      price: 1200,
      description: "Focused imaging of kidneys, ureters, and bladder for females."
    },
    {
      name: "KUB Male Ultrasound",
      price: 1200,
      description: "Targeted imaging of kidneys, ureters, and bladder for males."
    },
    {
      name: "Lower Abdomen Ultrasound",
      price: 1200,
      description: "Examines organs in the lower abdominal cavity."
    },
    {
      name: "Neck Ultrasound",
      price: 1500,
      description: "Imaging of neck structures for thyroid or lymph node issues."
    },
    {
      name: "Obstetrics Ultrasound",
      price: 1500,
      description: "Tracks fetal growth and maternal health during pregnancy."
    },
    {
      name: "Small Parts Ultrasound",
      price: 1200,
      description: "Imaging of smaller organs like salivary glands or lymph nodes."
    },
    {
      name: "TAS Pelvis Ultrasound",
      price: 1200,
      description: "Examines the pelvic region for abnormalities."
    },
    {
      name: "Testis/Scrotum Ultrasound",
      price: 1500,
      description: "Checks for abnormalities in testicular or scrotal structures."
    },
    {
      name: "Thyroid & Neck Ultrasound",
      price: 1500,
      description: "Imaging for thyroid gland and surrounding neck tissues."
    },
    {
      name: "TVS Follicular Ultrasound",
      price: 1500,
      description: "Tracks follicle development for fertility evaluation."
    },
    {
      name: "TVS Pelvis Ultrasound",
      price: 1500,
      description: "Detailed imaging of pelvic organs via transvaginal approach."
    },
    {
      name: "Unilateral Upper/Lower Limb Arterial Doppler",
      price: 2000,
      description: "Examines blood flow in arteries of a single limb."
    },
    {
      name: "Unilateral Upper/Lower Limb Venous Doppler",
      price: 2000,
      description: "Checks veins of one limb for clots or abnormalities."
    },
    {
      name: "Upper Abdomen Ultrasound",
      price: 1200,
      description: "Focused imaging of upper abdominal organs."
    },
    {
      name: "Whole Abdomen Female Ultrasound",
      price: 1400,
      description: "Comprehensive imaging of abdominal organs for females."
    },
    {
      name: "Whole Abdomen Male Ultrasound",
      price: 1400,
      description: "Detailed imaging of abdominal organs for males."
    }
  ];
  