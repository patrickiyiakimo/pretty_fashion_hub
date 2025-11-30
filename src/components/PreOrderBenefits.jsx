// components/PreOrderBenefits.jsx
export default function PreOrderBenefits() {
  const benefits = [
    {
      title: 'Guaranteed Allocation',
      description: 'Secure your unit before they sell out',
      icon: '🔒'
    },
    {
      title: 'Priority Shipping',
      description: 'Be among the first to receive the product',
      icon: '🚀'
    },
    {
      title: 'Special Discount',
      description: 'Early bird pricing for pre-order customers',
      icon: '💰'
    },
    {
      title: 'Free Updates',
      description: 'Get production updates and exclusive content',
      icon: '📧'
    }
  ];

  return (
    <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-8 text-white">
      <h2 className="text-2xl font-bold mb-8 text-center">Why Pre-Order With Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl mb-3">{benefit.icon}</div>
            <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
            <p className="text-blue-100 text-sm">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}