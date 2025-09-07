type Props = {
    name: string;
    avatar: string;
    genre: string;
    comment: string;
};

export default function CommunityLeaderCard({name, avatar, genre, comment}: Props){
    return (
        <div className="bg-[#1a1a1a] p-5 rounded-xl shadow-md">
            <div className="flex items-center gap-4 mb-4">
                <img
                    src={avatar}
                    alt="name"
                    className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                    <h3 className="font-bold text-lg">
                        [name]
                    </h3>
                    <p className="text-sm text-gray-400">
                        {genre}
                    </p>
                </div>
            </div>
            <p className="text-gray-300 italic">
                {comment}
            </p>
        </div>
    )
}