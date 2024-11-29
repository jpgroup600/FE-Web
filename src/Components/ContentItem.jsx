


const ContentItem = ({ product=null, color = "black" }) => {

    const getChannelImage = (channelName = null) => {
        const cleanChannelName = channelName.trim().toLowerCase();
        return channelImages[cleanChannelName] || Logo;
    };
    const channels = product.channel[0].split(',').map(ch => ch.trim());

    return (
        <div className="content-image-container">
            <Link to={`/view/${product._id}`}>
            <div className="content-image mt-10 border-2 h-[25vh] w-full rounded-[20px]"
                style={{ backgroundImage: `url(${product?.image[0]})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >

            </div>
            <div className="content-text-container mt-2">
                <div className="flex items-center gap-2 font-[600] mb-3">
                    {channels?.map((channel, index) => (

                        <div key={index} className="flex items-center gap-1">
                            <img
                                src={getChannelImage(channel)}
                                alt={channel}
                                className="h-5 w-5"
                            />
                        </div>

                    ))}
                    <span className={`${color === "white" ? "text-white" : "text-black"}`}>{useTimeLeft(product.createdAt)}일 남음</span>
                    <span className={`${color === "white" ? "text-white" : "text-black"}`}>참여인원 <span className="text-[#2C9512]">{product.registeredUsers.length}</span>/ {product.numberOfPeople}</span>
                </div>
                <div className={`content-title flex items-center gap-2 font-[500] ${color === "white" ? "text-white" : "text-black"}`}><span>[회사명]</span><span>{product.campaignName}</span></div>
                <div className={`content-description ${color === "white" ? "text-white" : "text-[#6d6d6d]"} text-[0.9rem]`}>5만원 이용권</div>
            </div>
            </Link>
        </div>
    )
}

export default ContentItem;