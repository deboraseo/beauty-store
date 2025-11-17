import './SkeletonCard.css';

const SkeletonCard = ({ count = 3, cardClassName = 'prd-card' }) => {
    return (
        <>
            {[...Array(count)].map((_, index) => (
                <li key={index} className={`${cardClassName} skeleton-card`}>
                    <div className="skeleton-image shimmer"></div>
                    <div className="skeleton-content">
                        <div className="skeleton-brand shimmer"></div>
                        <div className="skeleton-name shimmer"></div>
                        <div className="skeleton-name-line2 shimmer"></div>
                        <div className="skeleton-rating shimmer"></div>
                        <div className="skeleton-price shimmer"></div>
                    </div>
                </li>
            ))}
        </>
    );
};

export default SkeletonCard;
