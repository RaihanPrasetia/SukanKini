import React, { useEffect, useState } from "react";
import videoService from "../../service/User/videoService";
import {
  FaArrowUp,
  FaArrowDown,
  FaHeart,
  FaEye,
  FaComment,
  FaPlus,
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
  FaPaperPlane,
  FaSearch,
} from "react-icons/fa";

const VideoCategory = () => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3;
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

  const currentVideo =
    filteredVideos[currentIndex % filteredVideos.length] || {};

  const sortedComments = currentVideo.comments
    ? [...currentVideo.comments].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
    : [];

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = sortedComments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(sortedComments.length / commentsPerPage);

  const getEmbedUrl = (url) => {
    if (url && typeof url === "string" && url.includes("youtube.com/embed")) {
      return url;
    }
    if (url && typeof url === "string") {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    return null;
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredVideos.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredVideos.length - 1 : prevIndex - 1
    );
  };

  const handleVideoPlay = () => {
    incrementViewCount(currentVideo.id);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white">
      {/* Left Sidebar: Search */}
      <div className="w-full lg:w-1/3 flex flex-col items-center bg-gradient-to-br from-gray-800 to-gray-900 px-4 pt-20 lg:pt-24 rounded-lg shadow-lg">
        <div className="w-full relative mb-6">
          <input
            type="text"
            placeholder="Cari Judul Video..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-100 shadow-inner text-lg placeholder-gray-500 transition"
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            <FaSearch className="text-xl" />
          </span>
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
            <div className="relative w-full lg:w-2/3 h-64 lg:h-96 bg-gradient-to-br from-gray-800 via-black to-gray-900 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={getEmbedUrl(currentVideo.videoLink)}
                title={currentVideo.title}
                className="w-full h-full rounded-t-lg"
                allow="autoplay; encrypted-media; picture-in-picture"
                frameBorder="0"
                onLoad={handleVideoPlay}
              ></iframe>
            </div>

            <div className="my-4 text-center px-4">
              <h3 className="text-2xl font-bold text-white mb-2">
                {currentVideo.title}
              </h3>
              <p className="text-gray-300">{currentVideo.description}</p>
            </div>

            {/* Video Controls */}
            <div className="absolute top-1/2 right-5 transform -translate-y-1/2 flex flex-col items-center space-y-4 text-white">
              <div
                className="cursor-pointer p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition transform hover:scale-110"
                onClick={handlePrevious}
              >
                <FaArrowUp className="text-xl" />
              </div>
              <div
                className="cursor-pointer p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition transform hover:scale-110"
                onClick={handleNext}
              >
                <FaArrowDown className="text-xl" />
              </div>

              <div className="mt-6 text-center flex flex-col justify-center items-center">
                <button
                  className={`flex items-center justify-center cursor-pointer space-x-2 text-lg ${currentVideo.isLiked === 1 ? "text-red-500" : "text-gray-400"}`}
                  onClick={() => handleLike(currentVideo.id)}
                >
                  <FaHeart />
                </button>
                <span>{currentVideo.likeCount}</span>
                <div className="flex items-center justify-center space-x-2 mt-2 text-gray-300">
                  <FaEye />
                </div>
                <span>{currentVideo.viewCount}</span>
                <div
                  className="flex items-center justify-center space-x-2 mt-2 cursor-pointer text-gray-300 hover:text-white transition"
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
      <div className="w-full lg:w-1/3 bg-gradient-to-b from-gray-800 to-gray-900 px-4 lg:pt-24 pt-4 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-white mb-6 border-b border-gray-700 pb-2">
          Komentar
        </h3>

        {showComments && (
          <>
            {/* Button to Add Comment */}
            <div className="my-4">
              <button
                className="w-full px-4 py-2 bg-green-500 text-white rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition"
                onClick={() => setIsModalOpen(true)}
              >
                <FaPlus />
                Buat Komentar
              </button>
            </div>

            {/* Comments */}
            {currentComments.map((comment, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-lg p-4 mb-3 shadow-md hover:shadow-lg transition"
              >
                <div className="flex gap-3 items-center mb-3">
                  <img
                    src={
                      comment.owner.imagePath
                        ? `/images/profile/${comment.owner.imagePath}`
                        : "/default_profile.jpg"
                    }
                    alt={comment.owner.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                  />
                  <div>
                    <p className="text-sm font-bold text-white">
                      {comment.owner.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-300">{comment.message}</p>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-6 mt-6">
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 hover:bg-gray-600 transition flex items-center gap-2"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaArrowLeft />
                Previous
              </button>
              <span className="text-lg font-semibold text-white">
                {currentPage}
              </span>
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 hover:bg-gray-600 transition flex items-center gap-2"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <FaArrowRight />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Comment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity">
          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg shadow-2xl w-11/12 sm:w-2/5 relative">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Tulis Komentar untuk
            </h3>
            <div className="flex justify-center items-center mb-4">
              <span className="text-gray-600 text-lg font-semibold">
                {currentVideo.title}
              </span>
            </div>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition mb-4 resize-none"
              placeholder="Tulis komentar di sini..."
              rows={4}
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex items-center px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg shadow-sm transition duration-200"
              >
                <FaTimes className="mr-2" />
                Batal
              </button>
              <button
                onClick={() => handleComment(currentVideo.id)}
                className="flex items-center px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg transition duration-200"
              >
                <FaPaperPlane className="mr-2" />
                Kirim
              </button>
            </div>
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
              onClick={() => setIsModalOpen(false)}
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCategory;
