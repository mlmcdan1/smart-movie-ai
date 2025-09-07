import BrandedCategoryCard from "./BrandedCategoryCard";

export default function BrandedCategoriesRow() {
    return (
        <section className="my-8 px-4">
            <h2 className="text-xl font-bold text-white mb-4">
                Featured Worlds
            </h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                <BrandedCategoryCard
                    title="Horror"
                    imageSrc="/assets/categories/horror.jpg"
                    videoSrc="/assets/categories/horror.mp4"
                    route="/category/horror"
                />
                <BrandedCategoryCard
                    title="Pixar"
                    imageSrc="/assets/categories/pixar.jpg"
                    videoSrc="/assets/categories/pixar.mp4"
                    route="/category/pixar"
                />
                <BrandedCategoryCard
                    title="Star Wars"
                    imageSrc="/assets/categories/starwars.jpg"
                    videoSrc="/assets/categories/starwars.mp4"
                    route="/category/starwars"
                />
                <BrandedCategoryCard
                    title="Nat Geo"
                    imageSrc="/assets/categories/natgeo.jpg"
                    videoSrc="/assets/categories/natgeo.mp4"
                    route="/category/natgeo"
                />
            </div>
        </section>
    );
}