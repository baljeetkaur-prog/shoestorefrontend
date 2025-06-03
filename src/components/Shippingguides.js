import { Link } from "react-router-dom";

function Shippingguides() {
    const guides = [{
        title: 'Running Shoes',
        description: 'Lightweight, cushioned, and breathable shoes perfect for joggers and gym-goers.',
        features: [
            'Flexible soles for better movement',
            'Breathable mesh upper',
            'Cushioned insoles for shock absorption',
        ],
        usecases: 'Ideal for road running, treadmill use, and general fitness workouts.',
    },
    {
        title: 'Hiking Boots',
        description: 'High-ankle shoes with extra grip for rocky, outdoor adventures.',
        features: [
            'Water-resistant material',
            'Ankle support and padding',
            'Deep lug soles for maximum grip',
        ],
        usecases: 'Best suited for trekking, trail hiking, and uneven terrain walks.',
    },
    {
        title: 'Casual Sneakers',
        description: 'Trendy and versatile sneakers for everyday wear.',
        features: [
            'Stylish design with comfort in mind',
            'Available in various materials (canvas, leather)',
            'Lightweight sole for long wear',
        ],
        usecases: 'Perfect for office casuals, outings, and travel comfort.'
    }]
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <div className="breadcrumbs-main">
                        <ol className="breadcrumb">
                            <li><Link to="/homepage">Home</Link></li>
                            <li className="active">Buying Guides</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="ckeckout">
                <div className="container">
                    <div className="guideheader">
                        <h1>Buying Guides</h1>
                        <p>Choose the right pair for your lifestyle and needs.</p>
                    <div className="guidegrid">
                        {guides.map((guide, i) => (
                            <div key={i} className="guidecard">
                                <h3>{guide.title}</h3>
                                <p>{guide.description}</p>
                                <ul>
                                    {guide.features.map((feat, j) => (
                                        <li key={j}>{feat}</li>
                                    ))}
                                </ul>
                                <p><strong>Use Case: </strong>{guide.usecases}</p>
                            </div>
                        ))}
                    </div>
                    </div>
                    <div className="quicktips">
                        <h2>Quick Buying Tips</h2>
                        <ul>
                            <li>Try shoes in the evening – feet swell during the day.</li>
                            <li>Leave a thumb’s width between your longest toe and the front of the shoe.</li>
                            <li>Always wear the type of socks you'll use with the shoes while trying them on.</li>
                            <li>Check the return and exchange policy before making a purchase.</li>
                            <li>Walk around in the store (or at home for online buys) to test comfort and support.</li>
                            <li>Consider arch type—flat, neutral, or high—for better foot health.</li>
                            <li>Don't compromise on fit for style—uncomfortable shoes can cause long-term damage.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Shippingguides;
