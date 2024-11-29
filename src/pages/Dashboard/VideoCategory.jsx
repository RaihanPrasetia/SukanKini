import React, { useEffect, useState } from "react";
import videoService from "../../service/User/videoService";
import { FaArrowUp, FaArrowDown, FaHeart, FaEye, FaComment } from "react-icons/fa";

const VideoCategory = () => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 4;
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosData = await videoService.getUserVideo();
        setVideos(videosData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVideos();
  }, []);

  const incrementViewCount = async (videoId) => {
    try {
      await videoService.incrementViewCount(videoId);
      const updatedVideos = await videoService.getUserVideo();
      setVideos(updatedVideos);
    } catch (error) {
      console.error("Failed to update view count:", error.message);
    }
  };

  const handleLike = async (videoId) => {
    try {
      await videoService.userLikeVideo(videoId);
      const videosData = await videoService.getUserVideo();
      setVideos(videosData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleComment = async (videoId) => {
    try {
      const formData = new FormData();
      formData.append("video_id", videoId);
      formData.append("message", commentText);

      await videoService.userCommentVideo(formData);
      const videosData = await videoService.getUserVideo();
      setVideos(videosData);
      setIsModalOpen(false);
      setCommentText("");
    } catch (error) {
      console.error("Failed to add comment:", error.message);
    }
  };

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentVideo = filteredVideos[currentIndex % filteredVideos.length] || {};

  const sortedComments = currentVideo.comments ? [...currentVideo.comments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = sortedComments.slice(indexOfFirstComment, indexOfLastComment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(sortedComments.length / commentsPerPage);

  const getEmbedUrl = (url) => {
    if (url && typeof url === 'string' && url.includes("youtube.com/embed")) {
      return url;
    }
    if (url && typeof url === 'string') {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    return null;
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredVideos.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? filteredVideos.length - 1 : prevIndex - 1));
  };

  const handleVideoPlay = () => {
    incrementViewCount(currentVideo.id);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white">
      {/* Left Sidebar: Search */}
      <div className="w-full lg:w-1/3 flex flex-col items-center bg-gray-800 px-4 pt-20 lg:pt-24">
        <div className="w-full mb-6">
          <input
            type="text"
            placeholder="Cari Judul Video..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-grow flex flex-col w-full justify-center items-center relative pt-16">
        {filteredVideos.length === 0 ? (
          <div className="text-white text-center mt-20">
            Video yang anda cari tidak ditemukan.
          </div>
        ) : (
          <>
            <div className="relative w-full lg:w-2/3 h-64 lg:h-96 bg-black rounded-lg overflow-hidden">
              <iframe
                src={getEmbedUrl(currentVideo.videoLink)}
                title={currentVideo.title}
                className="w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                frameBorder="0"
                onLoad={handleVideoPlay}
              ></iframe>
            </div>
            <div className="my-4 text-center">
              <h3 className="text-2xl font-semibold">{currentVideo.title}</h3>
              <p className="text-gray-400">{currentVideo.description}</p>
            </div>

            {/* Video Controls */}
            <div className="absolute top-1/2 right-5 transform -translate-y-1/2 flex flex-col items-center space-y-4">
              <div className="cursor-pointer" onClick={handlePrevious}>
                <FaArrowUp className="text-2xl" />
              </div>
              <div className="cursor-pointer" onClick={handleNext}>
                <FaArrowDown className="text-2xl" />
              </div>

              <div className="mt-6 text-center">
                <button
                  className={`flex items-center space-x-2 text-lg ${currentVideo.isLiked === 1 ? "text-red-500" : "text-gray-400"}`}
                  onClick={() => handleLike(currentVideo.id)}
                >
                  <FaHeart />
                </button>
                <span>{currentVideo.likeCount}</span>
                <div className="flex items-center space-x-2 text-lg mt-2">
                  <FaEye />
                </div>
                <span>{currentVideo.viewCount}</span>
                <div
                  className="flex items-center space-x-2 mt-2 cursor-pointer"
                  onClick={() => setShowComments(!showComments)}
                >
                  <FaComment />
                </div>
                <span>{currentVideo.comments.length}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Right Sidebar: Comments */}
      <div className="w-full lg:w-1/3 bg-gray-800 px-4 lg:pt-24 pt-4">
        <h3 className="text-xl font-semibold mb-4">Komentar</h3>

        {showComments && (
          <>
            <div className="my-4">
              <button
                className="w-full px-4 py-2 bg-green-500 text-white rounded-md"
                onClick={() => setIsModalOpen(true)}
              >
                Buat Komentar
              </button>
            </div>
            {currentComments.map((comment, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-3 mb-3 shadow-md">
                <div className="flex gap-2 items-center mb-2">
                  <img
                    src={comment.owner.imagePath ? `/images/profile/${comment.owner.imagePath}` : '/default_profile.jpg'}
                    alt={comment.owner.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <p className="text-sm font-bold">{comment.owner.name}</p>
                </div>

                <p className="text-sm text-gray-300">{comment.message}</p>
                <p className="text-xs text-gray-500 text-end">{new Date(comment.createdAt).toLocaleString()}</p>
              </div>
            ))}
            <div className="flex justify-center space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-white">{currentPage}</span>
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Comment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 sm:w-1/3">
            <h3 className="text-xl font-semibold text-center text-gray-600">Tulis Komentar untuk</h3>
            <div className="flex justify-center items-center mb-2">
              <span className="text-gray-700 text-xl font-semibold">{currentVideo.title}</span>
            </div>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
              placeholder="Tulis komentar di sini..."
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition duration-200"
              >
                Batal
              </button>
              <button
                onClick={() => handleComment(currentVideo.id)}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-200"
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCategory;
