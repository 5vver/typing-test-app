import { type FC } from 'react';

type Props = {
  size?: 'xs' | 'sm' | 'md' | 'lg';
};

const Spinner: FC<Props> = ({ size = 'md' }) => {
  const sizeClasses = {
    xs: 'w-[14px] h-[14px] border-[2px]',
    sm: 'w-[24px] h-[24px] border-[3px]',
    md: 'w-[36px] h-[36px]',
    lg: 'w-[48px] h-[48px]',
  };

  return (
    <div
      className={`border-solid border-[5px] border-lavender border-b-transparent rounded-full inline-block box-border animate-rotate ${sizeClasses[size]}`}
    ></div>
  );

  //if (type === '3dots') return (
  //  <div className="w-[48px] h-[48px] rounded-full relative animate-rotate">
  //    <div className="before:content-[''] before:box-border before:absolute before:inset-0 before:rounded-full before:border-[5px] before:border-white before:animate-prixClip after:content-[''] after:box-border after:absolute after:inset-0 after:rounded-full after:border-[5px] after:border-[#FF3D00] after:animate-prixClip after:transform after:rotate-3d-90-90-0-180" />
  //  </div>
  //)
  //if (type === "4dots") return (
  //  <div className="h-[50px] w-[50px] animate-rotate relative scale-50">
  //    <div className="before:content-[''] before:block before:h-[20px] before:w-[20px] before:rounded-full before:bg-white before:shadow-red before:mb-[10px] before:animate-ball1 after:content-[''] after:block after:h-[20px] after:w-[20px] after:rounded-full after:bg-[#ff3d00] after:shadow-white after:animate-ball2" />
  //  </div>
  //);
};

export {Spinner};
