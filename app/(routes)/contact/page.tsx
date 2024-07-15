// app/(routes)/contact/page.tsx
"use client";

import { useState, Fragment } from "react";
import { Field, Label, Switch, Dialog, Transition } from "@headlessui/react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import Container from "@/components/container";

const RECAPTCHA_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_KEY || "";

function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { firstName, lastName, email, message } = formData;
    if (!firstName || !lastName || !email || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!agreed) {
      toast.error("You must agree to the privacy policy.");
      return;
    }

    if (!executeRecaptcha) {
      toast.error("Failed to load reCAPTCHA.");
      return;
    }

    // Execute reCAPTCHA
    const token = await executeRecaptcha("contact_form");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_FORM_}`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, token }),
    });

    if (res.ok) {
      toast.success("Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
      setAgreed(false);
    } else {
      const errorData = await res.json();
      toast.error(`Failed to send message: ${errorData.error}`);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="relative isolate bg-background px-6 py-24 sm:py-32 lg:px-8 z-10">
      <Toaster />
      <div className="relative mx-auto max-w-2xl text-center z-20">
        <h2 className="text-3xl font-bold tracking-tight text-Title sm:text-4xl">
          Contact Us
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="relative mx-auto mt-16 max-w-xl sm:mt-20 z-30"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold leading-6 text-Title2"
            >
              First name
            </label>

            <div className="mt-2.5">
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md border-2 border-white bg-background2 px-3.5 py-2 text-Title2 shadow-sm ring-1 ring-background focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold leading-6 text-Title2"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                className="block w-full rounded-md border-2 border-white bg-background2 px-3.5 py-2 text-Title2 shadow-sm ring-1 ring-background focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-Title2"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-2 border-white bg-background2 px-3.5 py-2 text-Title2 shadow-sm ring-1 ring-background focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-semibold leading-6 text-Title2"
            >
              Phone number
            </label>
            <div className="relative mt-2.5">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                className="block w-full rounded-md border-2 border-white bg-background2 px-3.5 py-2 text-Title2 shadow-sm ring-1 ring-background focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-Title2"
            >
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full rounded-md border-2 border-white bg-background2 px-3.5 py-2 text-Title2 shadow-sm ring-1 ring-background focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <Field className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                id="agreed"
                checked={agreed}
                onChange={setAgreed}
                className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[checked]:bg-primary"
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                />
              </Switch>
            </div>
            <Label className="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our{" "}
              <button
                type="button"
                onClick={openModal}
                className="font-semibold text-primary"
              >
                privacy policy
              </button>
              .
            </Label>
          </Field>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Let&apos;s talk
          </button>
        </div>
      </form>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Privacy Policy
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <Container className="px-4">
                        <h1 className="text-3xl font-bold">
                          นโยบายการคุ้มครองข้อมูลส่วนบุคคล
                        </h1>
                        <hr />
                        <h2 className="text-2xl font-bold">
                          1. การเก็บรวบรวมข้อมูลส่วนบุคคล
                        </h2>
                        <p className="text-lg">
                          เราเก็บรวบรวมข้อมูลส่วนบุคคลจากคุณเมื่อคุณใช้บริการของเรา
                          ข้อมูลที่เรารวบรวมอาจประกอบด้วย:
                        </p>
                        <ul className="text-lg">
                          <li>ชื่อและนามสกุล</li>
                          <li>ที่อยู่อีเมล</li>
                          <li>เบอร์โทรศัพท์</li>
                          <li>ที่อยู่จัดส่ง</li>
                          <li>ข้อมูลการชำระเงิน</li>
                          <li>
                            ข้อมูลการใช้งานเว็บไซต์ (เช่น คุกกี้และ IP address)
                          </li>
                        </ul>
                        <h2>2. วัตถุประสงค์ในการใช้ข้อมูลส่วนบุคคล</h2>
                        <p>
                          เราจะใช้ข้อมูลส่วนบุคคลของคุณเพื่อวัตถุประสงค์ต่อไปนี้:
                        </p>
                        <ul>
                          <li>การให้บริการและสนับสนุนลูกค้า</li>
                          <li>การประมวลผลการชำระเงินและคำสั่งซื้อ</li>
                          <li>การปรับปรุงและพัฒนาเว็บไซต์และบริการของเรา</li>
                          <li>
                            การส่งข้อมูลข่าวสารและโปรโมชั่นที่คุณอาจสนใจ
                            (โดยคุณสามารถยกเลิกการรับข้อมูลได้ทุกเมื่อ)
                          </li>
                        </ul>
                        <h2>3. การเปิดเผยข้อมูลส่วนบุคคล</h2>
                        <p>
                          เราจะไม่เปิดเผยข้อมูลส่วนบุคคลของคุณแก่บุคคลภายนอก
                          ยกเว้นในกรณีดังต่อไปนี้:
                        </p>
                        <ul>
                          <li>เพื่อให้บริการที่คุณร้องขอ</li>
                          <li>ตามที่กฎหมายกำหนด</li>
                          <li>
                            เพื่อปกป้องสิทธิ ทรัพย์สิน
                            และความปลอดภัยของเราและผู้ใช้บริการ
                          </li>
                        </ul>
                        <h2>4. การคุ้มครองข้อมูลส่วนบุคคล</h2>
                        <p>
                          เรามีมาตรการทางเทคนิคและองค์กรเพื่อป้องกันการเข้าถึง
                          การใช้
                          หรือการเปิดเผยข้อมูลส่วนบุคคลของคุณโดยไม่ได้รับอนุญาต
                        </p>
                        <h2>5. สิทธิของคุณ</h2>
                        <p>
                          คุณมีสิทธิในการเข้าถึง แก้ไข
                          หรือลบข้อมูลส่วนบุคคลของคุณ และสิทธิอื่น ๆ
                          ตามที่กฎหมายคุ้มครองข้อมูลส่วนบุคคลกำหนด
                        </p>
                        <h2>
                          6. การเปลี่ยนแปลงนโยบายการคุ้มครองข้อมูลส่วนบุคคล
                        </h2>
                        <p>
                          เราขอสงวนสิทธิ์ในการปรับปรุงนโยบายการคุ้มครองข้อมูลส่วนบุคคลนี้โดยไม่ต้องแจ้งให้ทราบล่วงหน้า
                          คุณควรตรวจสอบนโยบายนี้เป็นระยะเพื่อรับทราบข้อมูลการเปลี่ยนแปลงใด
                          ๆ
                        </p>
                        <h2>7. ติดต่อเรา</h2>
                        <p>
                          หากคุณมีคำถามหรือข้อสงสัยเกี่ยวกับนโยบายการคุ้มครองข้อมูลส่วนบุคคล
                          กรุณาติดต่อเราได้ที่:
                        </p>
                        <p>
                          บริษัท CodeWeb Co.,Ltd
                          <br />
                          ที่อยู่: [ที่อยู่บริษัท/องค์กร]
                          <br />
                          อีเมล: [ที่อยู่อีเมล]
                          <br />
                          เบอร์โทรศัพท์: [เบอร์โทรศัพท์]
                        </p>
                        <hr />
                      </Container>
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default function Contact() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
      <ContactForm />
    </GoogleReCaptchaProvider>
  );
}
