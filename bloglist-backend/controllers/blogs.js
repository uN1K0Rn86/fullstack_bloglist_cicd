const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const middleware = require("../utils/middleware")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const user = request.user

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  await savedBlog.populate("user", { username: 1, name: 1 })

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", middleware.userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user.id.toString()) {
    await await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response.status(403).json({ error: "You do not have permission to delete this blog." })
  }
})

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
  })
  await updatedBlog.populate("user", { username: 1, name: 1 })
  response.json(updatedBlog)
})

blogsRouter.post("/:id/comments", async (request, response) => {
  const id = request.params.id
  const comment = request.body.comment
  console.log(id)

  if (!comment) {
    return response.status(400).json({ error: "Comment cannot be empty" })
  }

  const blog = await Blog.findById(id)

  if (!blog) {
    return response.status(404).json({ error: "Blog not found" })
  }

  blog.comments = blog.comments.concat({ text: comment })

  const updatedBlog = await blog.save()
  response.status(201).json(updatedBlog)
})

module.exports = blogsRouter
