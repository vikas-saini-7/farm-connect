// import React from 'react';
// import Card from './icons';

// interface StatCardProps {
//   title: string;
//   value: string;
//   icon?: React.ReactNode;
//   trend?: 'up' | 'down' | 'neutral';
//   change?: string;
// }

// const StatCard = ({ title, value, icon, trend, change }: StatCardProps) => {
//   return (
//     <Card className="hover:shadow-md transition-shadow">
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="text-sm font-medium text-gray-500">{title}</p>
//           <p className="text-2xl font-bold mt-1 text-gray-800">{value}</p>
//         </div>
//         {icon && (
//           <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
//             {icon}
//           </div>
//         )}
//       </div>
//       {trend && change && (
//         <p className="text-xs text-gray-500 mt-2 flex items-center">
//           {trend === 'up' ? (
//             <span className="text-green-500 mr-1">↑</span>
//           ) : trend === 'down' ? (
//             <span className="text-red-500 mr-1">↓</span>
//           ) : (
//             <span className="text-gray-500 mr-1">→</span>
//           )}
//           {change}
//         </p>
//       )}
//     </Card>
//   );
// };

// export default StatCard;