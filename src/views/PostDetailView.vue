<template>
  <nav-bar></nav-bar>
    <h1>Post Detail</h1>

    <div class="post-container" v-if="post">
      <div class="post-card">
        <div class="post-header">
          <h2 class="post-title">{{ post.title }}</h2>
          <div class="post-meta">
            <span class="post-author">By {{ post.author }}</span>
            <span class="post-date">{{ formatDate(post.date) }}</span>
          </div>
        </div>
        <div class="post-content">
          <p>{{ post.content }}</p>
        </div>
        <div class="post-tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <div class="post-actions">
          <button class="edit-button" @click="editPost">Edit</button>
          <button class="delete-button" @click="deletePost">Delete</button>
        </div>
      </div>
    </div>
    <div v-else class="loading">Loading post...</div>
</template> 
<script>
import NavBar from '@/components/NavBar.vue';
export default {
  name: 'PostDetail',
  components: {NavBar},
  data() {
    return {
      post: null
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    async editPost() {
      this.$router.push(`/edit/${this.post.id}`);
    },
    async deletePost() {
      if (confirm('Are you sure you want to delete this post?')) {
        try {
          const response = await fetch(`http://localhost:3000/posts/${this.post.id}`, {
            method: 'DELETE'
          });
          if (!response.ok) {
            throw new Error('Failed to delete post');
          }
          this.$router.push('/');
        } catch (error) {
          console.error('Error deleting post:', error);
        }
      }
    }
  },
  async created(){
    const postId = this.$route.params.id;
    try{
      const response = await fetch(`http://localhost:3000/posts/${postId}`);
      if (!response.ok){
        throw new Error('Post not found');
      }
      this.post = await response.json();
    } catch (error){
      console.error('Error fetching post details: ', error);
    }
  }
}
</script>

<style scoped>
div {
  text-align: center;
  margin-top: 2rem;
}

h1 {
  color: #001d5c;
  margin-bottom: 1rem;
}

p {
  color: #666;
}

.posts-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.post-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.post-card:hover {
  transform: translateY(-5px);
}

.post-header {
  margin-bottom: 16px;
}

.post-title {
  color: #001d5c;
  margin: 0 0 8px 0;
  font-size: 1.5rem;
}

.post-meta {
  color: #666;
  font-size: 0.9rem;
}

.post-date {
  margin-left: 8px;
}

.post-content {
  color: #333;
  line-height: 1.6;
  margin-bottom: 16px;
}

.post-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  background-color: #f0f0f0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #666;
}

.loading {
  text-align: center;
  color: #666;
  margin-top: 40px;
}

.post-actions {
  margin-top: 20px;
}

.edit-button, .delete-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin: 0 8px;
  transition: background-color 0.2s ease;
}

.edit-button {
  background-color: #4CAF50;
  color: white;
}

.edit-button:hover {
  background-color: #45a049;
}

.delete-button {
  background-color: #f44336;
  color: white;
}

.delete-button:hover {
  background-color: #da190b;
}
</style>
