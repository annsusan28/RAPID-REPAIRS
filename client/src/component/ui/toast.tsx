import { Toaster as Sonner, toast } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return <Sonner className='toaster group' {...props} />;
};

export { Toaster };

// show toast function
interface ShowToastProps {
  message?: string;
  variant?: 'success' | 'error' | 'warning' | 'loading';
  promise?: Promise<void>;
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
}
export const showToast = ({
  message,
  variant,
  promise,
  loadingMessage,
  successMessage,
  errorMessage,
}: ShowToastProps) => {
  return new Promise((resolve, reject) => {
    switch (variant) {
      case 'success':
        return resolve(toast.success(message));
      case 'warning':
        return resolve(toast.warning(message));
      case 'error':
        return resolve(toast.error(message));
      case 'loading':
        if (promise) {
          return toast.promise(promise, {
            loading: loadingMessage,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            success: (res: any) => {
              const err = res?.errors?.message;
              if (err) {
                throw new Error(err);
              }
              resolve(successMessage);
              return successMessage;
            },
            error: (res) => {
              const errMsg = errorMessage ? errorMessage : res?.message;
              reject(errMsg);
              return errMsg;
            },
          });
        }
        break;
      default:
        return resolve(toast(message));
    }
  }).catch((err) => console.log(`Error: ${err}`));
};
