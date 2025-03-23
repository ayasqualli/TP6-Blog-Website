<template>
<div class="filter-section">
  <div class="search-container">
    <div class="search-box">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search posts by title, author, or tags..." 
        class="search-input"
      >
      <select v-model="searchType" class="search-type">
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="tags">Tags</option>
      </select>
    </div>

    <div v-if="searchType === 'tags'" class="tag-bubbles">
      <div 
        v-for="tag in tagsFilter" 
        :key="tag" 
        :class="['tag-bubble', { active: selectedTags.includes(tag) }]"
        @click="toggleTag(tag)"
      >
        {{ tag }}
      </div>
    </div>
  </div>

  <button @click="applyFilters" class="apply-button">Search</button>
  <button @click="ResetFilters" class="reset-button">Reset Filters</button>
</div>
</template>

<script>
export default {
    data() {
        return {
            posts: [],
            searchQuery: "",
            searchType: "title",
            selectedTags: []
        };
    },
    methods: {
        applyFilters() {
            let filteredPosts = this.posts;
            
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filteredPosts = filteredPosts.filter(post => {
                    if (this.searchType === 'title') {
                        return post.title.toLowerCase().includes(query);
                    } else if (this.searchType === 'author') {
                        return post.author.toLowerCase().includes(query);
                    } else if (this.searchType === 'tags') {
                        return post.tags.some(tag => tag.toLowerCase().includes(query));
                    }
                    return true;
                });
            }

            if (this.selectedTags.length > 0) {
                filteredPosts = filteredPosts.filter(post =>
                    this.selectedTags.every(tag => post.tags.includes(tag))
                );
            }

            this.$emit('filtered', filteredPosts);
        },
        toggleTag(tag) {
            if (this.selectedTags.includes(tag)) {
                this.selectedTags = this.selectedTags.filter(t => t !== tag);
            } else {
                this.selectedTags.push(tag);
            }
        },
        ResetFilters() {
            this.searchQuery = '';
            this.selectedTags = [];
            this.$emit('filtered', this.posts);
        }
    },
    async created() {
        try {
            const response = await fetch('http://localhost:3000/posts');
            this.posts = await response.json();
            this.applyFilters();
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    },
    computed: {
        tagsFilter() {
            return [...new Set(this.posts.flatMap((post) => post.tags))];
        }
    }
};
</script>

<style scoped>
.search-container {
  margin-bottom: 20px;
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.search-input {
  flex: 1;
  padding: 15px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 30px;
  font-size: 16px;
  min-width: 300px;
  transition: all 0.3s ease;
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.search-input:focus {
  outline: none;
  border-color: #58508d;
  background-color: white;
  box-shadow: 0 4px 8px rgba(88, 80, 141, 0.1);
  transform: scale(1.02);
}

.search-input::placeholder {
  color: #999;
  font-style: italic;
}

.search-type {
  padding: 10px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 30px;
  font-size: 14px;
  background-color: #f8f8f8;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-type:hover {
  border-color: #58508d;
  background-color: white;
}

.search-type:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(88, 80, 141, 0.2);
}

.tag-bubbles {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-bubble {
  padding: 6px 12px;
  background-color: #f0f0f0;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tag-bubble.active {
  background-color: #ffa600;
  color: white;
}

.tag-bubble:hover {
  background-color: #ddd;
}

.apply-button {
  padding: 8px 20px;
  background-color: #58508d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin: 5px;
}

.reset-button {
  padding: 8px 20px;
  background-color: #bc5090;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin: 5px;
}

.apply-button:hover {
  transform: translateY(-2px) scale(1.05);
  transition: transform 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.reset-button:hover {
  transform: translateY(-2px) scale(1.05);
  transition: transform 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
