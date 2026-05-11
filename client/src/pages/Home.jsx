import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">

      {/* Hero Section */}
      <div className="max-w-full mx-auto px-6 py-20  bg-gray-200 ml-2 flex ">
        <div className="left"><h1 className=" text-4xl sm:text-6xl md:text-8xl font-sans ">CAMPUS<span className=" text-blue-700 font-bold">SWAP</span></h1>
        <h1 className="text-2xl text-gray-800 mb-4">
          Buy. <span className=" text-blue-600 ">SELL</span> Share.
        </h1>
        <p className="text-xl text-gray-500 mb-8">
          CampusSwap connects seniors and juniors to exchange books,
          notes, and PYQs — all in one place.
        </p>
        <div className="flex  gap-4 flex-wrap">
          <Link to="/books"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition text-lg">
            Browse Books
          </Link>
          <Link to="/notes"
            className="bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition text-lg">
            Get Notes & PYQs
          </Link>
        </div></div>
        {/* <div className="right flex flex-wrap ">
          <img className="m-1 rounded-tl-4xl  w-[400px] h-1/2 object-cover  " src="https://p0.piqsels.com/preview/387/983/786/collection-education-knowledge-learn.jpg" alt="bookimage on herosection" />
          <img className="m-1 rounded-tr-4xl  w-[400px] h-1/2 object-cover " src="https://p0.piqsels.com/preview/1011/24/39/antique-book-stack-books-knowledge-thumbnail.jpg" alt="" />
          <img className="m-1 rounded-bl-4xl  w-[400px] h-1/2 object-cover " src="https://p0.piqsels.com/preview/829/510/558/books-movie-titles-scripts-reading-thumbnail.jpg" alt="" />
          <img className="m-1 rounded-br-4xl  w-[400px] h-1/2 object-cover " src="https://p0.piqsels.com/preview/134/441/234/antique-black-and-white-books-education-thumbnail.jpg" alt="" />
        </div> */}
      </div>

      {/* Features Section */}
      <div className="max-w-full h-screen mx-auto px-6 pb-20  bg-gray-200  ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Save Money</h3>
            <p className="text-gray-500 text-sm">
              Buy old books from seniors at fraction of original price
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Get Better Notes</h3>
            <p className="text-gray-500 text-sm">
              Access notes and PYQs uploaded by toppers and seniors
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <div className="text-4xl mb-3">🤝</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Help Each Other</h3>
            <p className="text-gray-500 text-sm">
              Seniors earn back money, juniors get affordable books
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;