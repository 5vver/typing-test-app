import { type FC } from "react";
import { Typography } from "@components/Typography.tsx";
import { Icon } from "@components/Icon";

const Footer: FC = () => {
  return (
    <div className="bg-mantle">
      <div className="hidden lg:flex items-center place-content-between py-2 lg:px-8">
        <div className='flex gap-8 px-32'>
          <Icon name="github" size={20} color="rosewater" />
          <Icon name="telegram" size={24} color="rosewater" />
        </div>

        <div className="text-center">
          <Typography size="small">
            &copy; {new Date().getFullYear()} All rights reserved.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export { Footer };
