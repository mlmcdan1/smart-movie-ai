type Props = {
    username: string;
    comment: string;
};

export default function CommentDisplayCard({ username, comment }: Props) {
    return (
        <div className="bg-[#121212] p-4 rounded-md border border-gray-700">
            <p className="text-sm text-gray-400">
                {username}
            </p>
            <p className="text-white mt-1">
                {comment}
            </p>
        </div>
    );
}