import React, { useState } from 'react';
import styled from 'styled-components';

function Faq() {
    const [isOpen, setOpen] = useState(null);

    const faqList = [
        {
            question: "How do I buy a car online?",
            answer: "You can browse through our collection of vehicles, select your preferred car, and proceed to the checkout. Our team will guide you through the payment and delivery process, ensuring a smooth and secure transaction."
        },
        {
            question: "Can I test drive a car before buying it?",
            answer: "Yes, you can arrange a test drive at one of our partner dealerships. Simply contact us to schedule an appointment for the car you are interested in."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept major credit/debit cards, bank transfers, and financing options through our approved lenders."
        },
        {
            question: "Do you offer financing options?",
            answer: "Yes, we offer a range of financing options to suit your needs. You can apply for finance during the checkout process, and our team will assist you in securing the best deal."
        },
        {
            question: "Can I trade in my old car?",
            answer: "Yes, you can trade in your old car when purchasing a new vehicle from us. Simply provide us with the details of your car, and we’ll give you an instant valuation."
        },
        {
            question: "Do you deliver cars across the UK?",
            answer: "Yes, we offer nationwide delivery to any location in the UK. Delivery costs may vary based on your location."
        }
    ];

    return (
        <Section>
            {faqList.map((faq, index) => (
                <Question key={index} selected={index === isOpen} onClick={() => setOpen(isOpen === index ? null : index)}>
                    <div className='flex'>
                        <p>{faq?.question}</p>
                        <p className='change-icons'>{index === isOpen ? '-' : '+'}</p>
                    </div>
                    {index === isOpen && (
                        <Answer>
                            <p>{faq?.answer}</p>
                        </Answer>
                    )}
                </Question>
            ))}
        </Section>
    );
}

export default Faq;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Question = styled.div`
    background-color: ${({ selected }) => (selected ? '#000d6b' : '#e3e3e3')};
    border-radius: 6px;
    transition: background-color 0.5s ease, padding 0.5s ease;

    .flex {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        padding: ${({ selected }) => (selected ? '10px 30px 0 30px' : '10px 30px')};
        transition: padding 0.3s ease;
    }

    p {
        margin-bottom: 0;
        font-family: 'general-sans-regular';
        font-size: 18px;
        color: ${({ selected }) => (selected ? 'white' : '')};
        transition: color 0.3s ease;
    }

    .change-icons {
        font-size: 20px;
        font-weight: bolder;
        cursor: pointer;
        color: ${({ selected }) => (selected ? 'white' : '#000d6b')};
        transition: color 0.3s ease;
    }
    @media (max-width:768px){
        p{
            font-size: 16px;
        }
        .flex{
            padding: ${({ selected }) => (selected ? '6px 20px 0 20px' : '6px 20px')};

        }
    }
`;

const Answer = styled.div`
    display: flex;
    align-items: center;
    color: white;
    padding: 10px 30px;
    border-radius: 0 0 6px 6px;
    background-color: #000d6b;
    transition: background-color 0.3s ease;

    p {
        margin-bottom: 0;
        font-family: 'general-sans-regular';
    }

    @media (max-width:768px){
        padding: 6px 20px;
    }
`;
