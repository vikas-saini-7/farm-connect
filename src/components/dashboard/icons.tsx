// import React, { HTMLAttributes } from 'react';

// interface CardProps extends HTMLAttributes<HTMLDivElement> {
//   title?: string;
// }

// const Card = ({ title, className = '', children, ...props }: CardProps) => {
//   return (
//     <div 
//       className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden ${className}`}
//       {...props}
//     >
//       {title && (
//         <div className="border-b border-gray-100 px-4 py-3">
//           <h3 className="font-medium text-gray-800">{title}</h3>
//         </div>
//       )}
//       <div className="p-4">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Card;