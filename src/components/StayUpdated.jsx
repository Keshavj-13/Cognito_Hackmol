export default function StayUpdated() {
    return (
        <>
            <div className="video-container">
                <video autoPlay loop muted playsInline className="bg-video">
                    <source src="/videos/stayupdated.mp4" type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>

            </div>
        </>
    )
}