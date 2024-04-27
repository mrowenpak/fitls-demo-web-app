
const KinescopeEmbed = ({ videoId }: { videoId?: string }) => {

    if (!videoId) {
      return <div>Loading...</div>;
    }

    return (
        <div id="player">
            <iframe
              className="w-full aspect-video"
              src={`https://kinescope.io/embed/${videoId}`}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;">
            </iframe>
        </div>
    );
};

export default KinescopeEmbed;