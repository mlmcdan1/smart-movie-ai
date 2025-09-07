import Link from 'next/link';

type BrandedCategoryCardProps = {
    title: string;
    videoSrc: string;
    imageSrc: string;
    route: string;
};

export default function BrandedCategoryCard({
    title,
    videoSrc,
    imageSrc,
    route,
}: BrandedCategoryCardProps) {
    return (
        <Link href={route}>
            <div className='relative w-[240px] h-[135px] rounded overflow-hidden group cursor-pointer border border-gray-700'>
                {/* Static Image */}
                <img
                    src={imageSrc}
                    alt={title}
                    className='w-full h-full object-cover group-hover:opacity-0 transition duration-300'
                />

                {/* Hover Video */}
                <video
                    src={videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className='absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-300'
                />

                {/* Title Overlay */}
                <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white text-sm font-semibold'>
                    {title}
                </div>
            </div>
        </Link>
    )
}