const heart = '♥';
const emptyheart = '♡';

export const rating = (number) => {
    return heart.repeat(number).padEnd(5, emptyheart);
};

export const formatPrice = (price) => {
    return (price / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });
};
