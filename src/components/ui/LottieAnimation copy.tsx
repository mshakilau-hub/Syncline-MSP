import React, { memo, forwardRef, ForwardedRef } from 'react';
import { Player, PlayerProps } from '@lottiefiles/react-lottie-player';

interface LottieAnimationProps extends Omit<PlayerProps, 'src'> {
  src: string | object;
  className?: string;
  loop?: boolean | number;
  autoplay?: boolean;
  speed?: number;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

const LottieAnimation = memo(
  forwardRef(
    (
      {
        src,
        className = '',
        loop = true,
        autoplay = true,
        speed = 1,
        onComplete,
        onError,
        ...playerProps
      }: LottieAnimationProps,
      ref: ForwardedRef<Player>
    ) => {
      return (
        <div className={`lottie-wrapper ${className}`}>
          <Player
            ref={ref}
            src={src}
            autoplay={autoplay}
            loop={loop}
            speed={speed}
            renderer="svg"
            background="transparent"
            style={{
              width: '100%',
              height: '100%',
            }}
            rendererSettings={{
              preserveAspectRatio: 'xMidYMid meet',
            }}
            onEvent={(event) => {
              if (event === 'complete') onComplete?.();
              if (event === 'error') onError?.(new Error('Lottie error'));
            }}
            {...playerProps}
          />
        </div>
      );
    }
  )
);

LottieAnimation.displayName = 'LottieAnimation';

export default LottieAnimation;









// // src/components/ui/LottieAnimation.tsx
// import React, { memo, forwardRef, ForwardedRef } from 'react';
// import { Player, PlayerProps } from '@lottiefiles/react-lottie-player';

// interface LottieAnimationProps extends Omit<PlayerProps, 'src'> {
//   src: string | object; // Support URL or imported JSON
//   className?: string;
//   style?: React.CSSProperties;
//   loop?: boolean | number;
//   autoplay?: boolean;
//   speed?: number;
//   scale?: number; // New prop: scale factor (e.g., 0.85 for 85% size)
//   onComplete?: () => void;
//   onError?: (error: Error) => void;
// }

// const LottieAnimation = memo(
//   forwardRef(
//     (
//       {
//         src,
//         className = '',
//         style = {},
//         loop = true,
//         autoplay = true,
//         speed = 1,
//         scale = 0.85, // Default to 85% size to avoid full dimension issues
//         onComplete,
//         onError,
//         ...playerProps
//       }: LottieAnimationProps,
//       ref: ForwardedRef<Player>
//     ) => {
//       const [error, setError] = React.useState<Error | null>(null);

//       // Handle loading errors
//       const handleError = (err: Error) => {
//         console.error('Lottie load error:', err);
//         setError(err);
//         if (onError) onError(err);
//       };

//       // Dynamic scaling style
//       const scaledStyle = {
//         ...style,
//         //transform: `scale(${scale})`,
//         transformOrigin: 'center',
//       };

//       // Fallback if error
//       if (error) {
//         return (
//           <div className="w-full h-full flex items-center justify-center text-red-500">
//             Failed to load animation
//           </div>
//         );
//       }

//       return (
//         <div className={`lottie-wrapper flex items-center justify-center ${className}`}>
//             <div className="w-[85%] h-[85%]">
//                       <Player
//             ref={ref}
//             src={src}
//             autoplay={autoplay}
//             loop={loop}
//             speed={speed}
//             background="transparent"
//             style={scaledStyle}
//             renderer="svg" // Sharp & performant
//             rendererSettings={{
//               preserveAspectRatio: 'xMidYMid meet', // Perfect display, no cropping
//               progressiveLoad: true, // Better performance
//             }}
//             onEvent={(event) => {
//               if (event === 'complete' && onComplete) onComplete();
//               if (event === 'error') handleError(new Error('Animation error'));
//             }}
//             {...playerProps}
//           />
//             </div>
//         </div>
//       );
//     }
//   )
// );

// LottieAnimation.displayName = 'LottieAnimation';

// export default LottieAnimation;