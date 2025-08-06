export function AboutUsPage() {
  return (
    <div className="max-w-6xl mx-auto p-10 flex flex-col gap-12 text-gray-800 dark:text-gray-200">
      <h1 className="text-5xl font-extrabold text-center text-green-700 dark:text-green-400">
        About RecipeHub
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 space-y-6">
          <p className="text-lg leading-relaxed">
            At RecipeHub, we are redefining the way you experience cooking. More
            than just a recipe collection, we’re a thriving community and
            innovative platform that connects passionate cooks, food lovers, and
            culinary creators worldwide.
          </p>
          <p className="text-lg leading-relaxed">
            Our mission is simple yet ambitious: to make cooking accessible,
            inspiring, and fun for everyone. Whether you're a beginner or a
            seasoned chef, RecipeHub empowers you to create unforgettable dishes
            that bring people together.
          </p>
          <p className="text-lg leading-relaxed">
            Here’s why millions trust us to fuel their culinary adventures:
          </p>
        </div>
        <div className=" max-w-[300px] max-h-[300px] md:w-1/2 overflow-hidden rounded-2xl shadow-lg bg-neutral-900 flex items-center justify-center">
          <img
            src="https://thumbs.dreamstime.com/b/retro-young-woman-clothes-cooking-soup-her-kitchen-room-vector-color-illustration-122361523.jpg"
            alt="Cooking illustration"
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="flex flex-col items-center text-center space-y-4 px-4 bg-gray-50 dark:bg-[#1c1c1c] p-6 rounded-lg shadow-md">
          <img
            src="https://totaste.com/wp-content/uploads/2020/03/Recipe-Book.jpg"
            alt="Recipes icon"
            className="w-24 h-24 rounded-lg object-cover"
          />
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-400">
            Vast Recipe Collection
          </h2>
          <p>
            Explore thousands of meticulously tested recipes from around the
            globe, including exclusive dishes shared by our talented community
            members.
          </p>
        </div>

        <div className="flex flex-col items-center text-center space-y-4 px-4 bg-gray-50 dark:bg-[#1c1c1c] p-6 rounded-lg shadow-md">
          <img
            src="https://media.miele.com/media/domestic_au/media/assets_673_x/20000175201.jpg"
            alt="Tools icon"
            className="w-24 h-24 rounded-lg object-cover"
          />
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-400">
            Smart Cooking Tools
          </h2>
          <p>
            Plan your meals with our intuitive tools, create shopping lists in
            seconds, and save your favorite recipes to revisit anytime.
          </p>
        </div>

        <div className="flex flex-col items-center text-center space-y-4 px-4 bg-gray-50 dark:bg-[#1c1c1c] p-6 rounded-lg shadow-md">
          <img
            src="https://www.thedigitaltransformationpeople.com/wp-content/uploads/2019/02/online-community-640x400-c-default.jpg"
            alt="Community icon"
            className="w-24 h-24 rounded-lg object-cover"
          />
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-400">
            Vibrant Community
          </h2>
          <p>
            Join a global network of food enthusiasts — exchange tips, post
            reviews, and inspire others with your culinary creativity.
          </p>
        </div>
      </div>

      <div className="text-lg leading-relaxed space-y-6">
        <p>
          Food is more than fuel — it’s culture, art, and connection. At
          RecipeHub, we believe every meal should tell a story, and every cook
          should feel empowered to experiment and create. Our platform combines
          cutting-edge technology with heartfelt passion, giving you everything
          you need to make cooking a joyous, stress-free adventure.
        </p>

        <p>
          We continuously update our content and tools to keep up with culinary
          trends, seasonal ingredients, and evolving tastes. Whether you want to
          master classic techniques or discover bold new flavors, RecipeHub is
          your ultimate kitchen companion.
        </p>

        <p>
          Join us today, and transform your cooking experience into a flavorful
          journey you’ll love to share. Let’s make the world tastier — one
          recipe at a time.
        </p>
      </div>
    </div>
  );
}
