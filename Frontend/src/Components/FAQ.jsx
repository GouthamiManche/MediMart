import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Q. What is MediMart?",
      answer: "A. MediMart is an online pharmacy platform that allows you to conveniently order medications and health products from the comfort of your home. Our platform offers a wide range of products, efficient order management, and secure payment options."
    },
    {
      question: "Q. How do I place an order?",
      answer: "A. To place an order, simply browse our catalog, add the desired items to your cart, and proceed to checkout. Follow the instructions to complete your purchase."
    },
    {
      question: "Q. Can I track my order?",
      answer: "A. Yes, you can track your order by logging into your account and selecting the 'Track Orders' option. You will also receive email updates with tracking information once your order has been shipped."
    },
    {
      question: "Q. What payment methods do you accept?",
      answer: "A. We accept various payment methods, including credit/debit cards, net banking, and digital wallets. All transactions are secure and encrypted for your safety."
    },
    {
      question: "Q. How can I cancel or modify my order?",
      answer: "A. To cancel or modify your order, please contact our customer support team as soon as possible at teammedimart@gmail.com or call us at (+1)123-456-7890. Orders that have already been shipped cannot be canceled or modified."
    },
    {
      question: "Q. Do you require a prescription for medications?",
      answer: "A. Yes, we require a valid prescription for prescription medications. You can upload your prescription during the ordering process, and our pharmacists will review it before dispensing the medication."
    },
    {
      question: "Q. What is your return policy?",
      answer: "A. We accept returns for unopened and unused products within 30 days of purchase. Please contact our customer support team to initiate a return and receive further instructions."
    },
    {
      question: "Q. How do I contact customer support?",
      answer: "A. You can reach our customer support team by email at teammedimart@gmail.com or by phone at (+1)123-456-7890. Our support hours are Monday to Friday, 9 AM to 6 PM."
    },
    {
      question: "Q. Are my personal and payment details secure?",
      answer: "A. Yes, we use industry-standard security measures to protect your personal and payment information. Our website is SSL encrypted, and we comply with all relevant data protection regulations."
    },
    {
      question: "Q. Do you offer international shipping?",
      answer: "A. Currently, we offer shipping within the United States only. We are working on expanding our services to international locations in the near future."
    },
    {
      question: "Q. How can I create an account?",
      answer: "A. To create an account, click on the 'Sign Up' button on our homepage and fill in the required information. Once registered, you can easily manage your orders, track shipments, and save your preferences."
    },
    {
      question: "Q. Do you offer discounts or promotions?",
      answer: "A. Yes, we regularly offer discounts and promotions on various products. Sign up for our newsletter or follow us on social media to stay updated on the latest offers."
    },
    {
      question: "Q. What should I do if I receive the wrong product?",
      answer: "A. If you receive the wrong product, please contact our customer support team immediately. We will arrange for the correct product to be sent to you and provide instructions for returning the incorrect item."
    },
    {
      question: "Q. How do I know if a medication is in stock?",
      answer: "A. Our website displays real-time stock information. If a product is out of stock, you will see an 'Out of Stock' label on the product page. You can also sign up to be notified when the product is back in stock."
    },
    {
      question: "Q. Can I get advice from a pharmacist?",
      answer: "A. Yes, our licensed pharmacists are available to answer your questions and provide advice on medications and health products. You can reach them through our customer support channels."
    },
  ];

  return (
    <div className="container mx-auto px-4 mt-4">
      <h1 className="text-xl font-bold mb-2 mt-8">FAQ</h1>
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white pl-4 pr-4 pb-2 pt-2 rounded-lg">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <h1 className="text-lg font-semibold">{faq.question}</h1>
              <span>{openIndex === index ? '-' : '+'}</span>
            </div>
            {openIndex === index && (
              <p className="text-sm leading-relaxed mt-4">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8">
        <hr className="border-gray-300" />
      </div>
    </div>
  );
};

export default FAQ;
