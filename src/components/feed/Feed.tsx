import Post from "./Post"

const Feed = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
    {/* {posts.length
      ? posts.map((post) => <Post key={post.id} post={post} />)
      : "No posts found!"} */}
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      
  </div>
  )
}

export default Feed
