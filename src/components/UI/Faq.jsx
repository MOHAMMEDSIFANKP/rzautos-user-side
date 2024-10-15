import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getFaqsApi } from '../../services/services';

function Faq() {
    const [isOpen, setOpen] = useState(null);
    const [faqList, setFaqList] = useState([])

    const fetchData = async () => {
        try {
            const res = await getFaqsApi()
            const { data, StatusCode } = res.data
            if (StatusCode === 6000) {
                setFaqList(data)
            }
            else {
                setFaqList([])
            }
        } catch (error) {
            console.log(error);
            setFaqList([])
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

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
