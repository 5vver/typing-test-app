import { Icon } from '@components/Icon';
import { useUploadAvatarMutation } from '@components/Profile/tabs/General/queries.ts';
import { Spinner } from '@components/Spinner.tsx';
import { Typography } from '@components/Typography.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar.tsx';
import { Button } from '@components/ui/button.tsx';
import { useToast } from '@hooks/use-toast.ts';
import type { Auth } from '@utils/auth.tsx';
import { ChangeEvent, type FC, useCallback, useRef } from 'react';

type Props = {
  pictureUrl: string;
  fallback: string;
  refetch: Auth['refetch'];
};

const AvatarUploader: FC<Props> = ({ pictureUrl, fallback, refetch }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const { mutate: uploadAvatar, isPending: isUploading } =
    useUploadAvatarMutation({ refetch });

  const onAvatarClick = useCallback(() => {
    const fileInput = fileInputRef.current;

    if (fileInput) {
      fileInput.click();
    }
  }, []);

  const onFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file && !file.type.startsWith('image/')) {
        console.error('File is not an image');
        toast({ variant: 'destructive', description: 'File is not an image' });
        return;
      }

      if (file && file.size > 1024 * 1024 * 25) {
        console.error('File is too large');
        toast({ variant: 'destructive', description: 'File is too large' });
        return;
      }

      if (file) {
        uploadAvatar(file);
      }
    },
    [uploadAvatar, toast],
  );

  return (
    <Avatar className="w-32 h-32 group">
      <AvatarImage src={pictureUrl} alt="profile-pic-mini" />
      <AvatarFallback>{fallback}</AvatarFallback>

      {!isUploading && (
        <div className="absolute hidden w-full h-auto bottom-5 m-auto z-10 group-hover:flex justify-center">
          <Button
            onClick={onAvatarClick}
            className="p-0 h-auto w-auto bg-transparent text-transparent hover:bg-transparent hover:text-transparent"
          >
            <div className="flex items-center bg-background p-0.5 rounded-sm text-center">
              <Icon name="camera-micro" size={16} className="text-lavender" />
              <Typography size="muted" className="text-xs">
                Update image
              </Typography>
            </div>
          </Button>
        </div>
      )}

      {isUploading && (
        <div className="absolute w-[36px] h-[36px] inset-0 m-auto">
          <Spinner size="md" />
        </div>
      )}

      <input
        type="file"
        className="hidden"
        accept="image/*"
        ref={fileInputRef}
        onChange={onFileChange}
        disabled={isUploading}
      />
    </Avatar>
  );
};

export { AvatarUploader };
