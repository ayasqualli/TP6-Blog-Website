<template>
  <NavBar />
  <div class="container">
    <div class="filter-container">
      <FilterPost @filtered="updateFilteredPosts" />
    </div>
    <div class="content">
      <AllPost :posts="filteredPosts" />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import FilterPost from "@/components/FilterPost.vue";
import AllPost from "@/components/AllPost.vue";

export default {
  name: "HomeView",
  components: {
    NavBar,
    FilterPost,
    AllPost,
  },
  data() {
    return {
      filteredPosts: [],
    };
  },
  methods: {
    updateFilteredPosts(filteredPosts) {
      this.filteredPosts = filteredPosts;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  margin-top: 20px;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
}

.filter-container {
  width: 450px;
  height: fit-content;
  margin-left: 20px;
  padding: 20px 20px 20px 30px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 20px;
  height: fit-content;
}

.content {
  flex: 1;
  margin-left: 30px;
  margin-right: 20px;
}
</style>
