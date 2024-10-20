import { api } from "../axios/axios";

// ----------------------------Get methods-------------------------------------//
const getSeoApi = (path) => {
    return api.get(`seo/?path=${path}`, {
        withCredentials: true,
    });
};

const getHomePageCarouselApi = () => {
    return api.get(`home-page-carousel/`, {
        withCredentials: true,
    });
};

const getCarsApi = (page_limit=6,search="",transmission='',fuel_type='',price) => {
    return api.get(`cars/?search=${search}&&page_limit=${page_limit}&&transmission__transmission=${transmission}&&fuel_type__fuel_type=${fuel_type}&&price_order_type=${price}`, {
        withCredentials: true,
    });
};

const getTestimonialsApi = () => {
    return api.get(`testimonials/`, {
        withCredentials: true,
    });
};

const getFaqsApi = () => {
    return api.get(`faq/`, {
        withCredentials: true,
    });
};

// For Filter option
const TransmissionApi = () => {
    return api.get(`transmission/`, {
        withCredentials: true,
    });
};

const FuelTypesApi = () => {
    return api.get(`fuel-types/`, {
        withCredentials: true,
    });
};

const getCarDetailsApi = (id) => {
    return api.get(`cars/${id}/`, {
        withCredentials: true,
    });
};

const getPopularSerivceApi = () => {
    return api.get(`popular-services/`, {
        withCredentials: true,
    });
};

const getHeadOfficeApi = () => {
    return api.get(`head-office/`, {
        withCredentials: true,
    });
};
// ----------------------------Post methods-------------------------------------//

const postEnquiryApi = (values) => {
    return api.post('enquiry/', values, {
        withCredentials: true,
    });
};

const postResaleEnquiryApi = (values) => {
    return api.post('resale-enquiry/', values, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    });
};

export{
    getSeoApi,
    getHomePageCarouselApi,
    getCarsApi,
    getTestimonialsApi,
    getFaqsApi,
    TransmissionApi,
    FuelTypesApi,
    getCarDetailsApi,
    getPopularSerivceApi,
    getHeadOfficeApi,
    postEnquiryApi,
    postResaleEnquiryApi,
}