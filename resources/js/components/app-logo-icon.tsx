import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return <img src="image.png" alt="Logo" className="h-16 w-16 rounded-full border border-[#19140035] dark:border-[#3E3E3A]" {...props} />;
}
