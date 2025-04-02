import { ReactNode } from 'react';

interface FeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="flex flex-col items-center px-4">
      <div className="text-blue-500 mb-5">{icon}</div>
      <h3 className="font-medium text-base mb-3 text-center">{title}</h3>
      <p className="text-gray-600 text-sm text-center">{description}</p>
    </div>
  );
}
