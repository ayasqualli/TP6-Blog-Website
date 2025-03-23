<template>
  <div>
    <nav-bar />
    <div class="create-post-container">
      <h1>Create New Post</h1>
      <form @submit.prevent="submitPost" class="post-form">
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="post.title" required>
        </div>
        
        <div class="form-group">
          <label for="author">Author:</label>
          <input type="text" id="author" v-model="post.author" required>
        </div>
        
        <div class="form-group">
          <label for="content">Content:</label>
          <textarea id="content" v-model="post.content" required></textarea>
        </div>
        
        <div class="form-group">
          <label for="tags">Tags (comma separated):</label>
          <input type="text" id="tags" v-model="post.tags">
        </div>
        
        <button type="submit" class="submit-button">Create Post</button>
      </form>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"

export default {
  name: 'CreatePost',
  components: { NavBar },
  data() {
    return {
      post: {
        title: '',
        author: '',
        content: '',
        tags: '',
        date: new Date().toISOString()
      }
    }
  },
  methods: {
    async submitPost() {
      try {
        const response = await fetch('http://localhost:3000/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...this.post,
            tags: this.post.tags.split(',').map(tag => tag.trim())
          })
        });

        if (!response.ok) {
          throw new Error('Failed to create post');
        }

        this.$router.push('/');
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  }
}
</script>

<style scoped>
.create-post-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #001d5c;
  margin-bottom: 2rem;
  text-align: center;
}

.post-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: bold;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  height: 200px;
  resize: vertical;
}

.submit-button {
  background-color: #632382;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #4a1c5f;
}
</style>
