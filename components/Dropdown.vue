<template>
  <div>
    <input type="text"
      v-model="filter"
      @focus="showList"
      @blur="hideList"
      @keyup.down="selectNext"
      @keyup.up="selectPrevious"
      @keyup.enter="onEnter" />
    <div class="items">
      <ul v-if="displayList">
        <li v-for="(item, index) in items" v-if="index < maxDisplay">
          <span v-bind:class="[selectedIndex == index ? 'active' : '']">{{ item.Name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: [
    'options'
  ],
  data () {
    return {
      filter: '',
      displayList: false,
      selectedItem: null,
      selectedIndex: 0,
      maxDisplay: 10
    }
  },
  computed: {
    items () {
      return this.options.filter((item) => {
        const name = item.Name.toLowerCase()
        const filter = this.filter.toLowerCase()
        return name.indexOf(filter) != -1
      })
    }
  },
  methods: {
    onEnter (e) {
      console.log(e.target.blur())
      this.$emit('select', this.items[this.selectedIndex])
      this.filter = this.items[this.selectedIndex].Name
    },
    selectNext () {
      const maxIndex = Math.min(this.maxDisplay, this.items.length) - 1
      if (this.selectedIndex < maxIndex) {
        this.selectedIndex++
      } else {
        this.selectedIndex = 0
      }
    },
    selectPrevious () {
      const maxIndex = Math.min(this.maxDisplay, this.items.length) - 1
      if (this.selectedIndex === 0) {
        this.selectedIndex = maxIndex
      } else {
        this.selectedIndex--
      }
    },
    showList () {
      this.displayList = true
    },
    hideList () {
      this.displayList = false
    }
  },
  created () {
    this.selectedItem = this.items[this.selectedIndex]
  }
}
</script>

<style scoped lang="scss">
input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  font-family: 'Roboto Slab', serif;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: #EF5350;
  position: absolute;
  z-index: 100;
  padding: 1rem;
  box-shadow: 0 0 3px white;
}
span.active {
  color: blue;
}
</style>
